/*
 * Create a list that holds all of your cards
 */
var cards = [
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
]
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Display shuffled cards (Exibindo as cartas embaralhadas)

let shuffledCards = shuffle(cards);
const deck = document.querySelector('.deck');

function startGame() {
    deck.innerHTML = "";
    for (const card of shuffledCards) {
        const cardElement = document.createElement('li');
        cardElement.className = 'card';
        const cardSymbol = document.createElement('i');
        cardSymbol.className = ['fa'];
        cardSymbol.classList.add(card);
        cardElement.appendChild(cardSymbol);
        deck.appendChild(cardElement);
    }
}
// console.log(shuffledCards);
shuffledCards.forEach(function (tempScard, index) {
    console.log(index + 1, tempScard);
});

startGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displaySymbolCard(evt) {
    if (evt.target.nodeName == 'LI') {
        if (!evt.target.classList.contains('open')) {
            evt.target.classList.add('open');
            setTimeout(function() {
                evt.target.classList.add('show');
            }, 200);
        }
    }
}

let elementsList = [];
function addCardToListOpenCards(evt) {
    let tempCard;
    if (evt.target.nodeName === 'LI') {
        tempCard = evt.target;
    } else { 
        tempCard = evt.target.parentElement;
    }

    if (elementsList.length === 0)  {
        elementsList.push(tempCard);
    } else if (elementsList.length === 1) {
        if (elementsList[0] === tempCard) {
            console.log('escolha outra carta');
        } else {
            elementsList.push(tempCard);
        }
    } else {
        elementsList.pop();
    }
    console.log(elementsList)
}

function memoryGameMatch(evt) {
    let myAudio2 = document.createElement('audio');
    myAudio2.src = 'sounds/bell.mp3';
    myAudio2.play();

    let alvo = document.getElementsByClassName(elementsList[0].firstElementChild.classList[1]);
    // console.log(alvo);
    console.log(alvo[0].parentElement);
    alvo[0].parentElement.classList.add('match')
    alvo[0].parentElement.classList.remove('open');
    alvo[0].parentElement.classList.remove('show');
    alvo[1].parentElement.classList.add('match')
    alvo[1].parentElement.classList.remove('open');
    alvo[1].parentElement.classList.remove('show');
    elementsList = [];
    incrementMoveCount()
}

function memoryGameNoMatch(evt) {
    console.log('Cartas diferentes');

    let alvo3 = document.querySelectorAll('.match');
    for (alvo of alvo3) {
        alvo.className = 'card match'
    }

    let alvos = document.querySelectorAll('.open');
    for (alvo of alvos) {
        alvo.className = 'card';
    }

    let alvo2 = document.querySelectorAll('.show');
    for (alvo of alvo2) {
        alvo.className = 'card';
    }

    elementsList = [];
    incrementMoveCount();

    let myAudio = document.createElement('audio');
    myAudio.src = 'sounds/som_icq.mp3';
    myAudio.play();
}

let moves = 0;
function incrementMoveCount() {
    const elementMovesCount = document.querySelector('.moves');
    moves++;
    elementMovesCount.textContent = moves;
    
    const elementText = document.querySelector('.moves').nextSibling;
    if (moves === 1) {
        elementText.textContent = ' Jogada';
    } else {
        elementText.textContent = ' Jogadas';
    }
}


//Event CLICK
deck.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('match') || evt.target.parentElement.classList.contains('match')) {
        console.log('Carta já virada!!');
    } else {
        if (elementsList.length < 2) {
            displaySymbolCard(evt);
            addCardToListOpenCards(evt);

            if (elementsList.length == 2) {
                if (elementsList[0].firstElementChild.classList[1] === elementsList[1].firstElementChild.classList[1]) {
                    console.log('Cartas iguais');
                    memoryGameMatch(evt);
                } else {
                    setTimeout(function () {
                        memoryGameNoMatch(evt);
                    }, 1000);
                }
            }
        }
    }
});
