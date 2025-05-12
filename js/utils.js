

// Fonction utilitaire pour créer des éléments HTML dynamiquement
export function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.innerText = text;
    return el;
  }