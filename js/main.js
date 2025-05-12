import { Quiz } from './quiz/quiz.js';

// Dès que le DOM est chargé, on attache un écouteur sur le bouton "Démarrer"
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => Quiz.start());
  }
});
