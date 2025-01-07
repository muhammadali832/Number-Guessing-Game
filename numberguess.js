let randomNum = Math.floor(Math.random() * 100 + 1);
let sbt = document.querySelector("#subt");
let usernum = document.querySelector("#guessField");
let precGuesses = document.querySelector(".guesses");
let lastResult = document.querySelector(".lastResult");
let lowOrHi = document.querySelector(".lowOrHi");
let startover = document.querySelector(".resultParas");
let p = document.createElement("p");
let prevguess = [];
let guessCount = 1;
let playGame = true;

if (playGame) {
    sbt.addEventListener("click", function (e) {
        e.preventDefault();
        let guess = parseInt(usernum.value); 
        validateguess(guess);
    });
}

function validateguess(guess) {
    // Validate the guess
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1) {
        alert("Please enter a number greater than 1");
    } else if (guess > 100) {
        alert("Please enter a number less than 100");
    } else {
        prevguess.push(guess); // Fixed: Add the actual guess instead of "guess"
        if(guessCount === 11){
            displayGuess(guess);
            displayMessage(`Game Over Random number was ${randomNum}`);
            endGame(guess);
        }else{
            displayGuess(guess);
            checkguess(guess);

        }
    };
}

function checkguess(guess) {
    // To be implemented for further functionality

    if(guess === randomNum){
        displayMessage(`Congratulation You gussed it Right Number`);
        endGame();
    }else if(guess < randomNum){
        displayMessage(`Your Number is Too Low`);
    } else if (guess > randomNum){
        displayMessage(`Your number is too high`);
    }
}

function displayGuess(guess){
// for display guess
usernum.value = "";
precGuesses.innerHTML = `${prevguess}`;
guessCount++;
lastResult.innerHTML = `${12 - guessCount}`;
};

function displayMessage(message){
// display message
lowOrHi.innerHTML= `<h2>${message}</h2>`;

};

function endGame(){
    // end game
    usernum.innerHTML = "";
    usernum.setAttribute("disabled","")
    p.classList.add("button");
    p.innerHTML = `<h2 id = "startGame">Start new Game</h2>`;
    startover.appendChild(p);
    playGame = false;
    newGame();
};

function newGame() {
    // Initialize new game setup
    let newGameButton = document.querySelector("#startGame");
    
    // Fixing the typo in "CLick" (should be "click")
    newGameButton.addEventListener("click", function (e) {
        randomNum = Math.floor(Math.random() * 100 + 1); // Reset random number
        prevguess = []; // Reset previous guesses
        guessCount = 1; // Reset guess count

        // Clear the displayed guesses and result messages
        precGuesses.textContent = "";
        lastResult.textContent = "";
        lowOrHi.textContent = ""; // Clear hints (low or high)

        // Re-enable input and button for new game
        usernum.removeAttribute("disabled");
        sbt.removeAttribute("disabled");

        // Ensure previous game elements are cleared
        if (startover.contains(p)) {
            startover.removeChild(p);
        }

        playGame = true; // Set playGame to true to allow gameplay
    });
};
