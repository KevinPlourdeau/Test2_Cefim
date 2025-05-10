// Objet Quiz encapsulant toute la logique du mini-quiz
const Quiz = {
    currentQuestion: 0,
    score: 0,            
    timerInterval: null,
    timePerQuestion: 20, 
  
    // Démarre le quiz
    start() {
      this.currentQuestion = 0;
      this.score = 0;
      this.showQuestion();
    },
  
    // Affiche une question et initialise le timer
    showQuestion() {
      clearInterval(this.timerInterval);
  
      const container = document.getElementById("quiz-container");
      const q = questions[this.currentQuestion];
  
      container.innerHTML = "";
  
      // Affichage du timer
      const timerDisplay = this.createElement("div", "timer");
      container.appendChild(timerDisplay);
  
      // Message d'avertissement à 10 secondes
      const warningMsg = this.createElement("div", "timer-warning", "⏰ Attention, il vous reste 10 secondes !");
      warningMsg.style.display = "none";
      container.appendChild(warningMsg);
  
      let timeLeft = this.timePerQuestion;
      timerDisplay.innerText = `⏱️ Temps restant : ${timeLeft} sec`;
  
      // Décompte du timer
      this.timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `⏱️ Temps restant : ${timeLeft} sec`;
        if (timeLeft === 10) warningMsg.style.display = "block";
        if (timeLeft <= 0) {
          clearInterval(this.timerInterval);
          this.validateAnswer(true);
        }
      }, 1000);
  
      // Titre de la question
      container.appendChild(this.createElement("h3", null, q.question));
  
      // Image éventuelle
      if (q.image) {
        const img = document.createElement("img");
        img.src = q.image;
        img.alt = "Illustration";
        img.className = "question-image";
        container.appendChild(img);
      }
  
      // Formulaire de réponses
      const form = document.createElement("form");
      form.id = "answers-form";
      form.className = "quiz-form";
  
      q.answers.forEach((answer, index) => {
        const div = this.createElement("div", "answer-option");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.id = `answer${index}`;
        input.value = answer;
  
        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.innerText = answer;
  
        div.onclick = () => input.click(); 
  
        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
      });
  
      // Bouton de validation
      const submitBtn = this.createElement("button", null, "Valider");
      submitBtn.type = "submit";
      submitBtn.id = "submit-btn";
      form.appendChild(submitBtn);
  
      // Soumission du formulaire
      form.onsubmit = (e) => {
        e.preventDefault();
        const selected = document.querySelector("input[name='answer']:checked");
        if (!selected) {
          alert("Veuillez sélectionner une réponse avant de valider.");
          return;
        }
        this.validateAnswer();
      };
  
      container.appendChild(form);
    },
  
    // Valide la réponse sélectionnée
    validateAnswer(isAuto = false) {
      clearInterval(this.timerInterval);
      const container = document.getElementById("quiz-container");
      const selected = document.querySelector("input[name='answer']:checked");
      const q = questions[this.currentQuestion];
  
      const answer = selected ? selected.value.trim() : null;
      const correct = q.correct.trim();
  
      const feedback = this.createElement("div", "feedback");
  
      if (answer && answer === correct) {
        this.score++;
        feedback.innerText = "✅ Bonne réponse !";
      } else {
        feedback.innerText = `❌ Mauvaise réponse. La bonne était : ${correct}`;
      }
  
      // Cache le bouton "Valider"
      const submitButton = document.getElementById("submit-btn");
      if (submitButton) submitButton.style.display = "none";
  
      container.appendChild(feedback);
  
      // Bouton suivant ou résultat
      const nextBtn = this.createElement("button", null, this.currentQuestion + 1 < questions.length ? "Question suivante" : "Voir les résultats");
      nextBtn.onclick = () => {
        this.currentQuestion++;
        this.currentQuestion < questions.length ? this.showQuestion() : this.showResults();
      };
      container.appendChild(nextBtn);
    },
  
    // Affiche l'écran des résultats finaux
    showResults() {
      clearInterval(this.timerInterval);
      const container = document.getElementById("quiz-container");
      container.innerHTML = "";
  
      container.appendChild(this.createElement("h2", null, `Votre Score : ${this.score} / ${questions.length}`));
  
      let message = "";
      if (this.score === questions.length) message = "Excellent travail !";
      else if (this.score >= questions.length / 2) message = "Bien joué, mais vous pouvez faire mieux !";
      else message = "Il est temps de réviser !";
  
      container.appendChild(this.createElement("p", null, message));
  
      this.saveHighScore(this.score);
      this.showHighScores(container);
  
      const restart = this.createElement("button", null, "Recommencer");
      restart.onclick = () => this.start();
      container.appendChild(restart);
    },
  
    // Utilitaire : crée un élément HTML
    createElement(tag, className, text, attributes = {}) {
      const el = document.createElement(tag);
      if (className) el.className = className;
      if (text) el.innerText = text;
      for (const [attr, value] of Object.entries(attributes)) {
        el.setAttribute(attr, value);
      }
      return el;
    },
  
    // Sauvegarde un score dans localStorage
    saveHighScore(score) {
      let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
      scores.push({ date: new Date().toLocaleString(), score });
  
      // Trie : score décroissant, puis date décroissante
      scores = scores.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.date) - new Date(a.date);
      }).slice(0, 5);
  
      localStorage.setItem("quizScores", JSON.stringify(scores));
    },
  
    // Affiche les meilleurs scores sauvegardés
    showHighScores(container) {
      const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
      if (scores.length === 0) return;
  
      const table = this.createElement("table", "score-table");
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
      container.appendChild(this.createElement("h3", null, "🏆 Meilleurs scores"));
      container.appendChild(table);
    }
  };
  
  // Dès que la page est chargée, connecte le bouton au démarrage du quiz
  document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => Quiz.start());
    }
  });
  