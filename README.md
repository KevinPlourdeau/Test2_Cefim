# Test Concepteur Développeur d'Application – CEFIM

## 🌟 Objectif

Création d’un mini-quiz interactif à l’aide des langages autorisés :  
*HTML*, *CSS*, et *JavaScript natif (ES6)*, sans framework ni bibliothèque externe.

## 📂 Structure du projet

Test2_Cefim/
├── index.html
├── styles/
│   ├── reset.css
│   └── style.css
├── js/
│   ├── main.js
│   ├── utils.js
│   └── quiz/
│       ├── quiz.js
│       ├── timer.js
│       ├── score.js
│       └── questions.js
├── images/
└── README.md

## ✅ Fonctionnalités principales

- Introduction au quiz
- Bouton démarrer le quiz
- Affichage dynamique de questions avec réponses radio avec 3 à 4 réponses possibles
- Bouton pour valider la réponse
- Calcul du score final + affichage
- Message personnalisé en fonction du score
- Design responsive pour mobile/tablette

## 🚀 Fonctionnalités bonus

- Timer de 20 secondes par question
- Avertissement à 10 secondes
- Validation automatique si le temps expire
- Barre de progression visuelle du temps
- Animation CSS (fadeIn, survols, transitions)
- Feedback visuel personnalisé
- Classement des meilleurs scores
- Sauvegarde des meilleurs scores via `localStorage`
- Mode modulaire avec `type="module"`

## 🧪 Technologies utilisées

- **HTML5**  
- **CSS3** (variables, animations, media queries)  
- **JavaScript ES6** (modules, `localStorage`, `setInterval`)