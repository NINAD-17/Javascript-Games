// JS const & var
const playerChoiceBtn = document.querySelectorAll(".optBtns");
const userChoiceDisplay = document.getElementById("userChoice");
const compChoiceDisplay = document.getElementById("computerChoice");
const h1result = document.getElementById("result");

const generateResult = (userChoice, compChoice) => {

    if(userChoice == compChoice) {
        return 0;
    }

    if(userChoice == 'Rock' && compChoice == 'Scissor') {
        return 1;
    } else if (userChoice == 'Paper' && compChoice == 'Rock') {
        return 1;
    } else if (userChoice == 'Scissor' && compChoice == 'Paper') {
        return 1;
    } else {
        return -1;
    }

}

// console.log(generateResult('Rock', 'Scissor'));

const showResult = (result) => {

    if(result == 0) {
        h1result.innerText = "It's a Draw";
    } else if(result == 1) {
        h1result.innerText = "You Win!";
    } else {
        h1result.innerText = "You Loose!";
    }
}

const computerChoice = () => {

    const choices = ['Rock', 'Paper', 'Scissor'];
    const selectedOpt = Math.floor(Math.random() * 3);
    return choices[selectedOpt];

}

const playGame = () => {

    playerChoiceBtn.forEach((btn) => {
        btn.onclick = () => {
            userChoice = btn.value;
            main(userChoice);
        }
    });
}

// console.log(computerChoice());

const main = (userChoice) => {

    // Get Computer Choice
    let compChoice = computerChoice();

    // Display Choices
    userChoiceDisplay.innerText = userChoice;
    compChoiceDisplay.innerText = compChoice;

    // generate result
    const result = generateResult(userChoice, compChoice);
    showResult(result);

}

playGame();


