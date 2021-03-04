
// Initializing variables
// var playerDeck = [];
// dealerDeck = [];
// playerCard = [];
// dealerHand = [];
// userScore = 0;
// dealerScore = 0;

var usedCards = []; 
playerImg = document.createElement('img');
dealerImg = document.createElement('img');
playerScore = 0;
dealerScore = 0;

// FIXME: Array should be empty and then populated with the values as they get generated

/**
 * Generates an array of 52 numbers (1-52)
 */
// function arrayGen() {
//     var cardDeck = [];
//     for (var i = 0; i < 52; i++) {
//         cardDeck[i] = i;
//     }
//     return cardDeck;
// }

/**
 * Shuffles the deck by randomizing the j value using the deck length,
 * then reassigning each deck's value (deck i and deck j) to the random value computed with j
 */

function randomCard(max = 5, min = 1) {
    var rand = Math.random();
    rand = rand * (max - min + 1);
    rand = Math.floor(rand);
    rand = rand + min;

    if (usedCards.indexOf(rand) > 0) {console.log("did this " + rand);return randomCard(52);}
    else {usedCards.push(rand); console.log(usedCards);return rand;}
}

/**
 * Assigns the cards in the deck to each player
 * @param {cards} cardDeck 
 */
function assignCards() {
    // Output to user
    document.getElementsByTagName("figure")[0].innerHTML = "<img src='img/back.png'/>";
    document.getElementsByTagName("figure")[1].innerHTML = "<img src='img/back.png'/>";
}

function pointCount() {
    document.getElementsByTagName("h1")[1].innerHTML = playerScore;
    document.getElementsByTagName("h1")[3].innerHTML = dealerScore;
}

function dealCards() {
    var playerCard = randomCard(52);
    dealerCard = randomCard(52);

    console.log(playerCard + " " + dealerCard);

    // Prep for image display by creating vars to hold img
    var card1 = document.getElementsByTagName('figure')[0];
    var card2 = document.getElementsByTagName('figure')[1];
    
    // Specifying path for images
    playerImg.setAttribute('src', 'img/' + playerCard + '.png');
    dealerImg.setAttribute('src', 'img/' + dealerCard + '.png');

    // Overwrites element if it already exists, appends if it doesn't
    compare(playerCard, dealerCard);
    pointCount();
    card1.appendChild(playerImg);
    card2.appendChild(dealerImg);

    if (playerCard == dealerCard) {
        extraPlayer1 = randomCard(52);
        extraPlayer2 = randomCard(52);
        extraPlayer3 = randomCard(52);
        extraDealer1 = randomCard(52);
        extraDealer2 = randomCard(52);
        extraDealer3 = randomCard(52);

        playerImgExtra1 = document.createElement('img');
        playerImgExtra2 = document.createElement('img');
        playerImgExtra3 = document.createElement('img');
        
        dealerImgExtra1 = document.createElement('img');
        dealerImgExtra2 = document.createElement('img');
        dealerImgExtra3 = document.createElement('img');

        playerImgExtra1.setAttribute('src', 'img/' + extraPlayer1 + '.png');
        playerImgExtra2.setAttribute('src', 'img/' + extraPlayer2 + '.png');
        playerImgExtra3.setAttribute('src', 'img/' + extraPlayer3 + '.png');
        
        dealerImgExtra1.setAttribute('src', 'img/' + extraDealer1 + '.png');
        dealerImgExtra2.setAttribute('src', 'img/' + extraDealer2 + '.png');
        dealerImgExtra3.setAttribute('src', 'img/' + extraDealer3 + '.png');

        card1.appendChild(playerImgExtra1);
        card1.appendChild(playerImgExtra2);
        card1.appendChild(playerImgExtra3);

        card2.appendChild(dealerImgExtra1);
        card2.appendChild(dealerImgExtra2);
        card2.appendChild(dealerImgExtra3);
        compare(playerCard, dealerCard); // FIXME: implement war method instead of normal compare
        pointCount();
        return [playerCard, dealerCard];
    }
}

function compare(playerCard, dealerCard) {
    if (playerCard > dealerCard) {
        console.log("player won"); // Implement proper formatting
        playerScore++; 
        //checkWin();
    } else if (playerCard < dealerCard) {
        console.log("dealer won"); // Implement proper formatting
        dealerScore++;
        //checkWin();
    } else {
        console.log("tie");
    }
}

function checkWin() {
    
}