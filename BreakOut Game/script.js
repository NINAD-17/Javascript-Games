// JS constants and variables
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');

const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 561;
const boardHeight = 300;

const userStart = [230, 10];
let currUserPosition = userStart;
let score = 0;

const ballStart = [269, 40];
let currBallPosition = ballStart;
const ballDiameter = 20;
let timerId;
let xDirection = 2;
let yDirection = 2;

// Create individual blocks
class Block {

    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }

}

// All Blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

console.log(blocks[0]);

// Draw a box
const addBlocks = () => {

    for(let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }

}

addBlocks();

// Draw User
const drawUser = () => {

    userBlock.style.left = currUserPosition[0] + 'px';
    userBlock.style.bottom = currUserPosition[1] + 'px';

}

// Draw Ball 
const drawBall = () => {

    ball.style.left = currBallPosition[0] + 'px';
    ball.style.bottom = currBallPosition[1] + 'px';

}

// Add User Block
const userBlock = document.createElement('div');
userBlock.classList.add('userBlock');
drawUser();
grid.appendChild(userBlock);

// Move User Block
const moveUser = (e) => {

    switch(e.key) {
        case 'ArrowLeft': 
            currUserPosition[0] -= 10;
            if(currUserPosition[0] >= 0) 
                drawUser();
            break;
        
        case 'ArrowRight': 
            currUserPosition[0] += 10;
            if(currUserPosition[0] <= boardWidth - blockWidth)
                drawUser();
            break;
    }
}

document.addEventListener('keydown', moveUser);

// Create Ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// Move Ball 
const moveBall = () => {

    currBallPosition[0] += xDirection;
    currBallPosition[1] += yDirection;
    drawBall();
    checkForCollisions();

}

timerId = setInterval(moveBall, 30);

// Check for Collisions 
const checkForCollisions = () => {

    // Check for block collisions
    for(let i = 0; i < blocks.length; i++) {
        if(
            (currBallPosition[0] > blocks[i].bottomLeft[0] && currBallPosition[0] < blocks[i].bottomRight[0]) &&
            ((currBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && currBallPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.slice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = score;

            // Check for win
            if(blocks.length === 0) {
                scoreDisplay.textContent = 'You Win';
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    // Check for wall collisions
    if(currBallPosition[0] >= (boardWidth - ballDiameter) ||
        currBallPosition[1] >= (boardHeight- ballDiameter) || 
        currBallPosition[0] <= 0 
        ) {
            changeDirection();
    }

    //Check for userBlock collisions
    if(
        (currBallPosition[0] > currUserPosition[0] && currBallPosition[0] < currUserPosition[0] + blockWidth) && 
        (currBallPosition[1] > currUserPosition[1] && currBallPosition[1] < currUserPosition[1] + blockHeight)
    ) {
        changeDirection();
    }

    // Check for game over 
    if(currBallPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.textContent = 'Game Over';
        document.removeEventListener('keydown', moveUser);
    }

}

// Change Direction
const changeDirection = () => {

    if(xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }

    if(xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }

    if(xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }

    if(xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}