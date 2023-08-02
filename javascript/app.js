const rock = "rock";
const paper = "paper";
const scissors = "scissors";
const options = [rock, paper, scissors];

const result = document.querySelector(".result");
const description = document.querySelector(".description");

const scores = document.querySelectorAll(".score");

const userImage = document.getElementById("user-selection");
const computerImage = document.getElementById("computer-selection");

const userScore = document.querySelector(".user-score");
const computerScore = document.querySelector(".computer-score");

let rockButton = document.getElementById("rock-btn");
let paperButton = document.getElementById("paper-btn");
let scissorsButton = document.getElementById("scissors-btn");

let computerSelection;
let userCounter = 0,
    computerCounter = 0;

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
    if (userCounter === 5 || computerCounter === 5) {
        EndGame();
    } else {
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
    }
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

function EndGame() {
    console.log("thank you for playing");
}
