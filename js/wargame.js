
// Initializing variables
var playerDeck = [];
dealerDeck = [];
playerCard = [];
dealerHand = [];
userScore = 0;
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

function shuffleDeck(cardDeck) {
    var cardDeck = arrayGen();
    
    for (var j, x, i = cardDeck.length; i; j = Math.floor(Math.random() * i), 
    x = cardDeck[--i], cardDeck[i] = cardDeck[j], cardDeck[j] = x); 

    return cardDeck;
}

/**
 * Assigns the cards in the deck to each player
 * @param {cards} cardDeck 
 */
function assignCards(cardDeck) {
    var cardDeck = shuffleDeck();
    var i = 0;

    while (i != cardDeck.length) {
        playerDeck.push(cardDeck[i]);
        dealerDeck.push(cardDeck[i + 1]);
        i+=2;
        
    }
    // Output to user
    document.getElementsByTagName("figure")[0].innerHTML = "<img src='img/back.png'/>";
    document.getElementsByTagName("figure")[1].innerHTML = "<img src='img/back.png'/>";
    return playerDeck, dealerDeck;

}

function pointCount() {
    document.getElementsByTagName("h1")[1].innerHTML = playerDeck.length;
    document.getElementsByTagName("h1")[3].innerHTML = dealerDeck.length;
}

function dealCards(playerDeck, dealerDeck) {
    // Set a card for both player & dealer
    playerCard = assignCards(playerDeck);
    playerDeck[0];

    dealerCard = assignCards(dealerDeck);
    
    //console.log(assignCards(playerDeck));

     // Start at 0 for pos 1
    //var dealerHand = dealerDeck[0];
    console.log(dealerDeck[0]);

    // Prep for image display by creating vars to hold img
    var card1 = document.getElementsByTagName('figure')[0];
    var card2 = document.getElementsByTagName('figure')[1];

    // Specifying path for images
    playerImg = document.createElement('img');
    dealerImg = document.createElement('img');

    playerImg.setAttribute('src', 'img/' + playerDeck[0] + '.png');
    dealerImg.setAttribute('src', 'img/' + dealerDeck[0] + '.png');

    card1.appendChild(playerImg);
    card2.appendChild(dealerImg);

    //card1.innerHTML = ("<img src='img/' + playerCard[0] + '.png'/>");
    //card2.innerHTML = ("img/" + dealerCard[0] + ".png");

    // Displays cards to both users
    //$('.card1').append(card1);
    //$('.card2').append(card2);
}

function compare(player, dealer) {
    if ((player % 13) > (dealer % 13)) {
        console.log("Player wins!"); //FIXME: Add proper output to user

        playerDeck.push(dealer);
        playerDeck.push(player);

        playerDeck.shift();
        dealerDeck.shift();

        pointCount();
        // ADDME: check for victory condition
    } else if ((player % 13) < (dealer % 13)) {
        console.log("Dealer wins!");

        dealerDeck.push(player);
        dealerDeck.push(dealer);

        playerDeck.shift();
        dealerDeck.shift();

        pointCount();
    }
}