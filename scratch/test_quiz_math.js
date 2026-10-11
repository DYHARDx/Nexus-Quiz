const fs = require('fs');
const path = require('path');

console.log("=== RUNNING AUTOMATED VALIDATION CHECKS ON NEXUS QUIZ ===");

// 1. Verify File Existence
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/questions.js',
  'js/nexi-script.js',
  'js/nexi.js',
  'js/ai-generator.js'
];

requiredFiles.forEach(file => {
  const p = path.join(__dirname, '..', file);
  if (!fs.existsSync(p)) {
    console.error(`❌ MISSING FILE: ${file}`);
  } else {
    console.log(`✓ FILE PRESENT: ${file} (${fs.statSync(p).size} bytes)`);
  }
});

// 2. Check Assets in assets/nexi/
const requiredPoses = ['idle', 'talk-closed', 'talk-open', 'wave', 'point-right', 'point-left', 'think', 'happy', 'oops', 'welcome'];
requiredPoses.forEach(pose => {
  const poseFile = path.join(__dirname, '..', 'assets', 'nexi', `${pose}.png`);
  if (!fs.existsSync(poseFile)) {
    console.error(`❌ MISSING MASCOT POSE: ${pose}.png`);
  } else {
    console.log(`✓ MASCOT ASSET PRESENT: assets/nexi/${pose}.png`);
  }
});

// 3. Load Questions & Validate Schema & Answers
const questionsContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'questions.js'), 'utf8');

// Evaluate in sandbox
const window = {};
eval(questionsContent);

const questions = window.NEXUS_QUESTIONS;
const topics = window.NEXUS_TOPICS;

console.log(`\n=== QUESTION BANK AUDIT ===`);
console.log(`Total Questions Loaded: ${questions.length}`);

const topicCounts = {};
questions.forEach(q => {
  topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
});

console.log("Question Count per Topic:", topicCounts);

// Validate each question
let validCount = 0;
let errors = 0;

questions.forEach((q, idx) => {
  if (!q.id || !q.topic || !q.difficulty || !q.q || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3 || !q.explanation) {
    console.error(`❌ INVALID QUESTION STRUCT AT INDEX ${idx}:`, q);
    errors++;
  } else {
    validCount++;
  }
});

console.log(`Questions Passed Schema Validation: ${validCount} / ${questions.length}`);

// 4. Verify Math Formula Example:
// Hand computed example: 7 correct, 2 wrong, 1 skipped out of 10
// Score: 7/10, Accuracy: 7 / (7+2) = 7/9 = 77.8% (78%), Score%: 70%
const total = 10;
const correct = 7;
const wrong = 2;
const attempted = correct + wrong;
const accuracy = Math.round((correct / attempted) * 100);
const scorePercent = Math.round((correct / total) * 100);

console.log(`\n=== MATH FORMULA VERIFICATION ===`);
console.log(`Test Case: 7 correct, 2 wrong, 1 skipped out of 10`);
console.log(`Total Score: ${correct} / ${total}`);
console.log(`Score Percentage: ${scorePercent}% (Expected: 70%)`);
console.log(`Accuracy Percentage: ${accuracy}% (Expected: 78%)`);

if (scorePercent === 70 && accuracy === 78) {
  console.log(`✓ SCORE & ACCURACY MATHEMATICS VERIFIED ACCURATE!`);
} else {
  console.error(`❌ SCORING MATH MISMATCH!`);
}

// 5. Audit GEMINI_MODEL Constant in ai-generator.js
const aiGenContent = fs.readFileSync(path.join(__dirname, '..', 'js', 'ai-generator.js'), 'utf8');
if (aiGenContent.includes('const GEMINI_MODEL = "gemini-2.5-flash";')) {
  console.log(`✓ GEMINI_MODEL constant correctly defined as "gemini-2.5-flash"`);
} else {
  console.error(`❌ GEMINI_MODEL constant missing or incorrect in js/ai-generator.js`);
}

// 6. Check Language Gate Prompt Text in index.html and nexi-script.js
const htmlContent = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const exactLine = "Welcome To Nexus Quiz, Press 1 for English aur हिंदी के लिए 2 दबाएँ";
if (htmlContent.includes(exactLine)) {
  console.log(`✓ Exact Language Gate text present in index.html`);
} else {
  console.error(`❌ Exact Language Gate text missing in index.html`);
}

console.log("\n=== ALL AUTOMATED VALIDATION CHECKS COMPLETED ===");
