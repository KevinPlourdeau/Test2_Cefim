let currentQuestion = 0;
let score = 0;
let timerInterval;
const timePerQuestion = 20; // secondes

const correctSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_a4cf6e7bfb.mp3");
const wrongSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_8ffb34f6b2.mp3");
const timeoutSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_148906dc70.mp3");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

document.getElementById("start-btn").addEventListener("click", startQuiz);

function showQuestion() {
  clearInterval(timerInterval);

  const container = document.getElementById("quiz-container");
  const q = questions[currentQuestion];
  container.innerHTML = "";

  // Timer
  const timerDisplay = createElement("div", "timer");
  timerDisplay.className = "timer";
  container.appendChild(timerDisplay);

  const warningMsg = createElement("div", "timer-warning", "⏰ Attention, il vous reste 10 secondes !");
  warningMsg.className = "timer-warning";
  warningMsg.style.display = "none";
  // déjà géré via createElement
  container.appendChild(warningMsg);

  let timeLeft = timePerQuestion;
  timerDisplay.innerText = `⏱️ Temps restant : ${timeLeft} sec`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `⏱️ Temps restant : ${timeLeft} sec`;
    if (timeLeft === 10) warningMsg.style.display = "block";
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeoutSound.play();
      validateAnswer(true); // auto validation
    }
  }, 1000);

  container.appendChild(createElement("h3", null, q.question));

  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.alt = "Illustration";
    img.className = "question-image";
    container.appendChild(img);
  }

  const form = document.createElement("form");
  form.id = "answers-form";
  form.className = "quiz-form";

  q.answers.forEach((answer, index) => {
    const div = createElement("div", "answer-option");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = `answer${index}`;
    input.value = answer;

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerText = answer;

    // Rendre tout le div cliquable
    div.onclick = () => input.click();

    div.appendChild(input);
    div.appendChild(label);
    form.appendChild(div);
  });

  const submitBtn = createElement("button", null, "Valider");
  submitBtn.type = "submit";
  submitBtn.id = "submit-btn";
  form.appendChild(submitBtn);

  form.onsubmit = (e) => {
    e.preventDefault();
    const selected = document.querySelector("input[name='answer']:checked");
    if (!selected) {
      alert("Veuillez sélectionner une réponse avant de valider.");
      return;
    }
    validateAnswer();
  };

  container.appendChild(form);
}

function validateAnswer(isAuto = false) {
  clearInterval(timerInterval);
  const container = document.getElementById("quiz-container");
  const selected = document.querySelector("input[name='answer']:checked");
  const q = questions[currentQuestion];

  const answer = selected ? selected.value.trim() : null;
  const correct = q.correct.trim();

  const feedback = createElement("div", "feedback");
  if (answer && answer === correct) {
    score++;
    correctSound.play();
    feedback.innerText = "✅ Bonne réponse !";
  } else {
    if (!isAuto) wrongSound.play();
    feedback.innerText = `❌ Mauvaise réponse. La bonne était : ${correct}`;
  }

  const submitButton = document.getElementById("submit-btn");
  if (submitButton) submitButton.style.display = "none";

  container.appendChild(feedback);

  const nextBtn = createElement("button", null, currentQuestion + 1 < questions.length ? "Question suivante" : "Voir les résultats");
  nextBtn.onclick = () => {
    currentQuestion++;
    currentQuestion < questions.length ? showQuestion() : showResults();
  };
  container.appendChild(nextBtn);
}

function showResults() {
  clearInterval(timerInterval);
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  container.appendChild(createElement("h2", null, `Votre Score : ${score} / ${questions.length}`));

  let message = "";
  if (score === questions.length) message = "Excellent travail !";
  else if (score >= questions.length / 2) message = "Bien joué, mais vous pouvez faire mieux !";
  else message = "Il est temps de réviser !";

  container.appendChild(createElement("p", null, message));

  saveHighScore(score);
  showHighScores(container);

  const restart = createElement("button", null, "Recommencer");
  restart.onclick = startQuiz;
  container.appendChild(restart);
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  return el;
}

function saveHighScore(score) {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push({ date: new Date().toLocaleString(), score });
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 5);
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function showHighScores(container) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  if (scores.length === 0) return;

  const table = createElement("table", "score-table");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Date</th><th>Score</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  scores.slice(0, 5).forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.date}</td><td>${entry.score}</td>`;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(createElement("h3", null, "🏆 Meilleurs scores"));
  container.appendChild(table);
}

