import { createElement } from '../utils.js';
import { questions } from './questions.js';
import { startTimer, clearTimer } from './timer.js';
import { saveHighScore, showHighScores } from './score.js';

// Objet principal du quiz : logique métier, timer, navigation
export const Quiz = {
  currentQuestion: 0,
  score: 0,
  timerInterval: null,
  timePerQuestion: 20,

    // Démarre le quiz à zéro
    start() {
        this.currentQuestion = 0;
        this.score = 0;
        this.showQuestion();
    },

    // Affiche une question + timer + formulaire
    showQuestion() {
        clearTimer(this.timerInterval);
        const container = document.getElementById("quiz-container");
        const q = questions[this.currentQuestion];
        container.innerHTML = "";

        // Affichage du timer numérique
        const timerDisplay = createElement("div", "timer");
        container.appendChild(timerDisplay);

        // Barre du timer (visuelle)
        const timerBar = createElement("div", "timer-bar-container");
        const progress = createElement("div", "timer-bar");
        timerBar.appendChild(progress);
        container.appendChild(timerBar);

        // Avertissement à 10 secondes
        const warningMsg = createElement("div", "timer-warning", "⏰ Attention, il vous reste 10 secondes !");
        warningMsg.style.display = "none";
        container.appendChild(warningMsg);

        // Lance le timer
        this.timerInterval = startTimer(
            this.timePerQuestion,
            (t) => {
                timerDisplay.innerText = `⏱️ Temps restant : ${t} sec`;
                const pourcentage = (t / this.timePerQuestion) * 100;
                progress.style.width = `${pourcentage}%`;
            },
            () => warningMsg.style.display = "block",
            () => this.validateAnswer(true)
        );

        // Affiche la question
        container.appendChild(createElement("h3", null, q.question));

        // Affiche l'image si présente
        if (q.image) {
            const img = document.createElement("img");
            img.src = q.image;
            img.alt = "Illustration";
            img.className = "question-image";
            container.appendChild(img);
        }

        // Création du formulaire de réponses
        const form = document.createElement("form");
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

            div.onclick = () => input.click();

            div.appendChild(input);
            div.appendChild(label);
            form.appendChild(div);
        });

        // Bouton de validation
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
            this.validateAnswer();
        };

        container.appendChild(form);
    },

    // Valide la réponse (manuelle ou auto)
    validateAnswer(isAuto = false) {
        clearTimer(this.timerInterval);
        const container = document.getElementById("quiz-container");
        const selected = document.querySelector("input[name='answer']:checked");
        const q = questions[this.currentQuestion];

        const answer = selected ? selected.value.trim() : null;
        const correct = q.correct.trim();

        const feedback = createElement("div", "feedback");

        if (answer && answer === correct) {
            this.score++;
            feedback.innerText = "✅ Bonne réponse !";
        } else {
            feedback.innerText = `❌ Mauvaise réponse.  La bonne réponse était :  ${correct}`;
        }

        const submitButton = document.getElementById("submit-btn");
        if (submitButton) submitButton.style.display = "none";

        container.appendChild(feedback);

        const nextBtn = createElement("button", null,
        this.currentQuestion + 1 < questions.length ? "Question suivante" : "Voir les résultats"
        );

        nextBtn.onclick = () => {
            this.currentQuestion++;
            this.currentQuestion < questions.length
            ? this.showQuestion()
            : this.showResults();
        };
        container.appendChild(nextBtn);
    },

    // Affiche le résultat final + meilleurs scores + bouton recommencer
    showResults() {
        clearTimer(this.timerInterval);
        const container = document.getElementById("quiz-container");
        container.innerHTML = "";

        container.appendChild(createElement("h2", null, `Votre Score : ${this.score} / ${questions.length}`));

        let message = "";
        if (this.score === questions.length) message = "Excellent travail !";
        else if (this.score >= questions.length / 2) message = "Bien joué, mais vous pouvez faire mieux !";
        else message = "Il est temps de réviser !";

        container.appendChild(createElement("p", null, message));

        saveHighScore(this.score);
        showHighScores(container);

        const restart = createElement("button", null, "Recommencer");
        restart.onclick = () => this.start();
        container.appendChild(restart);
    }
};