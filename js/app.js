/**
 * js/app.js
 * NEXUS QUIZ - Main Application Engine, Router, Timer, Palette, Scoring & Result Section
 */
window.NexusQuiz = (function () {
  // Application State
  const state = {
    currentScreen: 0, // 0: Lang, 1: Home, 2: Pre-Quiz, 3: Quiz, 4: Result
    language: "en",
    theme: "dark",
    mode: "exam", // 'exam' or 'practice'
    
    // Quiz Engine State
    currentTopicId: null,
    topicName: "",
    questions: [],
    userAnswers: [],
    optionMappings: [], // maps displayed option index -> original option index
    marked: [],
    visited: [],
    currentIndex: 0,
    
    // Timer State
    timeLimit: 0,
    endTime: null,
    timeLeft: 0,
    timerInterval: null,

    // Review Filters
    reviewFilter: "all",
    
    // History
    history: []
  };

  /**
   * INITIALIZATION
   */
  function init() {
    loadPreferences();
    setupTheme();
    setupEventListeners();

    // Check for saved session attempt resumption!
    const savedSession = sessionStorage.getItem("nexus_active_session");
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData && sessionData.endTime > Date.now()) {
          restoreQuizSession(sessionData);
          return;
        }
      } catch (e) {
        sessionStorage.removeItem("nexus_active_session");
      }
    }

    // Default to Language Screen if first visit, or Home if language already set
    const savedLang = localStorage.getItem("nexus_quiz_lang");
    if (savedLang) {
      state.language = savedLang;
      showScreen(1);
    } else {
      showScreen(0);
    }
  }

  /**
   * LOAD PREFERENCES FROM LOCAL STORAGE
   */
  function loadPreferences() {
    // Theme setup
    const savedTheme = localStorage.getItem("nexus_quiz_theme");
    if (savedTheme) {
      state.theme = savedTheme;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      state.theme = prefersDark ? "dark" : "light";
    }

    // Quiz Mode setup
    const savedMode = localStorage.getItem("nexus_quiz_mode");
    if (savedMode) state.mode = savedMode;

    // History setup
    const savedHist = localStorage.getItem("nexus_quiz_history");
    if (savedHist) {
      try {
        state.history = JSON.parse(savedHist);
      } catch (e) {
        state.history = [];
      }
    }
  }

  function setupTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const themeBtn = document.getElementById("btn-theme-toggle");
    if (themeBtn) {
      themeBtn.innerHTML = state.theme === "dark" 
        ? `<svg class="nav-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><span>Light</span>`
        : `<svg class="nav-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span>Dark</span>`;
      themeBtn.setAttribute("aria-label", `Switch to ${state.theme === "dark" ? "light" : "dark"} theme`);
    }
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("nexus_quiz_theme", state.theme);
    setupTheme();
  }

  /**
   * ROUTER / SCREEN NAVIGATION
   */
  function showScreen(screenNumber) {
    state.currentScreen = screenNumber;

    document.querySelectorAll(".screen-section").forEach((sec) => {
      sec.classList.add("hidden");
    });

    const targetScreen = document.getElementById(`screen-${screenNumber}`);
    if (targetScreen) {
      targetScreen.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Toggle quiz-active body class and footer visibility
    const footer = document.querySelector(".app-footer");
    if (screenNumber === 2 || screenNumber === 3) {
      document.body.classList.add("quiz-active");
      if (footer) footer.classList.add("hidden");
    } else {
      document.body.classList.remove("quiz-active");
      if (footer) {
        if (screenNumber === 0) {
          footer.classList.add("hidden");
        } else {
          footer.classList.remove("hidden");
        }
      }
    }

    // Screen specific setups
    if (screenNumber === 1) {
      renderTopicGrid();
      updateHeaderStats();
    } else if (screenNumber === 3) {
      renderQuizQuestion();
      renderPalette();
      startTimer();
    } else if (screenNumber === 4) {
      renderResultScreen();
    }

    // Sync Nexi mode
    if (window.Nexi) {
      window.Nexi.setExamMode(state.mode === "exam");
    }
  }

  /**
   * SCREEN 0: LANGUAGE GATE
   */
  function selectLanguage(lang) {
    state.language = lang;
    localStorage.setItem("nexus_quiz_lang", lang);
    if (window.Nexi) {
      window.Nexi.setLanguage(lang);
      window.Nexi.react("welcome");
    }

    // Offer Guided Tour
    showTourOfferModal();
  }

  function showTourOfferModal() {
    const modal = document.getElementById("modal-tour-offer");
    if (modal) {
      modal.classList.remove("hidden");
    } else {
      showScreen(1);
    }
  }

  /**
   * SCREEN 1: HOME & TOPICS GRID
   */
  function renderTopicGrid() {
    const coreGrid = document.getElementById("topic-grid");
    const extraGrid = document.getElementById("extra-topic-grid");

    if (!coreGrid || !extraGrid) return;

    coreGrid.innerHTML = "";
    extraGrid.innerHTML = "";

    function getTopicSvgIcon(topicKey) {
      const icons = {
        aptitude: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
        c_prog: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        computer_fund: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        web_basics: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
        dsa: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
        dbms: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
        os: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
        verbal: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
      };
      return icons[topicKey] || `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
    }

    // Core & Domain topics
    for (let key in window.NEXUS_TOPICS) {
      const topic = window.NEXUS_TOPICS[key];
      const qCount = window.NEXUS_QUESTIONS.filter((q) => q.topic === key).length;

      // Find best score from history
      const attempts = state.history.filter((h) => h.topicId === key);
      let bestScoreText = "Unattempted";
      let hasAttempt = false;
      if (attempts.length > 0) {
        const bestScore = Math.max(...attempts.map((a) => a.scorePercent));
        bestScoreText = `Best: ${bestScore}%`;
        hasAttempt = true;
      }

      const cardHTML = `
        <div class="topic-card" onclick="NexusQuiz.selectTopic('${key}')" tabindex="0" role="button" aria-label="Select ${topic.name} assessment">
          <div class="topic-card-header">
            <div class="topic-icon-box">${getTopicSvgIcon(key)}</div>
            <span class="topic-category-tag ${topic.isCore ? "tag-core" : "tag-domain"}">${topic.isCore ? "Core Track" : "Domain Track"}</span>
          </div>
          <div class="topic-info">
            <h3 class="topic-card-title">${topic.name}</h3>
            <p class="topic-card-desc">${topic.desc}</p>
            <div class="topic-meta-row">
              <span class="meta-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                ${qCount} MCQs
              </span>
              <span class="meta-chip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${Math.round((qCount * topic.timePerQ) / 60)}m
              </span>
              <span class="meta-chip ${hasAttempt ? 'meta-chip-success' : 'meta-chip-muted'}">
                ${bestScoreText}
              </span>
            </div>
          </div>
          <div class="topic-card-action">
            <span>Launch Exam</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      `;

      if (topic.isCore) {
        coreGrid.innerHTML += cardHTML;
      } else {
        extraGrid.innerHTML += cardHTML;
      }
    }

    // Sync mode switch toggle UI
    const modeSwitch = document.getElementById("mode-switch-toggle");
    if (modeSwitch) {
      modeSwitch.checked = state.mode === "practice";
      updateModeLabel();
    }
  }

  function updateModeLabel() {
    const modeLabel = document.getElementById("mode-label");
    if (modeLabel) {
      modeLabel.textContent = state.mode === "practice" ? "Practice Mode (Instant Feedback)" : "Exam Mode (Strict Real Test)";
    }
  }

  function toggleMode(isPractice) {
    state.mode = isPractice ? "practice" : "exam";
    localStorage.setItem("nexus_quiz_mode", state.mode);
    updateModeLabel();
    if (window.Nexi) window.Nexi.setExamMode(state.mode === "exam");
  }

  /**
   * PRE-QUIZ SCREEN SETUP (Screen 2)
   */
  function selectTopic(topicId) {
    state.currentTopicId = topicId;
    const topic = window.NEXUS_TOPICS[topicId];
    if (!topic) return;

    state.topicName = topic.name;
    const rawQuestions = window.NEXUS_QUESTIONS.filter((q) => q.topic === topicId);
    
    setupPreQuiz(topic.name, rawQuestions, topic.timePerQ);
  }

  function setupPreQuiz(name, rawQuestions, timePerQ) {
    state.topicName = name;
    
    // Prepare question shuffle & option mapping
    state.questions = shuffleArray([...rawQuestions]);
    state.userAnswers = new Array(state.questions.length).fill(null);
    state.marked = new Array(state.questions.length).fill(false);
    state.visited = new Array(state.questions.length).fill(false);
    state.currentIndex = 0;
    
    // Create option mappings for each question
    state.optionMappings = state.questions.map((q) => {
      const indices = [0, 1, 2, 3];
      return shuffleArray(indices);
    });

    state.timeLimit = state.questions.length * timePerQ;
    state.timeLeft = state.timeLimit;

    // Render pre-quiz screen details
    document.getElementById("pre-quiz-title").textContent = name;
    document.getElementById("pre-quiz-qcount").textContent = state.questions.length;
    document.getElementById("pre-quiz-time").textContent = formatTime(state.timeLimit);
    document.getElementById("pre-quiz-mode").textContent = state.mode === "practice" ? "Practice Mode" : "Exam Mode";

    showScreen(2);
  }

  function startQuiz() {
    state.startTime = Date.now();
    state.endTime = Date.now() + state.timeLimit * 1000;
    state.visited[0] = true;

    const topicBar = document.getElementById("quiz-topic-name-bar");
    if (topicBar && state.topicName) {
      topicBar.textContent = state.topicName;
    }

    saveSession();
    showScreen(3);

    if (window.Nexi) window.Nexi.react("quiz_start");
  }

  /**
   * QUIZ ENGINE & TIMER (Screen 3)
   */
  function startTimer() {
    stopTimer();
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
      const now = Date.now();
      const remainingMs = Math.max(0, state.endTime - now);
      state.timeLeft = Math.ceil(remainingMs / 1000);

      updateTimerDisplay();

      if (state.timeLeft <= 0) {
        stopTimer();
        autoSubmitQuiz();
      }
    }, 500);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    const timerElem = document.getElementById("quiz-timer");
    const progressFill = document.getElementById("timer-progress-fill");
    const timerWrap = document.getElementById("quiz-timer-wrap");
    const mobileTimer = document.getElementById("mobile-quiz-timer");

    const timeStr = formatTime(state.timeLeft);

    if (timerElem) {
      timerElem.textContent = timeStr;
    }
    if (mobileTimer) {
      mobileTimer.textContent = timeStr;
    }

    if (!timerElem) return;

    const fractionLeft = state.timeLeft / state.timeLimit;

    if (progressFill) {
      progressFill.style.width = `${Math.max(0, fractionLeft * 100)}%`;
    }

    timerElem.classList.remove("timer-amber", "timer-red");
    if (timerWrap) timerWrap.classList.remove("timer-amber", "timer-red");

    if (state.timeLeft <= 30) {
      timerElem.classList.add("timer-red");
      if (timerWrap) timerWrap.classList.add("timer-red");
      if (state.timeLeft === 30 && window.Nexi) window.Nexi.react("timer_red");
    } else if (fractionLeft <= 0.25) {
      timerElem.classList.add("timer-amber");
      if (timerWrap) timerWrap.classList.add("timer-amber");
      if (Math.ceil(state.timeLimit * 0.25) === state.timeLeft && window.Nexi) {
        window.Nexi.react("timer_amber");
      }
    }
  }

  function renderQuizQuestion() {
    const qIndex = state.currentIndex;
    const q = state.questions[qIndex];
    if (!q) return;

    state.visited[qIndex] = true;

    // Header & Question number updates
    const progressText = document.getElementById("quiz-progress-text");
    if (progressText) {
      progressText.textContent = `Question ${qIndex + 1} of ${state.questions.length}`;
    }

    const mobileProg = document.getElementById("mobile-quiz-progress");
    if (mobileProg) {
      mobileProg.textContent = `Q ${qIndex + 1}/${state.questions.length}`;
    }
    
    const answeredCount = state.userAnswers.filter((a) => a !== null).length;
    const progressBar = document.getElementById("quiz-progress-bar");
    if (progressBar) {
      progressBar.style.width = `${(answeredCount / state.questions.length) * 100}%`;
    }

    // Difficulty Chip
    const diffBadge = document.getElementById("quiz-diff-badge");
    if (diffBadge) {
      diffBadge.textContent = q.difficulty.toUpperCase();
      diffBadge.className = `badge badge-${q.difficulty}`;
    }

    // Question text & code
    document.getElementById("quiz-q-text").textContent = q.q;
    const codeBlock = document.getElementById("quiz-code-block");
    if (q.code) {
      codeBlock.classList.remove("hidden");
      codeBlock.querySelector("code").textContent = q.code;
    } else {
      codeBlock.classList.add("hidden");
    }

    // Render 4 Options
    const optionsContainer = document.getElementById("quiz-options-container");
    optionsContainer.innerHTML = "";

    const mapping = state.optionMappings[qIndex]; // array like [2, 0, 3, 1]
    const currentSelectedOriginalIdx = state.userAnswers[qIndex];
    const isQuestionLockedInPractice = state.mode === "practice" && currentSelectedOriginalIdx !== null;

    mapping.forEach((origIdx, displayIdx) => {
      const optionLetter = String.fromCharCode(65 + displayIdx); // A, B, C, D
      const optionText = q.options[origIdx];
      const isSelected = currentSelectedOriginalIdx === origIdx;

      let optionClass = "option-card";
      let statusIndicator = "";

      if (isSelected) {
        optionClass += " selected";
      }

      if (isQuestionLockedInPractice) {
        optionClass += " disabled";
        if (origIdx === q.answer) {
          optionClass += " correct-practice";
          statusIndicator = `<span class="opt-status-badge success">✓ Correct</span>`;
        } else if (isSelected && origIdx !== q.answer) {
          optionClass += " wrong-practice";
          statusIndicator = `<span class="opt-status-badge danger">✕ Incorrect</span>`;
        }
      }

      const optBtn = document.createElement("button");
      optBtn.className = optionClass;
      optBtn.disabled = isQuestionLockedInPractice;
      optBtn.setAttribute("aria-label", `Option ${optionLetter}: ${optionText}`);
      optBtn.onclick = () => selectOption(origIdx);

      optBtn.innerHTML = `
        <span class="option-key">${optionLetter}</span>
        <span class="option-label">${escapeHtml(optionText)}</span>
        ${statusIndicator}
      `;

      optionsContainer.appendChild(optBtn);
    });

    // Practice mode explanation box
    const expBox = document.getElementById("quiz-explanation-box");
    if (isQuestionLockedInPractice && expBox) {
      expBox.classList.remove("hidden");
      expBox.innerHTML = `
        <div class="exp-title">💡 Explanation</div>
        <p>${escapeHtml(q.explanation)}</p>
      `;
    } else if (expBox) {
      expBox.classList.add("hidden");
    }

    // Update Mark for Review button state
    const markBtn = document.getElementById("btn-mark-review");
    if (markBtn) {
      markBtn.classList.toggle("active", state.marked[qIndex]);
      markBtn.innerHTML = state.marked[qIndex] ? "🚩 Marked for Review" : "🏳️ Mark for Review";
    }

    // Update Prev / Next buttons
    const prevBtn = document.getElementById("btn-prev-q");
    const nextBtn = document.getElementById("btn-next-q");
    if (prevBtn) prevBtn.disabled = qIndex === 0;
    if (nextBtn) nextBtn.textContent = qIndex === state.questions.length - 1 ? "Review & Submit" : "Next →";

    renderPalette();
    saveSession();
  }

  function selectOption(originalOptionIdx) {
    const qIndex = state.currentIndex;
    
    // In practice mode, if already answered, lock selection
    if (state.mode === "practice" && state.userAnswers[qIndex] !== null) {
      return;
    }

    // Toggle selection (selecting same option deselects it)
    if (state.userAnswers[qIndex] === originalOptionIdx) {
      state.userAnswers[qIndex] = null;
      if (window.Nexi) window.Nexi.react("question_cleared");
    } else {
      state.userAnswers[qIndex] = originalOptionIdx;
      const q = state.questions[qIndex];
      const isCorrect = originalOptionIdx === q.answer;

      if (window.Nexi) {
        if (state.mode === "practice") {
          window.Nexi.react(isCorrect ? "option_correct_practice" : "option_wrong_practice");
        } else {
          window.Nexi.react("option_selected");
        }
      }
    }

    renderQuizQuestion();
  }

  function clearResponse() {
    const qIndex = state.currentIndex;
    if (state.mode === "practice" && state.userAnswers[qIndex] !== null) return;

    state.userAnswers[qIndex] = null;
    if (window.Nexi) window.Nexi.react("question_cleared");
    renderQuizQuestion();
  }

  function toggleMarkForReview() {
    const qIndex = state.currentIndex;
    state.marked[qIndex] = !state.marked[qIndex];
    if (state.marked[qIndex] && window.Nexi) {
      window.Nexi.react("question_marked");
    }
    renderQuizQuestion();
  }

  function navigateQuestion(direction) {
    if (direction === "next") {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        renderQuizQuestion();
      } else {
        openSubmitModal();
      }
    } else if (direction === "prev") {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuizQuestion();
      }
    }
  }

  function jumpToQuestion(idx) {
    if (idx >= 0 && idx < state.questions.length) {
      state.currentIndex = idx;
      renderQuizQuestion();
      closeMobilePalette();
    }
  }

  /**
   * QUESTION NAVIGATION PALETTE ENGINE
   */
  function renderPalette() {
    const grid = document.getElementById("palette-grid");
    if (!grid) return;

    grid.innerHTML = "";

    let answeredCount = 0;
    let markedCount = 0;
    let visitedCount = 0;
    let unvisitedCount = 0;

    state.questions.forEach((_, idx) => {
      const isAnswered = state.userAnswers[idx] !== null;
      const isMarked = state.marked[idx];
      const isVisited = state.visited[idx];
      const isCurrent = idx === state.currentIndex;

      if (isAnswered) answeredCount++;
      if (isMarked) markedCount++;
      if (isVisited && !isAnswered) visitedCount++;
      if (!isVisited) unvisitedCount++;

      let itemClass = "palette-item";
      let iconSymbol = "⚪";

      if (isAnswered) {
        itemClass += " answered";
        iconSymbol = "✓";
      } else if (isVisited) {
        itemClass += " visited";
        iconSymbol = "▢";
      } else {
        itemClass += " unvisited";
        iconSymbol = "○";
      }

      if (isMarked) {
        itemClass += " marked";
        iconSymbol = "🚩";
      }

      if (isCurrent) {
        itemClass += " current";
      }

      const itemBtn = document.createElement("button");
      itemBtn.className = itemClass;
      itemBtn.setAttribute("aria-label", `Question ${idx + 1}: ${isAnswered ? "Answered" : "Unanswered"}`);
      itemBtn.onclick = () => jumpToQuestion(idx);

      itemBtn.innerHTML = `
        <span class="palette-num">${idx + 1}</span>
        <span class="palette-icon">${iconSymbol}</span>
        ${isMarked && isAnswered ? `<span class="palette-dot"></span>` : ""}
      `;

      grid.appendChild(itemBtn);
    });

    // Update legend live count badges
    const badgeAnswered = document.getElementById("legend-answered-count");
    const badgeMarked = document.getElementById("legend-marked-count");
    const badgeVisited = document.getElementById("legend-visited-count");
    const badgeUnvisited = document.getElementById("legend-unvisited-count");

    if (badgeAnswered) badgeAnswered.textContent = answeredCount;
    if (badgeMarked) badgeMarked.textContent = markedCount;
    if (badgeVisited) badgeVisited.textContent = visitedCount;
    if (badgeUnvisited) badgeUnvisited.textContent = unvisitedCount;
  }

  function toggleMobilePalette() {
    const drawer = document.getElementById("quiz-sidebar");
    if (drawer) drawer.classList.toggle("open-drawer");
  }

  function closeMobilePalette() {
    const drawer = document.getElementById("quiz-sidebar");
    if (drawer) drawer.classList.remove("open-drawer");
  }

  /**
   * SUBMIT CONFIRMATION & EVALUATION ENGINE
   */
  function openSubmitModal() {
    const modal = document.getElementById("modal-submit-confirm");
    if (!modal) return;

    const answered = state.userAnswers.filter((a) => a !== null).length;
    const unanswered = state.questions.length - answered;
    const marked = state.marked.filter((m) => m).length;

    document.getElementById("submit-modal-answered").textContent = answered;
    document.getElementById("submit-modal-unanswered").textContent = unanswered;
    document.getElementById("submit-modal-marked").textContent = marked;

    modal.classList.remove("hidden");
    if (window.Nexi) window.Nexi.react("submit_modal");
  }

  function closeSubmitModal() {
    const modal = document.getElementById("modal-submit-confirm");
    if (modal) modal.classList.add("hidden");
  }

  function autoSubmitQuiz() {
    closeSubmitModal();
    evaluateAndShowResult();
  }

  function confirmSubmitQuiz() {
    closeSubmitModal();
    stopTimer();
    sessionStorage.removeItem("nexus_active_session");
    evaluateAndShowResult();
  }

  /**
   * SCORING & ACCURACY MATHEMATICS (WOW RESULT SCREEN)
   */
  function evaluateAndShowResult() {
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let markedCount = 0;

    state.questions.forEach((q, idx) => {
      const userChoice = state.userAnswers[idx];
      if (userChoice === null) {
        skippedCount++;
      } else if (userChoice === q.answer) {
        correctCount++;
      } else {
        wrongCount++;
      }

      if (state.marked[idx]) markedCount++;
    });

    const totalCount = state.questions.length;
    const attemptedCount = correctCount + wrongCount;
    
    // Exact Math Formulas
    const score = correctCount;
    const scorePercent = Math.round((correctCount / totalCount) * 100);
    const accuracyPercent = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const timeTaken = state.timeLimit - state.timeLeft;

    // Save Attempt to LocalStorage History
    const attemptRecord = {
      id: `hist_${Date.now()}`,
      topicId: state.currentTopicId,
      topicName: state.topicName,
      score: score,
      total: totalCount,
      scorePercent: scorePercent,
      accuracyPercent: accuracyPercent,
      timeTaken: timeTaken,
      mode: state.mode,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    state.history.unshift(attemptRecord);
    if (state.history.length > 10) state.history.pop();
    localStorage.setItem("nexus_quiz_history", JSON.stringify(state.history));

    // Prepare Result UI
    showScreen(4);

    // Animate Score Counter (0 to final)
    animateScoreNumber("result-score-val", 0, score, 1200);
    document.getElementById("result-score-total").textContent = `/ ${totalCount}`;
    
    // Circular SVG Ring for Accuracy
    animateAccuracyRing(accuracyPercent);

    // Performance Badge & Roast
    let perfLabel = "Needs Practice";
    let perfClass = "badge-danger";
    let reactionEvent = "result_needs_practice";

    if (scorePercent >= 90) {
      perfLabel = "Outstanding";
      perfClass = "badge-success";
      reactionEvent = "result_outstanding";
    } else if (scorePercent >= 70) {
      perfLabel = "Great";
      perfClass = "badge-primary";
      reactionEvent = "result_great";
    } else if (scorePercent >= 50) {
      perfLabel = "Good";
      perfClass = "badge-warning";
      reactionEvent = "result_good";
    }

    const perfChip = document.getElementById("result-perf-chip");
    if (perfChip) {
      perfChip.textContent = perfLabel;
      perfChip.className = `badge ${perfClass}`;
    }

    document.getElementById("result-time-taken").textContent = formatTime(timeTaken);
    document.getElementById("result-correct-count").textContent = correctCount;
    document.getElementById("result-wrong-count").textContent = wrongCount;
    document.getElementById("result-skipped-count").textContent = skippedCount;
    document.getElementById("result-marked-count").textContent = markedCount;

    // Trigger Confetti Burst if score >= 70%
    if (scorePercent >= 70) {
      launchConfetti(scorePercent === 100);
    }

    // Render Review Section
    renderReviewSection("all");

    if (window.Nexi) window.Nexi.react(reactionEvent);
  }

  function animateScoreNumber(elemId, start, end, duration) {
    const obj = document.getElementById(elemId);
    if (!obj) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function animateAccuracyRing(percent) {
    const circle = document.getElementById("accuracy-ring-circle");
    const text = document.getElementById("accuracy-ring-text");
    if (!circle || !text) return;

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percent}%`;
  }

  /**
   * REVIEW SECTION & FILTERS
   */
  function renderReviewSection(filter) {
    state.reviewFilter = filter;
    const reviewList = document.getElementById("review-list-container");
    if (!reviewList) return;

    reviewList.innerHTML = "";

    // Sync active tab
    document.querySelectorAll(".review-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.getAttribute("data-filter") === filter);
    });

    state.questions.forEach((q, idx) => {
      const userChoiceOriginal = state.userAnswers[idx];
      const isCorrect = userChoiceOriginal === q.answer;
      const isSkipped = userChoiceOriginal === null;
      const isMarked = state.marked[idx];

      // Apply Filter
      if (filter === "correct" && !isCorrect) return;
      if (filter === "wrong" && (isCorrect || isSkipped)) return;
      if (filter === "skipped" && !isSkipped) return;
      if (filter === "marked" && !isMarked) return;

      let cardClass = "review-item-card glass-card";
      let statusBadge = `<span class="badge badge-success">✓ Correct</span>`;

      if (isSkipped) {
        cardClass += " skipped";
        statusBadge = `<span class="badge badge-warning">⚪ Skipped</span>`;
      } else if (!isCorrect) {
        cardClass += " wrong";
        statusBadge = `<span class="badge badge-danger">✕ Wrong</span>`;
      }

      // Display options list for review
      const mapping = state.optionMappings[idx];
      let optionsHTML = "";

      mapping.forEach((origIdx, displayIdx) => {
        const optionLetter = String.fromCharCode(65 + displayIdx);
        const optionText = q.options[origIdx];

        let optClass = "review-opt-line";
        if (origIdx === q.answer) optClass += " correct-target";
        if (userChoiceOriginal === origIdx && origIdx !== q.answer) optClass += " wrong-target";

        optionsHTML += `
          <div class="${optClass}">
            <strong>${optionLetter}.</strong> ${escapeHtml(optionText)}
            ${origIdx === q.answer ? ` <span class="review-correct-label">(Correct Answer)</span>` : ""}
            ${userChoiceOriginal === origIdx && origIdx !== q.answer ? ` <span class="review-your-label">(Your Choice)</span>` : ""}
          </div>
        `;
      });

      const card = document.createElement("div");
      card.className = cardClass;
      card.innerHTML = `
        <div class="review-card-header">
          <span>Question ${idx + 1} ${isMarked ? "🚩 (Marked)" : ""}</span>
          ${statusBadge}
        </div>
        <h4 class="review-q-title">${escapeHtml(q.q)}</h4>
        ${q.code ? `<pre class="code-snippet"><code>${escapeHtml(q.code)}</code></pre>` : ""}
        <div class="review-options-list">${optionsHTML}</div>
        <div class="review-explanation-box">
          <strong>💡 Explanation:</strong> ${escapeHtml(q.explanation)}
        </div>
      `;

      reviewList.appendChild(card);
    });

    if (reviewList.children.length === 0) {
      reviewList.innerHTML = `<div class="empty-state">No questions match the "${filter}" filter.</div>`;
    }
  }

  function retryQuiz(wrongOnly = false) {
    if (wrongOnly) {
      const wrongQuestions = state.questions.filter((q, idx) => {
        return state.userAnswers[idx] !== null && state.userAnswers[idx] !== q.answer;
      });

      if (wrongQuestions.length === 0) {
        alert("You have no wrong answers to retry!");
        return;
      }

      setupPreQuiz(`${state.topicName} (Retry Wrong)`, wrongQuestions, 45);
    } else {
      setupPreQuiz(state.topicName, state.questions, 45);
    }
  }

  /**
   * CUSTOM CANVAS CONFETTI ENGINE (No external libraries)
   */
  function launchConfetti(isGrand = false) {
    let canvas = document.getElementById("confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "confetti-canvas";
      canvas.className = "confetti-canvas";
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const count = isGrand ? 150 : 80;
    const pieces = [];
    const colors = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#8b5cf6"];

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 6 - 3
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (Date.now() - startTime < 4000) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    render();
  }

  /**
   * SESSION STORAGE RESUMPTION
   */
  function saveSession() {
    if (state.currentScreen !== 3) return;

    const sessionData = {
      topicId: state.currentTopicId,
      topicName: state.topicName,
      questions: state.questions,
      userAnswers: state.userAnswers,
      optionMappings: state.optionMappings,
      marked: state.marked,
      visited: state.visited,
      currentIndex: state.currentIndex,
      timeLimit: state.timeLimit,
      endTime: state.endTime,
      mode: state.mode
    };

    sessionStorage.setItem("nexus_active_session", JSON.stringify(sessionData));
  }

  function restoreQuizSession(data) {
    state.currentTopicId = data.topicId;
    state.topicName = data.topicName;
    state.questions = data.questions;
    state.userAnswers = data.userAnswers;
    state.optionMappings = data.optionMappings;
    state.marked = data.marked;
    state.visited = data.visited;
    state.currentIndex = data.currentIndex;
    state.timeLimit = data.timeLimit;
    state.endTime = data.endTime;
    state.mode = data.mode;

    showScreen(3);
  }

  /**
   * VOICE COMMAND INTEGRATION HANDLER
   */
  function handleVoiceCommand(action) {
    if (state.currentScreen !== 3) return;

    if (action === "next") navigateQuestion("next");
    else if (action === "previous") navigateQuestion("prev");
    else if (action === "mark") toggleMarkForReview();
    else if (action === "clear") clearResponse();
    else if (action === "submit") openSubmitModal();
    else if (action === "option_a") selectOption(state.optionMappings[state.currentIndex][0]);
    else if (action === "option_b") selectOption(state.optionMappings[state.currentIndex][1]);
    else if (action === "option_c") selectOption(state.optionMappings[state.currentIndex][2]);
    else if (action === "option_d") selectOption(state.optionMappings[state.currentIndex][3]);
    else if (action === "read") {
      const q = state.questions[state.currentIndex];
      if (q && window.Nexi) window.Nexi.speak(q.q, "talk-open");
    }
  }

  /**
   * KEYBOARD SHORTCUTS HANDLER
   */
  function setupEventListeners() {
    window.addEventListener("keydown", (e) => {
      // Language Screen (Screen 0)
      if (state.currentScreen === 0) {
        if (e.key === "1") selectLanguage("en");
        if (e.key === "2") selectLanguage("hi");
        return;
      }

      // Quiz Screen (Screen 3)
      if (state.currentScreen === 3) {
        // Prevent key interference when typing in inputs/modals
        if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

        const mapping = state.optionMappings[state.currentIndex];
        if (!mapping) return;

        if (e.key === "1" || e.key === "a" || e.key === "A") selectOption(mapping[0]);
        else if (e.key === "2" || e.key === "b" || e.key === "B") selectOption(mapping[1]);
        else if (e.key === "3" || e.key === "c" || e.key === "C") selectOption(mapping[2]);
        else if (e.key === "4" || e.key === "d" || e.key === "D") selectOption(mapping[3]);
        else if (e.key === "m" || e.key === "M") toggleMarkForReview();
        else if (e.key === "ArrowLeft") navigateQuestion("prev");
        else if (e.key === "ArrowRight") navigateQuestion("next");
        else if (e.key === "Escape") clearResponse();
      }
    });

    // Voice toggle in navbar
    document.getElementById("voice-master-toggle")?.addEventListener("change", () => {
      if (window.Nexi && typeof window.Nexi.toggleVoiceRecognition === "function") {
        window.Nexi.toggleVoiceRecognition();
      }
    });

    // Theme toggle
    document.getElementById("btn-theme-toggle")?.addEventListener("click", toggleTheme);

    // Mute toggle
    document.getElementById("btn-mute-toggle")?.addEventListener("click", () => {
      const isMuted = !window.Nexi.isMuted();
      window.Nexi.setMuted(isMuted);
      const btn = document.getElementById("btn-mute-toggle");
      if (btn) {
        btn.innerHTML = isMuted 
          ? `<svg class="nav-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg><span>Audio Off</span>`
          : `<svg class="nav-svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg><span>Audio On</span>`;
      }
    });

    // Replay tour
    document.getElementById("btn-replay-tour")?.addEventListener("click", () => {
      if (window.Nexi) window.Nexi.startTour();
    });

    // History button
    document.getElementById("btn-history")?.addEventListener("click", openHistoryModal);

    // Mode switch toggle
    document.getElementById("mode-switch-toggle")?.addEventListener("change", (e) => {
      toggleMode(e.target.checked);
    });
  }

  function openHistoryModal() {
    const modal = document.getElementById("modal-history");
    if (!modal) return;

    const list = document.getElementById("history-list-container");
    list.innerHTML = "";

    if (state.history.length === 0) {
      list.innerHTML = `<div class="empty-state">No quiz attempts recorded yet. Take your first quiz!</div>`;
    } else {
      state.history.forEach((item) => {
        list.innerHTML += `
          <div class="history-item-row">
            <div>
              <strong>${escapeHtml(item.topicName)}</strong>
              <small>${item.date} • ${item.mode.toUpperCase()}</small>
            </div>
            <div class="history-item-stats">
              <span class="badge ${item.scorePercent >= 70 ? "badge-success" : "badge-warning"}">${item.score}/${item.total} (${item.scorePercent}%)</span>
              <small>Accuracy: ${item.accuracyPercent}%</small>
            </div>
          </div>
        `;
      });
    }

    modal.classList.remove("hidden");
  }

  function closeHistoryModal() {
    document.getElementById("modal-history")?.classList.add("hidden");
  }

  function clearHistory() {
    state.history = [];
    localStorage.removeItem("nexus_quiz_history");
    openHistoryModal();
  }

  function updateHeaderStats() {
    // Optionally update quick stats in header
  }

  // UTILITY HELPERS
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  return {
    init,
    showScreen,
    selectLanguage,
    selectTopic,
    setupPreQuiz,
    startQuiz,
    selectOption,
    clearResponse,
    toggleMarkForReview,
    navigateQuestion,
    jumpToQuestion,
    toggleMobilePalette,
    openSubmitModal,
    closeSubmitModal,
    confirmSubmitQuiz,
    renderReviewSection,
    retryQuiz,
    openHistoryModal,
    closeHistoryModal,
    clearHistory,
    handleVoiceCommand
  };
})();

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  if (window.Nexi) window.Nexi.init();
  if (window.NexusQuiz) window.NexusQuiz.init();
});
