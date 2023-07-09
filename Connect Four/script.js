document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const result = document.querySelector('#result');
    const displayCurrentPlayer = document.querySelector('#currentPlayer');
    let CurrentPlayer = 1;

    squares.forEach((square, index) => {
        square.onclick = () => {
            console.log(`You clicked on square at index: ${index}`);
        }
    })
})