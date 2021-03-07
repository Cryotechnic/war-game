
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
        // Instantiation of 6 new cards
        extraPlayer1 = randomCard(52);
        extraPlayer2 = randomCard(52);
        extraPlayer3 = randomCard(52);
        extraDealer1 = randomCard(52);
        extraDealer2 = randomCard(52);
        extraDealer3 = randomCard(52);

        // Set height to 140 to account for image spacing
        playerImg.style.height = "140px";
        dealerImg.style.height = "140px";

        // Definition of 6 extra cards with styling and ID
        playerImgExtra1 = document.createElement('img');
        playerImgExtra1.setAttribute('id', 'playerImgExtra1');
        playerImgExtra1.style.height = "140px";
        
        playerImgExtra2 = document.createElement('img');
        playerImgExtra2.setAttribute('id', 'playerImgExtra2');
        playerImgExtra2.style.height = "140px";
        
        playerImgExtra3 = document.createElement('img');
        playerImgExtra3.setAttribute('id', 'playerImgExtra3');
        playerImgExtra3.style.height = "140px";
        
        dealerImgExtra1 = document.createElement('img');
        dealerImgExtra1.setAttribute('id', 'dealerImgExtra1');
        dealerImgExtra1.style.height = "140px";
        
        dealerImgExtra2 = document.createElement('img');
        dealerImgExtra2.setAttribute('id', 'dealerImgExtra2');
        dealerImgExtra2.style.height = "140px";
        
        dealerImgExtra3 = document.createElement('img');
        dealerImgExtra3.setAttribute('id', 'dealerImgExtra3');
        dealerImgExtra3.style.height = "140px";

        // Retrieve selected images from image bank
        playerImgExtra1.setAttribute('src', 'img/' + extraPlayer1 + '.png');
        playerImgExtra2.setAttribute('src', 'img/' + extraPlayer2 + '.png');
        playerImgExtra3.setAttribute('src', 'img/' + extraPlayer3 + '.png');

        dealerImgExtra1.setAttribute('src', 'img/' + extraDealer1 + '.png');
        dealerImgExtra2.setAttribute('src', 'img/' + extraDealer2 + '.png');
        dealerImgExtra3.setAttribute('src', 'img/' + extraDealer3 + '.png');

        // Display to user
        card1.appendChild(playerImgExtra1);
        card1.appendChild(playerImgExtra2);
        card1.appendChild(playerImgExtra3);

        card2.appendChild(dealerImgExtra1);
        card2.appendChild(dealerImgExtra2);
        card2.appendChild(dealerImgExtra3);

        compare(playerCard, dealerCard); // FIXME: implement war method instead of normal compare
        pointCount();
        return [playerCard, dealerCard, card1, card2]; // TESTME: Test to see if return is required
    }
}

function compare(playerCard, dealerCard) {
    //removeExtra();
    if ((playerCard % 13) > (dealerCard % 13)) {
        console.log("player won"); // Implement proper formatting
        console.log(playerCard); // Implement proper formatting
        playerScore++; 
        //checkWin();
    } else if ((playerCard % 13) < (dealerCard % 13)) {
        console.log("dealer won"); // Implement proper formatting
        console.log(dealerCard); // Implement proper formatting
        dealerScore++;
        //checkWin();
    } else {
        console.log("tie");
    }
}

function removeExtra(card1, card2) {
    console.log(card1);
    console.log(card2);
    card1.innerHTML = "";
    card2.innerHTML = "";
}

function checkWin() {
    //winDealer = document.getElementsByTagName('section')[1].style.borderStyle = "solid";
    console.log(usedCards.length);
    console.log(playerScore + " " + dealerScore);
    document.getElementsByTagName('button')[0].disabled = true;
    document.getElementsByTagName('h1')[1].setAttribute('id', "winPlayer");
    document.getElementsByTagName('h1')[3].setAttribute('id', 'winDealer');
    document.getElementsByTagName('h1')[0].setAttribute('id', "textPlayer");
    document.getElementsByTagName('h1')[2].setAttribute('id', 'textDealer');
    if (playerScore > dealerScore && usedCards.length >= 2) {
        console.log("Player has won!");
        textPlayer.innerHTML = "Player has won the hand";
        winPlayer.style.cssText = "color: green";
        console.log(winPlayer);
    } else if (playerScore < dealerScore && usedCards.length >= 2) {
        console.log("Dealer has won!");
        textDealer.innerHTML = "Dealer has won the hand";
        winDealer.style.cssText = "color: green"
        console.log(winDealer);
    } else {
        console.log("It's a tie!");
        winPlayer.style.cssText = "color: red";
        winDealer.style.cssText = "color: red"; 
    }
}