

// Démarre un compte à rebours et déclenche des fonctions à chaque étape
export function startTimer(duration, onTick, onWarning, onEnd) {
    let timeLeft = duration;

     // Affiche immédiatement le temps initial
    onTick(timeLeft);

    const interval = setInterval(() => {
        timeLeft--;

        // Callback pour mettre à jour l'affichage
        onTick(timeLeft);

        if (timeLeft === 10) onWarning();
        if (timeLeft <= 0) {
        clearInterval(interval);

        // Fin du temps → validation automatique
        onEnd();
        }
    }, 1000);

    // Retourne l’ID du timer pour pouvoir l’annuler
    return interval;
}


// Fonction utilitaire pour stopper le timer
export function clearTimer(id) {
    clearInterval(id);
}