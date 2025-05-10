let currentQuestion = 0;
let score = 0;

document.getElementById("start-btn").addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById("quiz-container");
  const q = questions[currentQuestion];
  container.innerHTML = "";

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
  form.className = "quiz-form"

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

    div.appendChild(input);
    div.appendChild(label);
    form.appendChild(div);
  });

  const submitBtn = createElement("button", null, "Valider");
  submitBtn.type = "submit";
  form.appendChild(submitBtn);

  form.onsubmit = (e) => {
    e.preventDefault();
    validateAnswer();
  };

  container.appendChild(form);
}

function validateAnswer() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    alert("Veuillez sélectionner une réponse !");
    return;
  }

  const answer = selected.value.trim();
  const correct = questions[currentQuestion].correct.trim();

  if (answer === correct) score++;

  currentQuestion++;

  currentQuestion < questions.length ? showQuestion() : showResults();
}

function showResults() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  container.appendChild(createElement("h2", null, `Votre Score : ${score} / ${questions.length}`));

  let message = "";
  if (score === questions.length) message = "Excellent travail !";
  else if (score >= questions.length / 2) message = "Bien joué, mais vous pouvez faire mieux !";
  else message = "Il est temps de réviser !";

  container.appendChild(createElement("p", null, message));

  const restart = createElement("button", null, "Recommencer");
  restart.onclick = startQuiz;
  container.appendChild(restart);
}
