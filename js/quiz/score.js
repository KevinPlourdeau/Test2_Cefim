import { createElement } from '../utils.js';

// Sauvegarde un score dans le localStorage avec la date
export function saveHighScore(score) {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push({ date: new Date().toLocaleString(), score });

  // Trie par score décroissant puis date décroissante, garde top 5
  scores = scores
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  localStorage.setItem("quizScores", JSON.stringify(scores));
}

// Affiche les 5 meilleurs scores sous forme de tableau HTML
export function showHighScores(container) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  if (scores.length === 0) return;

  const table = createElement("table", "score-table");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Date</th><th>Score</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  scores.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.date}</td><td>${entry.score}</td>`;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(createElement("h3", null, "🏆 Meilleurs scores"));
  container.appendChild(table);
}
