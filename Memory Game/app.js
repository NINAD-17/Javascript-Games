// Images array
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkShake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

// cardArray.sort(() => 0.5 - Math.random());  // We're not using this because it's less accurate.
// We're using Fisher Yates Method
for (let i = cardArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = cardArray[i];
    cardArray[i] = cardArray[j];
    cardArray[j] = k;
}

// JS const & variables
const gridDisplay = document.getElementById("grid");
const matchOrNot = document.querySelector(".areMatched");
const cardChosen = [];
const cardChosenIds = [];
const cardsWon = [];

const createBoard = () => {

    let i = 0;
    cardArray.forEach((card) => {
        const newCard = document.createElement('img');
        newCard.setAttribute('src', 'images/blank.png');
        newCard.setAttribute('alt', card.name);
        newCard.setAttribute('data-id', i++);
        newCard.addEventListener('click', flipCard);
        gridDisplay.appendChild(newCard);  // You can also use append both
    })

}

createBoard();

function checkMatch() {

    const cards = document.querySelectorAll("#grid img");
    const opt1 = cardChosenIds[0];
    const opt2 = cardChosenIds[1];

    if (opt1 == opt2) {
        alert('You Clicked same Item!!');
        cards[cardChosenIds[0]].setAttribute('src', 'images/blank.png');
        cards[cardChosenIds[1]].setAttribute('src', 'images/blank.png');
        return;
    }

    if (cardChosen[0] == cardChosen[1]) {
        matchOrNot.innerText = "Yay! Cards are Matched";
        cards[opt1].setAttribute('src', 'images/white.png');
        cards[opt2].setAttribute('src', 'images/white.png');
        cards[opt1].removeEventListener('click', flipCard);
        cards[opt2].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
    } else {
        matchOrNot.innerText = "Not match :(";
        cards[cardChosenIds[0]].setAttribute('src', 'images/blank.png');
        cards[cardChosenIds[1]].setAttribute('src', 'images/blank.png');
    }

    while (cardChosen.length != 0) {
        cardChosen.pop();
        cardChosenIds.pop();
    }

    if (cardsWon.length == cardArray.length / 2) {
        matchOrNot.innerText = "Yey! You Won";
    }
}

function flipCard() {

    const cardId = this.getAttribute('data-id');
    const cardName = cardArray[cardId].name;
    cardChosen.push(cardName);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}






