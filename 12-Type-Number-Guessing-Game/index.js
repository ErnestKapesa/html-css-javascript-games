const inputEl = document.querySelector("input");
const guessEl = document.querySelector(".guess");
const checkBtnEl = document.querySelector("button");
const remainingChancesTextEl = document.querySelector(".chances");
const remainingChancesEl = document.querySelector(".chance");

let randomNumber = Math.floor(Math.random() * 100);

totalChances = 10;

function syncScore() {
    if (window.GameHub) {
        const { setStageScore, recordScore } = window.GameHub;
        if (typeof setStageScore === "function") setStageScore(Math.max(totalChances, 0));
        if (typeof recordScore === "function") recordScore('number-guess', Math.max(totalChances, 0), 'best');
    }
}

syncScore();

checkBtnEl.addEventListener("click", () => {
    const previousChances = totalChances;
    totalChances--;
    let inputValue = inputEl.value;
   
    if (totalChances === 0) {
        inputValue = "";
        inputEl.disabled = true;
        guessEl.textContent = "Oops...! Bad luck😥, You lost the game."
        guessEl.style.color = "red";
        checkBtnEl.textContent = "Play Again...😉";
        remainingChancesTextEl.textContent = "No chances left"
        syncScore();
    }
    else if (totalChances < 0) {
        window.location.reload();
    }
    else if (inputValue == randomNumber) {
        inputEl.disabled = true;
        guessEl.textContent = "Hurrah...! Congratulations😍, You won the game."
        guessEl.style.color = "green";
        checkBtnEl.textContent = "Play Again...😉";
        if (window.GameHub) {
            const { recordScore, addPoints, setStageScore } = window.GameHub;
            const scoreValue = Math.max(previousChances, 0);
            if (typeof recordScore === "function") recordScore('number-guess', scoreValue, 'best');
            if (typeof addPoints === "function") addPoints(Math.max(scoreValue, 0) * 10);
            if (typeof setStageScore === "function") setStageScore(scoreValue);
        }
        totalChances = 0;
    } else if (inputValue > randomNumber && inputValue < 100) {
        guessEl.textContent = "Your Guess is High👍.";
        remainingChancesEl.textContent = totalChances;
        guessEl.style.color = "#1446a0";
        syncScore();
    } else if (inputValue < randomNumber && inputValue > 0) {
        guessEl.textContent = "Your Guess is low👎.";
        remainingChancesEl.textContent = totalChances;
        guessEl.style.color = "#1446a0";
        syncScore();
    } else {
        guessEl.textContent = "Your number is invalid.";
        remainingChancesEl.textContent = totalChances;
        guessEl.style.color = "red";
        syncScore();
    }
});
