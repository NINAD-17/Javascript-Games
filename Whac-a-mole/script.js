// JS constants
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const btnStart = document.querySelector('#btnStart');
const gridDiv = document.querySelector('#grid');

let result = 0;
let hitPosition;
let currTimeLeft = 10;
let timerId;

const removeMole = () => {

    squares.forEach((square) => {
        square.classList.remove('mole');
    });

}

const randomSquare = () => {

    removeMole();
    let randomSq = squares[Math.floor(Math.random() * 9)];
    randomSq.classList.add('mole');

    hitPosition = randomSq.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})

const moveMole = () => {
    timerId = null;
    timerId = setInterval(randomSquare, 800);
    console.log(timerId);
}

const countDown = () => {
    currTimeLeft--;
    timeLeft.textContent = currTimeLeft;

    if(currTimeLeft == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        removeMole();
        alert('Final Score is: ' + result);
        timeLeft.textContent = 10;
        // Reloading page cause of timeInterval error while starting game again on same page without reload
        location.reload();
    }
}
const start = () => {
    // We've to remove eventlistener on click because if we tap on btn everytime its time interval is increases.
    btnStart.removeEventListener('click', start);
    moveMole();
    currTimeLeft = 10;
    countDownTimerId = setInterval(countDown, 1000);
}

// Start button eventListener
let countDownTimerId;
btnStart.addEventListener('click', start);


// window.onload = () => {
//     for (let i = 0; i < 9; i++) {
//         let newSquare = document.createElement('div');
//         newSquare.setAttribute('class', 'square');
//         newSquare.setAttribute('id', i);
//         gridDiv.appendChild(newSquare);
//         console.log(newSquare);
//     }
//     // squares = document.querySelectorAll('.square')
// }
