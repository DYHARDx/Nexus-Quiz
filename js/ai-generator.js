/**
 * js/ai-generator.js
 * NEXUS QUIZ - Gemini AI Quiz Generator Integration
 * Generates custom quizzes on any topic using Google Gemini API.
 */

// CLEARLY COMMENTED CONSTANT FOR GEMINI MODEL AS REQUIRED
const GEMINI_MODEL = "gemini-2.5-flash";

window.NexusAI = (function () {
  let memoryApiKey = "";

  function getApiKey() {
    const storedKey = localStorage.getItem("nexus_gemini_api_key");
    if (storedKey) return storedKey;
    return memoryApiKey;
  }

  function setApiKey(key, remember) {
    if (remember) {
      localStorage.setItem("nexus_gemini_api_key", key);
    } else {
      localStorage.removeItem("nexus_gemini_api_key");
    }
    memoryApiKey = key;
  }

  function removeApiKey() {
    localStorage.removeItem("nexus_gemini_api_key");
    memoryApiKey = "";
  }

  function isKeyStoredLocally() {
    return !!localStorage.getItem("nexus_gemini_api_key");
  }

  /**
   * Clean JSON string from potential markdown code fences
   */
  function cleanJsonResponse(rawText) {
    let clean = rawText.trim();
    if (clean.startsWith("```")) {
      clean = clean.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    }
    return clean;
  }

  /**
   * Validate generated JSON structure
   */
  function validateQuestions(data, expectedCount) {
    if (!data || !Array.isArray(data.questions)) return false;
    const qList = data.questions;
    if (qList.length !== expectedCount) return false;

    for (let i = 0; i < qList.length; i++) {
      const item = qList[i];
      if (typeof item.q !== "string" || !item.q.trim()) return false;
      if (!Array.isArray(item.options) || item.options.length !== 4) return false;
      for (let opt of item.options) {
        if (typeof opt !== "string" || !opt.trim()) return false;
      }
      if (typeof item.answer !== "number" || item.answer < 0 || item.answer > 3) return false;
      if (typeof item.explanation !== "string" || !item.explanation.trim()) return false;
      
      // Check for duplicate options
      const uniqueOpts = new Set(item.options.map(o => o.trim().toLowerCase()));
      if (uniqueOpts.size < 4) return false;
    }
    return true;
  }

  /**
   * Primary method to generate questions from Gemini REST API
   */
  async function generateQuiz(topic, level, count) {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error("MISSING_API_KEY");
    }

    if (!navigator.onLine) {
      throw new Error("OFFLINE");
    }

    const promptText = `Generate a high-quality, multiple-choice quiz on the topic "${topic}".
Difficulty level: ${level}.
Number of questions: ${count}.

CRITICAL REQUIREMENTS:
- You MUST return ONLY valid JSON matching this exact schema:
{
  "questions": [
    {
      "q": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 0,
      "explanation": "Clear one-line explanation of why this answer is correct."
    }
  ]
}
- Exactly ${count} questions.
- Exactly 4 distinct options per question.
- "answer" must be the zero-based index (0, 1, 2, or 3) of the correct option in the options array.
- "explanation" must be precise and accurate.
- DO NOT wrap in markdown text, return raw JSON string.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    };

    let attempt = 0;
    let maxAttempts = 2;
    let lastError = null;

    while (attempt < maxAttempts) {
      attempt++;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          if (response.status === 400 || response.status === 403) {
            throw new Error("INVALID_API_KEY");
          } else if (response.status === 429) {
            throw new Error("RATE_LIMIT");
          } else {
            throw new Error(`API_ERROR_${response.status}`);
          }
        }

        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!candidateText) {
          throw new Error("BAD_RESPONSE_FORMAT");
        }

        const cleanedJson = cleanJsonResponse(candidateText);
        const parsed = JSON.parse(cleanedJson);

        if (validateQuestions(parsed, count)) {
          // Format into internal schema with unique IDs
          return parsed.questions.map((q, idx) => ({
            id: `ai_${Date.now()}_${idx}`,
            topic: `ai_${topic.toLowerCase().replace(/\s+/g, '_')}`,
            topicName: `AI: ${topic}`,
            difficulty: level.toLowerCase(),
            q: q.q,
            options: q.options,
            answer: q.answer,
            explanation: q.explanation
          }));
        } else {
          lastError = new Error("INVALID_JSON_SCHEMA");
        }
      } catch (err) {
        lastError = err;
        if (err.message === "MISSING_API_KEY" || err.message === "INVALID_API_KEY" || err.message === "OFFLINE") {
          throw err; // Do not retry auth or network errors
        }
      }
    }

    throw lastError || new Error("GENERATION_FAILED");
  }

  return {
    getApiKey,
    setApiKey,
    removeApiKey,
    isKeyStoredLocally,
    generateQuiz
  };
})();
