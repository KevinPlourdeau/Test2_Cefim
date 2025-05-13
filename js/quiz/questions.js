

// Liste des questions du quiz sous forme d'un tableau d'objets
export const questions = [
    { 
        question: "Quel langage est principalement utilisé pour structurer une page web ?",
        image: "images/img_1.PNG",
        answers: ["CSS", "HTML", "JavaScript"], 
        correct: "HTML" 
    },
    { 
        question: "Quelle propriété CSS permet de changer la taille de police ?",
        image: "images/img_2.PNG",
        answers: ["font-family", "font-size", "text-decoration"], 
        correct: "font-size" 
    },
    { 
        question: "Quelle méthode JavaScript permet de transformer une chaîne JSON en objet JavaScript ?",
        image: "images/img_3.PNG",
        answers: ["JSON.stringify()", "JSON.parse()", "JSON.object()"], 
        correct: "JSON.parse()" 
    },
    { 
        question: "Quel est le bon sélecteur CSS pour appliquer un style à toutes les balises <p> ?",
        image: "images/img_4.PNG",
        answers: ["#p", "p", ".p"], 
        correct: "p" 
    },
    { 
        question: "Quelle commande Git permet de récupérer les modifications depuis un dépôt distant ?",
        image: "images/img_5.PNG", 
        answers: ["git push", "git commit", "git pull", "git init"], 
        correct: "git pull" 
    }
];