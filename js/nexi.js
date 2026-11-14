/**
 * js/nexi.js
 * NEXI THE PANDA MASCOT - Sprite Engine, Speech Synthesis, Movement, Guided Tour, Chat & Voice Control
 */
window.Nexi = (function () {
  let currentLang = "en"; // "en" or "hi"
  let currentPose = "idle";
  let isMuted = false;
  let isReduced = false;
  let isSpeaking = false;
  let isListening = false;

  let speechQueue = [];
  let currentSpeechUtterance = null;
  let lipSyncTimer = null;
  let typewriterTimer = null;
  let lastReactionTime = 0;

  let tourCurrentStep = 0;
  let isTourActive = false;

  let recognition = null;
  let isExamMode = false;

  // DOM Elements cache
  let elements = {};

  function init() {
    createMascotDOM();
    setupSpeechRecognition();
    setupEventListeners();
    loadVoicePreferences();

    // Check for saved language
    const savedLang = localStorage.getItem("nexus_quiz_lang");
    if (savedLang === "en" || savedLang === "hi") {
      currentLang = savedLang;
    }

    setPose("idle");
  }

  /**
   * Inject Mascot Container, Speech Bubble, Spotlight Backdrop & Chat Drawer into Body
   */
  function createMascotDOM() {
    if (document.getElementById("nexi-container")) return;

    // 1. Spotlight Overlay for Guided Tour
    const spotlight = document.createElement("div");
    spotlight.id = "nexi-spotlight";
    spotlight.className = "nexi-spotlight hidden";
    document.body.appendChild(spotlight);

    // 2. Mascot Fixed Floating Container
    const container = document.createElement("div");
    container.id = "nexi-container";
    container.className = "nexi-container";

    container.innerHTML = `
      <div id="nexi-bubble" class="nexi-bubble hidden">
        <div class="nexi-bubble-content">
          <span id="nexi-text"></span>
        </div>
        <div class="nexi-bubble-arrow"></div>
      </div>
      <div id="nexi-avatar-wrapper" class="nexi-avatar-wrapper" role="button" tabindex="0" title="Click to talk to Nexi!" aria-label="Talk to Nexi, AI companion">
        <img id="nexi-img" src="assets/nexi/idle.png" alt="Nexi the Panda Mascot" class="nexi-img"/>
        <div id="nexi-emoji-fallback" class="nexi-emoji-fallback hidden">🐼</div>
        <div id="nexi-pulse-ring" class="nexi-pulse-ring"></div>
      </div>
    `;

    document.body.appendChild(container);

    // 3. Tour Card Modal Container
    const tourCard = document.createElement("div");
    tourCard.id = "nexi-tour-card";
    tourCard.className = "nexi-tour-card hidden";
    tourCard.innerHTML = `
      <div class="nexi-tour-header">
        <span id="nexi-tour-title" class="nexi-tour-title">Tour Step</span>
        <button id="nexi-tour-close" class="nexi-icon-btn" aria-label="Skip Tour">✕</button>
      </div>
      <p id="nexi-tour-text" class="nexi-tour-text"></p>
      <div class="nexi-tour-footer">
        <div id="nexi-tour-dots" class="nexi-tour-dots"></div>
        <div class="nexi-tour-actions">
          <button id="nexi-tour-prev" class="nexi-btn nexi-btn-sm nexi-btn-secondary">Back</button>
          <button id="nexi-tour-next" class="nexi-btn nexi-btn-sm nexi-btn-primary">Next</button>
        </div>
      </div>
    `;
    document.body.appendChild(tourCard);

    // 4. Mascot Chat Panel Drawer
    const chatPanel = document.createElement("div");
    chatPanel.id = "nexi-chat-panel";
    chatPanel.className = "nexi-chat-panel hidden";
    chatPanel.innerHTML = `
      <div class="nexi-chat-header">
        <div class="nexi-chat-header-title">
          <div class="nexi-chat-avatar"><img src="assets/nexi/idle.png" alt="Nexi" style="width:28px;height:28px;object-fit:cover;object-position:center 10%;border-radius:50%;display:block;border:1.5px solid var(--bamboo);background:var(--bg-base);"></div>
          <div>
            <strong>Nexus AI Assistant & Proctor</strong>
            <small id="nexi-chat-status">Ready to assist with questions & navigation</small>
          </div>
        </div>
        <button id="nexi-chat-close" class="nexi-icon-btn" aria-label="Close Chat">✕</button>
      </div>
      <div class="nexi-chat-chips">
        <button class="nexi-chip" data-topic="Timer">Timer Rules</button>
        <button class="nexi-chip" data-topic="Scoring">Marking Scheme</button>
        <button class="nexi-chip" data-topic="AI Quiz">AI Test Setup</button>
        <button class="nexi-chip" data-topic="Voice">Voice Controls</button>
      </div>
      <div id="nexi-chat-history" class="nexi-chat-history"></div>
      <div class="nexi-chat-input-row">
        <input type="text" id="nexi-chat-input" placeholder="Ask Nexi a question..." aria-label="Ask Nexi a question"/>
        <button id="nexi-mic-btn" class="nexi-icon-btn nexi-mic-btn" title="Tap to talk (Voice input)">🎙️</button>
        <button id="nexi-chat-send" class="nexi-btn nexi-btn-primary nexi-btn-sm">Send</button>
      </div>
    `;
    document.body.appendChild(chatPanel);

    // Cache elements
    elements.container = container;
    elements.img = document.getElementById("nexi-img");
    elements.fallback = document.getElementById("nexi-emoji-fallback");
    elements.bubble = document.getElementById("nexi-bubble");
    elements.text = document.getElementById("nexi-text");
    elements.spotlight = spotlight;
    elements.tourCard = tourCard;
    elements.chatPanel = chatPanel;
    elements.chatHistory = document.getElementById("nexi-chat-history");
    elements.chatInput = document.getElementById("nexi-chat-input");
    elements.micBtn = document.getElementById("nexi-mic-btn");

    // Robust Image Loading Fallback Logic
    elements.img.onerror = function () {
      elements.img.style.display = "none";
      elements.fallback.classList.remove("hidden");
    };
  }

  function setupEventListeners() {
    // Click / Enter Nexi to open chat drawer
    const avatarWrapper = document.getElementById("nexi-avatar-wrapper");
    if (avatarWrapper) {
      avatarWrapper.addEventListener("click", () => {
        toggleChatPanel();
      });
      avatarWrapper.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleChatPanel();
        }
      });
    }

    // Chat close
    document.getElementById("nexi-chat-close").addEventListener("click", () => {
      elements.chatPanel.classList.add("hidden");
    });

    // Chat input enter
    elements.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUserChatMessage();
    });

    // Chat send button
    document.getElementById("nexi-chat-send").addEventListener("click", handleUserChatMessage);

    // Quick chips
    document.querySelectorAll(".nexi-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const topic = chip.getAttribute("data-topic");
        sendChatMessage(topic);
      });
    });

    // Mic button
    elements.micBtn.addEventListener("click", toggleVoiceRecognition);

    // Tour buttons
    document.getElementById("nexi-tour-close").addEventListener("click", stopTour);
    document.getElementById("nexi-tour-next").addEventListener("click", nextTourStep);
    document.getElementById("nexi-tour-prev").addEventListener("click", prevTourStep);

    // Sync speechSynthesis voices
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices refreshed
      };
    }
  }

  /**
   * Set Pose with optional lip-sync open/close
   */
  function setPose(poseName) {
    currentPose = poseName;
    if (!elements.img) return;

    let src = `assets/nexi/${poseName}.png`;
    elements.img.src = src;

    // Apply mirroring or orientation if needed
    if (poseName === "point-left") {
      elements.img.style.transform = "scaleX(1)";
    } else if (poseName === "point-right") {
      elements.img.style.transform = "scaleX(-1)";
    } else {
      elements.img.style.transform = "none";
    }
  }

  /**
   * Lip Sync Animation Loop while speaking or typing
   */
  function startLipSync(durationMs) {
    stopLipSync();
    let toggle = false;
    let basePose = currentPose;

    lipSyncTimer = setInterval(() => {
      toggle = !toggle;
      const poseToUse = toggle ? "talk-open" : "talk-closed";
      setPose(poseToUse);
    }, 160);

    setTimeout(() => {
      stopLipSync();
      setPose(basePose !== "talk-open" && basePose !== "talk-closed" ? basePose : "idle");
    }, durationMs || 3000);
  }

  function stopLipSync() {
    if (lipSyncTimer) {
      clearInterval(lipSyncTimer);
      lipSyncTimer = null;
    }
  }

  /**
   * Speak text with window.speechSynthesis & typewriter subtitles
   */
  function speak(text, pose = "wave", force = false) {
    if (isMuted && !force) {
      showSubtitles(text, pose);
      return;
    }

    // Cancel existing
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    showSubtitles(text, pose);

    if (!("speechSynthesis" in window) || isMuted) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly cute pitch for Nexi!

    // Find suitable voice (en-IN or hi-IN)
    const voices = window.speechSynthesis.getVoices();
    const langCode = currentLang === "hi" ? "hi" : "en";
    
    let matchingVoice = voices.find(
      (v) => v.lang.toLowerCase().includes(langCode) && v.lang.toLowerCase().includes("in")
    ) || voices.find((v) => v.lang.toLowerCase().includes(langCode));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      isSpeaking = true;
      const speechDurationEst = Math.max(2000, text.length * 70);
      startLipSync(speechDurationEst);
    };

    utterance.onend = () => {
      isSpeaking = false;
      stopLipSync();
      setPose("idle");
    };

    utterance.onerror = () => {
      isSpeaking = false;
      stopLipSync();
      setPose("idle");
    };

    currentSpeechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Subtitle Typewriter Effect inside speech bubble
   */
  function showSubtitles(text, pose = "idle") {
    if (isReduced) return; // Reduced Nexi mode hides ambient bubbles

    setPose(pose);
    if (isTourActive) {
      elements.bubble.classList.add("hidden");
      return;
    }
    elements.bubble.classList.remove("hidden");
    elements.text.textContent = "";

    if (typewriterTimer) clearInterval(typewriterTimer);

    let idx = 0;
    const speed = 25; // ms per char

    typewriterTimer = setInterval(() => {
      if (idx < text.length) {
        elements.text.textContent += text.charAt(idx);
        idx++;
      } else {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
        // Auto-hide bubble after 5 seconds if not speaking
        setTimeout(() => {
          if (!isSpeaking && !isTourActive) {
            elements.bubble.classList.add("hidden");
          }
        }, 5000);
      }
    }, speed);
  }

  function hideBubble() {
    elements.bubble.classList.add("hidden");
  }

  /**
   * Movement Engine: Glide Nexi to a DOM target element's bounding box
   */
  function glideToElement(selector, pose = "point-right") {
    const target = document.querySelector(selector);
    if (!target || isReduced) {
      resetPosition();
      return;
    }

    const rect = target.getBoundingClientRect();
    const containerWidth = 90;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let targetLeft = rect.right + 20;
    let chosenPose = "point-left";

    if (targetLeft + containerWidth > viewportWidth - 20) {
      targetLeft = Math.max(10, rect.left - containerWidth - 20);
      chosenPose = "point-right";
    }

    let targetTop = Math.max(16, Math.min(viewportHeight - 110, rect.top));

    elements.container.style.position = "fixed";
    elements.container.style.left = `${targetLeft}px`;
    elements.container.style.top = `${targetTop}px`;
    elements.container.style.bottom = "auto";
    elements.container.style.right = "auto";

    setPose(chosenPose);
  }

  function resetPosition() {
    elements.container.style.position = "fixed";
    elements.container.style.left = "auto";
    elements.container.style.top = "auto";
    elements.container.style.bottom = "24px";
    elements.container.style.right = "24px";
    elements.container.style.transform = "none";
    setPose("idle");
  }

  /**
   * Event Reaction Handler
   */
  function react(eventName, vars = {}) {
    const now = Date.now();
    const minorEvents = ["option_selected", "question_marked", "question_cleared"];

    if (minorEvents.includes(eventName) && now - lastReactionTime < 4000) {
      return; // Rate limit minor reactions
    }

    lastReactionTime = now;

    // Check Exam Mode constraint!
    if (isExamMode && (eventName === "option_correct_practice" || eventName === "option_wrong_practice")) {
      eventName = "option_selected";
    }

    const scriptLang = window.NEXI_SCRIPT[currentLang] || window.NEXI_SCRIPT.en;
    const line = scriptLang.reactions[eventName];

    if (!line) return;

    let pose = "happy";
    if (eventName.includes("wrong") || eventName.includes("needs_practice")) pose = "oops";
    if (eventName.includes("think") || eventName.includes("ai")) pose = "think";
    if (eventName.includes("timer") || eventName.includes("red")) pose = "oops";

    speak(line, pose);
  }

  /**
   * GUIDED TOUR ENGINE
   */
  let tourScrollDebounce = null;

  function handleTourScrollOrResize() {
    if (!isTourActive) return;
    if (tourScrollDebounce) cancelAnimationFrame(tourScrollDebounce);
    tourScrollDebounce = requestAnimationFrame(() => {
      const tourData = window.NEXI_SCRIPT[currentLang]?.tour || window.NEXI_SCRIPT.en.tour;
      const step = tourData && tourData[tourCurrentStep];
      if (!step) return;
      const target = getTourTarget(step.target);
      if (target) {
        positionTourElements(target);
      }
    });
  }

  function handleTourKeydown(e) {
    if (!isTourActive) return;
    if (e.key === "Escape") {
      stopTour();
    } else if (e.key === "ArrowRight") {
      nextTourStep();
    } else if (e.key === "ArrowLeft") {
      prevTourStep();
    }
  }

  function getTourTarget(selector) {
    if (selector === "#app-header" || selector === ".header-nav") {
      return document.querySelector(".header-nav") || document.querySelector("#app-header");
    }
    return document.querySelector(selector);
  }

  function startTour() {
    // If not on Screen 1 (Home), switch to Screen 1 first so all targets exist in DOM
    if (window.NexusQuiz && typeof window.NexusQuiz.showScreen === "function") {
      const screen1 = document.getElementById("screen-1");
      if (!screen1 || screen1.classList.contains("hidden")) {
        window.NexusQuiz.showScreen(1);
      }
    }

    // Close any open modals
    document.querySelectorAll(".modal-overlay:not(.hidden)").forEach((m) => m.classList.add("hidden"));
    if (elements.chatPanel && !elements.chatPanel.classList.contains("hidden")) {
      elements.chatPanel.classList.add("hidden");
    }

    const tourData = window.NEXI_SCRIPT[currentLang]?.tour || window.NEXI_SCRIPT.en.tour;
    if (!tourData || tourData.length === 0) return;

    isTourActive = true;
    tourCurrentStep = 0;

    elements.spotlight.classList.remove("hidden");
    elements.tourCard.classList.remove("hidden");
    elements.bubble.classList.add("hidden");

    window.addEventListener("scroll", handleTourScrollOrResize, { passive: true });
    window.addEventListener("resize", handleTourScrollOrResize);
    window.addEventListener("keydown", handleTourKeydown);

    // Allow screen layout a moment to render before positioning
    setTimeout(() => {
      renderTourStep();
    }, 60);
  }

  function positionTourElements(target) {
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // 1. Position Spotlight frame (fixed viewport-relative coordinates)
    const padding = 8;
    const spotTop = Math.max(0, rect.top - padding);
    const spotLeft = Math.max(0, rect.left - padding);
    const spotWidth = Math.min(vw - spotLeft, rect.width + padding * 2);
    const spotHeight = Math.min(vh - spotTop, rect.height + padding * 2);

    elements.spotlight.style.top = `${spotTop}px`;
    elements.spotlight.style.left = `${spotLeft}px`;
    elements.spotlight.style.width = `${spotWidth}px`;
    elements.spotlight.style.height = `${spotHeight}px`;

    // 2. Measure & Position Tour Card
    const card = elements.tourCard;
    const cardWidth = Math.min(360, vw - 32);
    const cardHeight = card.offsetHeight || 220;

    // Determine vertical placement: below or above target?
    let cardTop;
    const spaceBelow = vh - rect.bottom - 16;
    const spaceAbove = rect.top - 16;

    if (spaceBelow >= cardHeight || spaceBelow >= spaceAbove) {
      cardTop = rect.bottom + 14;
    } else {
      cardTop = rect.top - cardHeight - 14;
    }

    // Clamp cardTop inside viewport so action buttons never get clipped
    cardTop = Math.max(16, Math.min(vh - cardHeight - 16, cardTop));

    // Determine horizontal placement
    let cardLeft;
    if (rect.width > cardWidth) {
      cardLeft = rect.left + (rect.width - cardWidth) / 2;
    } else {
      cardLeft = rect.left;
    }

    // Strictly clamp cardLeft inside viewport so right edge never overflows!
    cardLeft = Math.max(16, Math.min(vw - cardWidth - 16, cardLeft));

    card.style.top = `${cardTop}px`;
    card.style.left = `${cardLeft}px`;

    // 3. Position Nexi Mascot
    if (!isReduced && elements.container) {
      elements.container.style.position = "fixed";
      elements.container.style.bottom = "auto";
      elements.container.style.right = "auto";
      elements.container.style.transform = "none";

      const mascotWidth = 76;

      if (cardLeft + cardWidth + mascotWidth + 20 <= vw) {
        // Fits to the right of the tour card
        elements.container.style.left = `${cardLeft + cardWidth + 12}px`;
        elements.container.style.top = `${Math.min(vh - 100, Math.max(16, cardTop))}px`;
        setPose("point-left");
      } else if (cardLeft - mascotWidth - 16 >= 10) {
        // Fits to the left of the tour card
        elements.container.style.left = `${cardLeft - mascotWidth - 10}px`;
        elements.container.style.top = `${Math.min(vh - 100, Math.max(16, cardTop))}px`;
        setPose("point-right");
      } else {
        // Mobile / narrow screen: dock safely at bottom right
        elements.container.style.left = "auto";
        elements.container.style.right = "16px";
        elements.container.style.top = "auto";
        elements.container.style.bottom = "16px";
        setPose("wave");
      }
    }
  }

  function renderTourStep() {
    const tourData = window.NEXI_SCRIPT[currentLang]?.tour || window.NEXI_SCRIPT.en.tour;
    if (tourCurrentStep < 0 || tourCurrentStep >= tourData.length) {
      stopTour();
      return;
    }

    const step = tourData[tourCurrentStep];
    const isFirst = tourCurrentStep === 0;
    const isLast = tourCurrentStep === tourData.length - 1;

    // Header & Content
    const titleEl = document.getElementById("nexi-tour-title");
    if (titleEl) {
      titleEl.innerHTML = `<span class="nexi-tour-step-badge">${tourCurrentStep + 1}/${tourData.length}</span> ${step.title}`;
    }
    const textEl = document.getElementById("nexi-tour-text");
    if (textEl) {
      textEl.textContent = step.text;
    }

    // Action buttons
    const prevBtn = document.getElementById("nexi-tour-prev");
    if (prevBtn) {
      prevBtn.disabled = isFirst;
      prevBtn.style.opacity = isFirst ? "0.35" : "1";
      prevBtn.style.pointerEvents = isFirst ? "none" : "auto";
    }

    const nextBtn = document.getElementById("nexi-tour-next");
    if (nextBtn) {
      nextBtn.textContent = isLast
        ? (currentLang === "hi" ? "समाप्त ✓" : "Finish ✓")
        : (currentLang === "hi" ? "आगे →" : "Next →");
    }

    // Step dots
    const dotsContainer = document.getElementById("nexi-tour-dots");
    if (dotsContainer) {
      dotsContainer.innerHTML = tourData
        .map(
          (_, i) => `<span class="nexi-dot ${i === tourCurrentStep ? "active" : ""}" data-step="${i}" title="Step ${i + 1}"></span>`
        )
        .join("");

      dotsContainer.querySelectorAll(".nexi-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
          const stepIdx = parseInt(dot.getAttribute("data-step"), 10);
          if (!isNaN(stepIdx)) {
            tourCurrentStep = stepIdx;
            renderTourStep();
          }
        });
      });
    }

    // Target tracking & scrolling
    const target = getTourTarget(step.target);
    if (target) {
      const rect = target.getBoundingClientRect();
      const isOutOfView = rect.top < 70 || rect.bottom > window.innerHeight - 70;
      if (isOutOfView) {
        target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        setTimeout(() => {
          positionTourElements(target);
        }, 320);
      }
      positionTourElements(target);
    }

    speak(step.text, step.pose || "wave", true);
  }

  function nextTourStep() {
    const tourData = window.NEXI_SCRIPT[currentLang]?.tour || window.NEXI_SCRIPT.en.tour;
    if (tourCurrentStep >= tourData.length - 1) {
      stopTour();
      return;
    }
    tourCurrentStep++;
    renderTourStep();
  }

  function prevTourStep() {
    if (tourCurrentStep > 0) {
      tourCurrentStep--;
      renderTourStep();
    }
  }

  function stopTour() {
    isTourActive = false;
    elements.spotlight.classList.add("hidden");
    elements.tourCard.classList.add("hidden");

    window.removeEventListener("scroll", handleTourScrollOrResize);
    window.removeEventListener("resize", handleTourScrollOrResize);
    window.removeEventListener("keydown", handleTourKeydown);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    speechQueue = [];

    resetPosition();
    hideBubble();
  }

  /**
   * CHATBOT ENGINE
   */
  function toggleChatPanel() {
    elements.chatPanel.classList.toggle("hidden");
    if (!elements.chatPanel.classList.contains("hidden")) {
      elements.chatInput.focus();
      if (elements.chatHistory.children.length === 0) {
        addChatMessage("bot", window.NEXI_SCRIPT[currentLang]?.reactions?.welcome || "Hi! Ask me anything about Nexus Quiz!");
      }
    }
  }

  function handleUserChatMessage() {
    const text = elements.chatInput.value.trim();
    if (!text) return;

    elements.chatInput.value = "";
    sendChatMessage(text);
  }

  function sendChatMessage(text) {
    addChatMessage("user", text);

    // Keyword matching logic
    const scriptLang = window.NEXI_SCRIPT[currentLang] || window.NEXI_SCRIPT.en;
    const faqs = scriptLang.faq;
    const cleanQuery = text.toLowerCase().replace(/[^\w\s\u0900-\u097F]/g, "");

    let bestMatch = null;
    let highestHits = 0;

    faqs.forEach((faq) => {
      let hits = 0;
      faq.keywords.forEach((kw) => {
        if (cleanQuery.includes(kw.toLowerCase())) {
          hits++;
        }
      });
      if (hits > highestHits) {
        highestHits = hits;
        bestMatch = faq;
      }
    });

    setTimeout(() => {
      if (bestMatch && highestHits > 0) {
        addChatMessage("bot", bestMatch.text);
        speak(bestMatch.text, "happy");
      } else {
        const fallback = scriptLang.fallbackAnswer;
        addChatMessage("bot", fallback);
        speak(fallback, "think");
      }
    }, 400);
  }

  function addChatMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `nexi-chat-msg nexi-chat-msg-${sender}`;
    msgDiv.innerHTML = `
      <div class="nexi-chat-bubble-inner">
        ${text}
      </div>
    `;
    elements.chatHistory.appendChild(msgDiv);
    elements.chatHistory.scrollTop = elements.chatHistory.scrollHeight;
  }

  /**
   * VOICE RECOGNITION (SpeechToText) FOR VOICE COMMANDS
   */
  function setupSpeechRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListening = true;
      elements.micBtn.classList.add("listening");
      document.getElementById("nexi-chat-status").textContent = "Listening... Speak now!";
      const voiceToggle = document.getElementById("voice-master-toggle");
      const voiceWrap = document.getElementById("voice-toggle-label");
      const indicator = document.getElementById("voice-listening-indicator");
      if (voiceToggle) voiceToggle.checked = true;
      if (voiceWrap) voiceWrap.classList.add("voice-active");
      if (indicator) indicator.classList.remove("hidden");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      elements.chatInput.value = transcript;
      processVoiceCommand(transcript);
    };

    recognition.onerror = () => {
      isListening = false;
      elements.micBtn.classList.remove("listening");
      document.getElementById("nexi-chat-status").textContent = "AI Mascot Assistant";
      const voiceToggle = document.getElementById("voice-master-toggle");
      const voiceWrap = document.getElementById("voice-toggle-label");
      const indicator = document.getElementById("voice-listening-indicator");
      if (voiceToggle) voiceToggle.checked = false;
      if (voiceWrap) voiceWrap.classList.remove("voice-active");
      if (indicator) indicator.classList.add("hidden");
    };

    recognition.onend = () => {
      isListening = false;
      elements.micBtn.classList.remove("listening");
      document.getElementById("nexi-chat-status").textContent = "AI Mascot Assistant";
      const voiceToggle = document.getElementById("voice-master-toggle");
      const voiceWrap = document.getElementById("voice-toggle-label");
      const indicator = document.getElementById("voice-listening-indicator");
      if (voiceToggle) voiceToggle.checked = false;
      if (voiceWrap) voiceWrap.classList.remove("voice-active");
      if (indicator) indicator.classList.add("hidden");
    };
  }

  function toggleVoiceRecognition() {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.lang = currentLang === "hi" ? "hi-IN" : "en-IN";
      recognition.start();
    }
  }

  function processVoiceCommand(transcript) {
    const cleanCmd = transcript.toLowerCase().trim();
    const commandsMap = window.NEXI_SCRIPT.voiceCommands;
    let matchedAction = null;

    for (let actionKey in commandsMap) {
      const keywords = commandsMap[actionKey];
      if (keywords.some((kw) => cleanCmd.includes(kw))) {
        matchedAction = actionKey;
        break;
      }
    }

    if (matchedAction) {
      speak(`Executing ${matchedAction.replace('_', ' ')} command`, "happy");
      if (window.NexusQuiz && typeof window.NexusQuiz.handleVoiceCommand === "function") {
        window.NexusQuiz.handleVoiceCommand(matchedAction);
      }
    } else {
      sendChatMessage(transcript);
    }
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("nexus_quiz_lang", lang);
  }

  function setMuted(muted) {
    isMuted = muted;
    localStorage.setItem("nexus_quiz_muted", muted ? "true" : "false");
    if (muted && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function setReduced(reduced) {
    isReduced = reduced;
    localStorage.setItem("nexus_quiz_reduced", reduced ? "true" : "false");
    if (reduced) {
      elements.container.classList.add("nexi-reduced");
      hideBubble();
    } else {
      elements.container.classList.remove("nexi-reduced");
    }
  }

  function setExamMode(exam) {
    isExamMode = exam;
  }

  function loadVoicePreferences() {
    isMuted = localStorage.getItem("nexus_quiz_muted") === "true";
    isReduced = localStorage.getItem("nexus_quiz_reduced") === "true";
    if (isReduced) elements.container?.classList.add("nexi-reduced");
  }

  return {
    init,
    speak,
    setPose,
    glideToElement,
    resetPosition,
    react,
    startTour,
    stopTour,
    toggleChatPanel,
    sendChatMessage,
    setLanguage,
    setMuted,
    setReduced,
    setExamMode,
    toggleVoiceRecognition,
    isMuted: () => isMuted,
    isReduced: () => isReduced,
    getLanguage: () => currentLang
  };
})();
