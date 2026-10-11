/**
 * js/nexi-script.js
 * NEXI THE PANDA MASCOT - Dialogue, FAQ, Reactions & Voice Command Script
 */
window.NEXI_SCRIPT = {
  welcomeLine: "Welcome To Nexus Quiz, Press 1 for English aur हिंदी के लिए 2 दबाएँ",

  en: {
    tourPrompt: "Hello! I am Nexi, your AI quiz companion! Would you like a quick 1-minute guided tour of Nexus Quiz?",
    tour: [
      {
        target: "#app-header",
        pose: "wave",
        title: "Header & Settings",
        text: "Here you can toggle Dark/Light theme, mute my voice, replay this tour, or view your past quiz history!"
      },
      {
        target: "#mode-switch-container",
        pose: "point-right",
        title: "Quiz Mode Switch",
        text: "Choose between 'Exam Mode' (real test feel, feedback at end) and 'Practice Mode' (instant feedback & explanations after each option)!"
      },
      {
        target: "#topic-grid",
        pose: "welcome",
        title: "Core Quiz Topics",
        text: "Select from 4 essential aptitude & CS topics: Aptitude, C Programming, Fundamentals, and Web Basics."
      },
      {
        target: "#extra-topic-grid",
        pose: "point-left",
        title: "More Specialized Topics",
        text: "Expand your preparation with DSA, DBMS, Operating Systems, and Verbal English tests."
      },
      {
        target: "#ai-card",
        pose: "think",
        title: "Gemini AI Generator",
        text: "Generate unlimited custom quizzes on ANY topic using your Google Gemini API key!"
      }
    ],
    reactions: {
      welcome: "Awesome! Language set to English. Let's conquer these quizzes together!",
      quiz_start: "Best of luck! Read each question carefully and keep an eye on the clock.",
      option_selected: "Option saved! You can change it anytime before submitting.",
      option_correct_practice: "Bingo! Bullseye! That is the correct answer!",
      option_wrong_practice: "Oops, not quite! Check the explanation below to learn why.",
      question_marked: "Flagged for review! You can jump back to this question from the palette later.",
      question_cleared: "Response cleared. Take your time to re-evaluate.",
      timer_amber: "Quarter time left! Don't panic, but pace yourself!",
      timer_red: "Warning! Only 30 seconds remaining! Wrap up your answers!",
      time_up: "Time is up! Submitting your test automatically now...",
      submit_modal: "Ready to submit? Check your summary numbers before final lock-in.",
      result_outstanding: "Mindblowing performance! You absolutely nailed this test! 🌟",
      result_great: "Great work! Solid score! You are well prepared for placement tests.",
      result_good: "Good effort! A bit more practice on your weak areas and you'll hit 90%+!",
      result_needs_practice: "Don't get discouraged! Review your wrong answers and try again.",
      ai_generating: "Brainstorming with Gemini AI... Crafting fresh questions for you!",
      ai_error: "Hmm, the AI generator hit a snag. No worries, let's fall back to a built-in topic!"
    },
    faq: [
      {
        keywords: ["timer", "time", "clock", "countdown", "seconds", "minutes"],
        topic: "Timer",
        text: "Our countdown timer uses accurate delta timestamps, so it stays perfectly synced even if you switch tabs! It turns amber at 25% time left and red in the final 30 seconds."
      },
      {
        keywords: ["palette", "grid", "colors", "jump", "flag", "marked", "answered", "legend"],
        topic: "Palette",
        text: "The Question Palette lets you jump to any question! States: Green = Answered, Grey outline = Visited, Plain = Unvisited, Purple Flag = Marked for Review, Glowing Ring = Current Question."
      },
      {
        keywords: ["scoring", "score", "marks", "negative", "accuracy", "evaluation", "percentage"],
        topic: "Scoring",
        text: "Each correct answer gives +1 mark. There is zero negative marking! Accuracy % is calculated as (Correct Answers / Total Attempted) × 100."
      },
      {
        keywords: ["ai", "gemini", "generator", "key", "api", "custom"],
        topic: "AI Quiz",
        text: "You can generate custom quizzes on any topic! Enter your Gemini API key from Google AI Studio. Your key stays 100% private in your browser."
      },
      {
        keywords: ["voice", "mic", "speak", "command", "talk", "dictate"],
        topic: "Voice",
        text: "Click the mic icon or press voice shortcuts on the quiz screen! You can say 'Option A', 'Next', 'Previous', 'Mark', or 'Submit' to control the quiz hands-free."
      }
    ],
    fallbackAnswer: "I'm Nexi! You can ask me about the Timer, Scoring, AI Quiz Generator, or Voice Commands!"
  },

  hi: {
    tourPrompt: "नमस्ते! मैं नेक्सी (Nexi) हूँ, आपका AI क्विज़ साथी! क्या आप Nexus Quiz का 1-मिनट का क्विक टूर लेना चाहेंगे?",
    tour: [
      {
        target: "#app-header",
        pose: "wave",
        title: "हेडर और सेटिंग्स",
        text: "यहाँ से आप डार्क/लाइट थीम बदल सकते हैं, मेरी आवाज़ म्यूट कर सकते हैं, टूर दोबारा देख सकते हैं या अपनी पुरानी क्विज़ हिस्ट्री देख सकते हैं!"
      },
      {
        target: "#mode-switch-container",
        pose: "point-right",
        title: "क्विज़ मोड स्विच",
        text: "'एग्जाम मोड' (असली टेस्ट अनुभव, अंत में रिजल्ट) और 'प्रैक्टिस मोड' (हर सवाल के बाद तुरंत उत्तर व एक्सप्लेनेशन) में से चुनें!"
      },
      {
        target: "#topic-grid",
        pose: "welcome",
        title: "मुख्य विषय",
        text: "4 मुख्य विषयों में से चुनें: General Aptitude, Basic C Programming, Computer Fundamentals, और Web Basics।"
      },
      {
        target: "#extra-topic-grid",
        pose: "point-left",
        title: "अन्य विशेष विषय",
        text: "अपनी तैयारी को और बेहतर बनाने के लिए DSA, DBMS, Operating Systems और Verbal English भी आज़माएं।"
      },
      {
        target: "#ai-card",
        pose: "think",
        title: "Gemini AI जनरेटर",
        text: "अपनी Gemini API Key डालकर किसी भी टॉपिक पर असीमित कस्टम क्विज़ बनाएं!"
      }
    ],
    reactions: {
      welcome: "बहुत बढ़िया! भाषा हिंदी चुनी गई है। चलिए मिलकर टेस्ट क्रैक करते हैं!",
      quiz_start: "ऑल द बेस्ट! हर सवाल को ध्यान से पढ़ें और समय का ध्यान रखें।",
      option_selected: "विकल्प सेव हो गया! आप सबमिट करने से पहले इसे कभी भी बदल सकते हैं।",
      option_correct_practice: "वाह! बिल्कुल सही जवाब! शानदार पकड़ा!",
      option_wrong_practice: "अरे रे, गलत जवाब! सही उत्तर और विवरण नीचे देखें।",
      question_marked: "रिव्यू के लिए मार्क कर दिया गया है! आप पैलेट से इस पर वापस आ सकते हैं।",
      question_cleared: "उत्तर हटा दिया गया है। फिर से सोच-समझकर चुनें।",
      timer_amber: "चौथाई समय बचा है! घबराएं नहीं, अपनी गति बनाए रखें!",
      timer_red: "सावधान! केवल 30 सेकंड बचे हैं! जल्दी से उत्तर पूरे करें!",
      time_up: "समय समाप्त! आपका क्विज़ अपने आप सबमिट हो रहा है...",
      submit_modal: "क्या आप सबमिट करने के लिए तैयार हैं? अंतिम सबमिट से पहले अपनी समरी देख लें।",
      result_outstanding: "अद्भुत प्रदर्शन! आपने तो कमाल कर दिया! 🌟",
      result_great: "बहुत शानदार! बेहतरीन स्कोर! आप प्लेसमेंट एग्ज़ाम के लिए तैयार हैं।",
      result_good: "अच्छा प्रयास! थोड़ी और प्रैक्टिस से आप 90%+ ला सकते हैं!",
      result_needs_practice: "हताश न हों! गलत उत्तरों की समीक्षा करें और दोबारा प्रयास करें।",
      ai_generating: "Gemini AI के साथ मिलकर नए सवाल तैयार किए जा रहे हैं...",
      ai_error: "अरे, AI जनरेटर में कुछ गड़बड़ हुई। कोई बात नहीं, built-in क्विज़ से शुरुआत करते हैं!"
    },
    faq: [
      {
        keywords: ["timer", "time", "समय", "घड़ी", "टाइमर", "सेकंड", "मिनट"],
        topic: "Timer",
        text: "हमारा टाइमर एकदम सटीक है! अगर आप टैब भी बदलेंगे, तो भी टाइमर बैकग्राउंड में सही समय दिखाता रहेगा।"
      },
      {
        keywords: ["palette", "grid", "रंग", "पैलेट", "नंबर", "मार्क", "ध्वज"],
        topic: "Palette",
        text: "क्वेश्चन पैलेट से आप किसी भी सवाल पर कूद सकते हैं! हरा = उत्तर दिया, ग्रे = देखा, सादा = नहीं देखा, बैंगनी ध्वज = रिव्यू के लिए मार्क।"
      },
      {
        keywords: ["scoring", "score", "नंबर", "अंक", "स्कोर", "एक्यूरेसी", "नेगेटिव"],
        topic: "Scoring",
        text: "हर सही जवाब पर +1 अंक मिलता है। कोई नेगेटिव मार्किंग नहीं है! एक्यूरेसी = (सही उत्तर / कुल हल किए सवाल) × 100."
      },
      {
        keywords: ["ai", "gemini", "जनरेटर", "एआई", "कुंजी", "की"],
        topic: "AI Quiz",
        text: "आप Google Gemini API Key की मदद से किसी भी टॉपिक पर नया क्विज़ बना सकते हैं! आपकी Key सुरक्षित आपके ब्राउज़र में ही रहती है।"
      },
      {
        keywords: ["voice", "mic", "आवाज़", "बोल", "माइक", "कमांड"],
        topic: "Voice",
        text: "माइक बटन दबाकर आप बोलकर उत्तर चुन सकते हैं! आप 'Option A', 'Next', 'Previous', 'Mark' या 'Submit' बोल सकते हैं।"
      }
    ],
    fallbackAnswer: "मैं नेक्सी हूँ! आप मुझसे टाइमर, स्कोरिंग, AI क्विज़ या वॉइस कमांड्स के बारे में पूछ सकते हैं!"
  },

  voiceCommands: {
    next: ["next", "अगला", "नेक्स्ट", "aage", "आगे"],
    previous: ["previous", "पिछला", "प्रीवियस", "piche", "पीछे"],
    mark: ["mark", "review", "मार्क", "रिव्यू"],
    clear: ["clear", "reset", "क्लियर", "हटाओ"],
    option_a: ["option a", "a", "one", "1", "विकल्प ए", "ए", "एक"],
    option_b: ["option b", "b", "two", "2", "विकल्प बी", "बी", "दो"],
    option_c: ["option c", "c", "three", "3", "विकल्प सी", "सी", "तीन"],
    option_d: ["option d", "d", "four", "4", "विकल्प डी", "डी", "चार"],
    submit: ["submit", "finish", "सबमिट", "खत्म"],
    read: ["read", "speak", "पढ़ो", "सुनाओ"],
    start: ["start", "begin", "शुरू", "स्टार्ट"],
    repeat: ["repeat", "फिर से", "दोबारा"]
  }
};
