const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language"],
    correct: 1
  },
  {
    question: "Which language is used for styling?",
    answers: ["HTML", "CSS", "JavaScript"],
    correct: 1
  },
  {
    question: "Which is a JavaScript framework?",
    answers: ["Django", "React", "Flask"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

// Screens
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");

// 🔹 Start Quiz
function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

// 🔹 Load Question
function loadQuestion() {
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";

  const q = questions[currentQuestion];
  questionEl.innerText = q.question;

  // Progress
  progressEl.innerText = `Question ${currentQuestion + 1} of ${questions.length}`;

  q.answers.forEach((ans, index) => {
    const btn = document.createElement("button");
    btn.innerText = ans;

    btn.onclick = () => selectAnswer(index, btn);
    answersEl.appendChild(btn);
  });
}

// 🔹 Select Answer
function selectAnswer(index, selectedBtn) {
  const correct = questions[currentQuestion].correct;
  const buttons = answersEl.children;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;

    if (i === correct) {
      buttons[i].classList.add("correct");
    } else if (buttons[i] === selectedBtn) {
      buttons[i].classList.add("wrong");
    }
  }

  if (index === correct) score++;

  nextBtn.style.display = "block";
}

// 🔹 Next
nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// 🔹 Result
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const feedback = getFeedback();

  document.getElementById("score").innerText =
    `🎉 Your Score: ${score}/${questions.length}`;
  document.getElementById("feedback").innerText = feedback;
}

// 🔹 Feedback
function getFeedback() {
  const percent = (score / questions.length) * 100;

  if (percent === 100) return "Excellent! 🔥";
  if (percent >= 70) return "Great job! 👍";
  if (percent >= 40) return "Good effort! 💪";
  return "Keep practicing! 😊";
}

// 🔹 Restart
function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}