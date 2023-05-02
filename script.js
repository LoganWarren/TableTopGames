const cards = [
    { id: 1, value: 'gifs/gif1.gif' }, { id: 2, value: 'gifs/gif1.gif' },
    { id: 3, value: 'gifs/gif2.gif' }, { id: 4, value: 'gifs/gif2.gif' },
    { id: 5, value: 'gifs/gif3.gif' }, { id: 6, value: 'gifs/gif3.gif' },
    { id: 7, value: 'gifs/gif4.gif' }, { id: 8, value: 'gifs/gif4.gif' },
    { id: 9, value: 'gifs/gif5.gif' }, { id: 10, value: 'gifs/gif5.gif' },
    { id: 11, value: 'gifs/gif6.gif' }, { id: 12, value: 'gifs/gif6.gif' },
    { id: 13, value: 'gifs/gif7.gif' }, { id: 14, value: 'gifs/gif7.gif' },
    { id: 15, value: 'gifs/gif8.gif' }, { id: 16, value: 'gifs/gif8.gif' },
    { id: 17, value: 'gifs/gif9.gif' }, { id: 18, value: 'gifs/gif9.gif' },
];


const grid = document.getElementById('grid-container');
const shuffledCards = shuffleCards(cards);

shuffledCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;
    cardElement.dataset.value = card.value;
    cardElement.addEventListener('click', handleCardClick);

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.backgroundImage = `url('gifs/Space Background.png')`;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerHTML = `
        <img src="${card.value}" alt="card image" width="100" height="100">
    `;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);
    grid.appendChild(cardElement);
});

let firstCard = null;
let secondCard = null;
let preventClick = false;

let timerElement = document.getElementById('timer');
let timeRemaining = 60;
let timerInterval = null;

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining -= 1;
        timerElement.textContent = `Time remaining: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Game over.');
            location.reload();
        }
    }, 1000);
}

function shuffleCards(cards) {
    let currentIndex = cards.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
}

function handleCardClick(e) {
    if (preventClick) return;
    const cardElement = e.currentTarget;

    if (!firstCard) {
        if (!timerInterval) startTimer();
        firstCard = cardElement;
        cardElement.classList.add('flipped');
        return;
    }

    if (firstCard === cardElement) return;

    secondCard = cardElement;
    cardElement.classList.add('flipped');
    checkForMatch();
}

function checkForMatch() {
    preventClick = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        setTimeout(() => {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            resetCards();
            checkGameOver();
            timeRemaining += 10;
        }, 1000);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
}


function resetCards() {
    firstCard = null;
    secondCard = null;
    preventClick = false;
}

function checkGameOver() {
    const matchedCards = document.querySelectorAll('.matched');
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('Congratulations! You have completed the memory card game.');
            location.reload();
        }, 1000);
    }
}

