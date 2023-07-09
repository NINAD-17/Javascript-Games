const squares = document.querySelectorAll(".colorBox");

const timesClicked = {"purple": 0, "red": 0, "yellow": 0};

// Update Count
squares.forEach(square => {
    square.onclick = () => {
        timesClicked[square.value]++;
        square.innerText = timesClicked[square.value];
    }
});

// Clear all counts
const clearCountsBtn = document.getElementById("clearBtn");
const clearScores = () => {
    squares.forEach(square => {
        timesClicked[square.value] = 0;
        square.innerText = '';
    });
}
clearCountsBtn.onclick = () => clearScores();