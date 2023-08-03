const rock = "rock";
const paper = "paper";
const scissors = "scissors";
const options = [rock, paper, scissors];

const container = document.querySelector(".container");

const result = document.querySelector(".result");
const description = document.querySelector(".description");

const scores = document.querySelectorAll(".score");

const userImage = document.getElementById("user-selection");
const computerImage = document.getElementById("computer-selection");

const userScore = document.querySelector(".user-score");
const computerScore = document.querySelector(".computer-score");

const rockButton = document.getElementById("rock-btn");
const paperButton = document.getElementById("paper-btn");
const scissorsButton = document.getElementById("scissors-btn");

const reset = document.querySelector(".reset");
const resetHeading = document.querySelector(".reset-heading");
const closeButton = document.getElementById("close-button");
const audio = document.querySelector("audio");

let computerSelection = "";
let userCounter = 0,
    computerCounter = 0;

function InitiateGame() {
    computerSelection = "";
    userCounter = 0;
    computerCounter = 0;

    container.classList.add("active");
    reset.classList.remove("active");

    result.textContent = "";
    description.textContent = "first to score 5 wins the game";

    scores.forEach((score) => {
        score.classList.remove("active");
    });

    userScore.textContent = "0";
    computerScore.textContent = "0";

    rockButton.disables = false;
    paperButton.disables = false;
    scissorsButton.disables = false;
    switch (window.event.key) {
        case "r":
        case "p":
        case "s":
            return true;
    }
}

document.addEventListener("keydown", (e) => {
    if (userCounter === 5 || computerCounter === 5) {
        switch (e.key) {
            case "r":
            case "p":
            case "s":
                e.preventDefault();
                return false;
        }
    } else {
        switch (e.keyCode) {
            case 82:
                RunSteps(rockButton);
                break;

            case 80:
                RunSteps(paperButton);
                break;

            case 83:
                RunSteps(scissorsButton);
                break;
        }
    }
});

rockButton.addEventListener("click", () => {
    RunSteps(rockButton);
});

paperButton.addEventListener("click", () => {
    RunSteps(paperButton);
});

scissorsButton.addEventListener("click", () => {
    RunSteps(scissorsButton);
});

function RunSteps(userSelection) {
    computerSelection = GetComputerChoice(options);
    PlayRound(userSelection.dataset.decision, computerSelection);

    scores.forEach((score) => {
        if (score.classList.contains("active")) return;
        score.classList.add("active");
    });

    GetUserImage(userSelection.dataset.decision);
    GetComputerImage(computerSelection);

    userScore.textContent = userCounter;
    computerScore.textContent = computerCounter;
    CheckWinner();
}

function GetComputerChoice(options) {
    const randomOption = Math.floor(Math.random() * options.length);

    return options[randomOption];
}

function PlayRound(user, computer) {
    //when user selection is rock and computer selection is scissors = win
    if (user === rock && computer === scissors) {
        userCounter++;
        result.textContent = "You Win!!";
        description.textContent = `${user} beats ${computer}`;
    }

    //when user selection is rock and computer selection is paper = lose
    else if (user === rock && computer === paper) {
        computerCounter++;
        result.textContent = "You Lose!!";
        description.textContent = `${computer} beats ${user}`;
    }

    //when user selection is paper and computer selection is rock = win
    else if (user === paper && computer === rock) {
        userCounter++;
        result.textContent = "You Win!!";
        description.textContent = `${user} beats ${computer}`;
    }

    //when user selection is paper and computer selection is scissors = lose
    else if (user === paper && computer === scissors) {
        computerCounter++;
        result.textContent = "You Lose!!";
        description.textContent = `${computer} beats ${user}`;
    }

    //when user selection is scissors and computer selection is paper = win
    else if (user === scissors && computer === paper) {
        userCounter++;
        result.textContent = "You Win!!";
        description.textContent = `${user} beats ${computer}`;
    }

    //when user selection is scissors and computer selection is rock = lose
    else if (user === scissors && computer === rock) {
        computerCounter++;
        result.textContent = "You Lose!!";
        description.textContent = `${computer} beats ${user}`;
    }

    //when user selection and computer selection are the same
    else {
        result.textContent = "Draw!!";
        description.textContent = `${user} is equal to ${computer}`;
    }
}

function GetUserImage(userSelection) {
    switch (userSelection) {
        case "rock":
            userImage.src = "../images/rock.png";
            console.log(userImage.src);
            userImage.alt = "Rock hand gesture";
            break;

        case "paper":
            userImage.src = "../images/paper.png";
            userImage.alt = "Paper hand gesture";
            break;

        case "scissors":
            userImage.src = "../images/scissors.png";
            userImage.alt = "Scissors hand gesture";
            break;
    }
}

function GetComputerImage(computerSelection) {
    switch (computerSelection) {
        case "rock":
            computerImage.src = "../images/rock.png";
            computerImage.alt = "Rock hand gesture";
            break;

        case "paper":
            computerImage.src = "../images/paper.png";
            computerImage.alt = "Paper hand gesture";
            break;

        case "scissors":
            computerImage.src = "../images/scissors.png";
            computerImage.alt = "Scissors hand gesture";
            break;
    }
}

function CheckWinner() {
    console.log("yes");
    if (userCounter === 5 || computerCounter === 5) {
        rockButton.disables = true;
        paperButton.disables = true;
        scissorsButton.disables = true;

        EndGame();
    }
}

function EndGame() {
    container.classList.toggle("active");
    reset.classList.toggle("active");
    const span = document.createElement("span");

    if (userCounter > computerCounter) {
        span.textContent = "YOU WERE VICTORIOUS";
        resetHeading.textContent = "CONGRATULATIONS!! ";
        resetHeading.appendChild(span);

        audio.src = "../audio/you-win.mp3";
        audio.play();
    } else {
        span.textContent = "TRY AGAIN";
        resetHeading.textContent =
            "COMPUTER HAS WON THE BATTLE BUT NOT THE WAR!! ";
        resetHeading.appendChild(span);

        audio.src = "../audio/you-lose.mp3";
        audio.play();
    }

    closeButton.addEventListener("click", () => {
        InitiateGame();
    });
}
