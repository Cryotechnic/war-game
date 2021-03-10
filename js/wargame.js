// Initializing variables
var usedCards = []; 
playerImg = document.createElement('img');
dealerImg = document.createElement('img');
playerScore = 0;
dealerScore = 0;


/**
 * Generates random number in range
 * @param {integer} max maximum number 
 * @param {integer} min minimum number
 */
function randomCard(max = 52, min = 1) {
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
    document.getElementsByTagName('figure')[0].innerHTML = "<img src='img/back.png'/>";
    document.getElementsByTagName('figure')[1].innerHTML = "<img src='img/back.png'/>";
}

/**
 * Displays the playerScore and dealerScore variables, updating them as they increase
 */
function pointCount() {
    document.getElementsByTagName("h1")[1].innerHTML = playerScore;
    document.getElementsByTagName("h1")[3].innerHTML = dealerScore;
}

/**
 * Deals the cards and displays them to the players
 */
function dealCards() {
    var playerCard = randomCard(52);
    var dealerCard = randomCard(52);

    // Prep for image display by creating vars to hold img & making sure they are properly formatted
    var card1 = document.getElementsByTagName('figure')[0];
    var card2 = document.getElementsByTagName('figure')[1];

    while (card1.firstChild && card2.firstChild) {
        card1.removeChild(card1.lastChild);
        card2.removeChild(card2.lastChild);
      }

    playerImg.style.height = "285px";
    dealerImg.style.height = "285px";
    
    // Specifying path for images
    playerImg.setAttribute('src', 'img/' + playerCard + '.png');
    dealerImg.setAttribute('src', 'img/' + dealerCard + '.png');

    
    // Compares both cards to see who has the greater value and updates the point count 
    // for both players
    compare(playerCard, dealerCard);
    pointCount();
    
    // Display cards to players
    // Overwrites element if it already exists, appends if it doesn't
    card1.appendChild(playerImg);
    card2.appendChild(dealerImg);

    // Check if the cards values are tied
    tie(playerCard, dealerCard, card1, card2);
    checkWinTurn();
}

/**
 * If there is a tie with both card values, execute this function. Adds 3 cards to each player
 * and compares to see who wins. This continues to happen until there is a winner.
 * @param {integer} playerCard given player card value
 * @param {integer} dealerCard given dealer card value
 */
function tie(playerCard, dealerCard) {
    var card1 = document.getElementsByTagName('figure')[0];
    var card2 = document.getElementsByTagName('figure')[1];
    if (playerCard == dealerCard || (playerCard % 13) == (dealerCard % 13)) {

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
        playerImgExtra1.style.height = "140px";
        
        playerImgExtra2 = document.createElement('img');
        playerImgExtra2.style.height = "140px";
        
        playerImgExtra3 = document.createElement('img');
        playerImgExtra3.style.height = "140px";
        
        dealerImgExtra1 = document.createElement('img');
        dealerImgExtra1.style.height = "140px";
        
        dealerImgExtra2 = document.createElement('img');
        dealerImgExtra2.style.height = "140px";
        
        dealerImgExtra3 = document.createElement('img');
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

        var playerValExtra = calcValue(extraPlayer3);
        var dealerValExtra = calcValue(extraDealer3);

        console.log("extra player cards: " + extraPlayer1 + " " + extraPlayer2 + " " + extraPlayer3);
        console.log("extra dealer cards: " + extraDealer1 + " " + extraDealer2 + " " + extraDealer3);
        console.log("Calc Extra Player: " + playerValExtra); // RETURNS NAN
        console.log("Calc Extra Dealer: " + dealerValExtra);
        
        // Compare war cards & update point count
        compare(playerValExtra, dealerValExtra);
        pointCount();
        checkWinTurn();
        //return [playerCard, dealerCard, card1, card2]; // TESTME: Test to see if return is required
    }
}

/**
 * Compares both card values and triggers WAR! if condition is met
 * @param {integer} playerVal Player card value
 * @param {integer} dealerVal Dealer card value
 */
function compare(playerVal, dealerVal) {
    // console.log("player value: " + playerVal);
    // console.log("dealer value: " + dealerVal); more debug fluff
    if (playerVal > dealerVal) {
        playerScore++;
        console.log("PLAYER SCORE: " + playerScore); // You can comment this out as it is not required, but helps!
    } else if (playerVal < dealerVal) {
        dealerScore++;
        console.log("DEALER SCORE: " + dealerScore);
    } else {
        tie(playerVal, dealerVal);
    }
}

/**
 * Takes a card value and checks if it is a J, Q, or K, and assigns appropriate value
 * @param {integer} cardVal a value to check
 * @returns value, the actual card value
 */
function calcValue(cardVal) {
    var value = cardVal % 13;

    if (value == 0 || value > 10) {
        console.log("CALCVAL:" + value);
        value = 10;
    }
    return value;
}

/**
 * This function runs when the user presses the "End Game" anchor element, and checks for a winner
 */
function checkWin() {
    // Get all required elements 
    console.log("CHECKWIN: " + usedCards.length);
    document.getElementsByTagName('h1')[1].setAttribute('id', "winPlayer");
    document.getElementsByTagName('h1')[3].setAttribute('id', 'winDealer');
    document.getElementsByTagName('h1')[0].setAttribute('id', "textPlayer");
    document.getElementsByTagName('h1')[2].setAttribute('id', 'textDealer');
    // Check statement to check who won
    if (playerScore > dealerScore && usedCards.length >= 2) {
        document.getElementsByTagName('button')[0].disabled = true;
        console.log("Player has won!");
        textPlayer.innerHTML = "Player has won the hand";
        winPlayer.style.cssText = "color: green";
    } else if (playerScore < dealerScore && usedCards.length >= 2) {
        document.getElementsByTagName('button')[0].disabled = true;
        console.log("Dealer has won!");
        textDealer.innerHTML = "Dealer has won the hand";
        winDealer.style.cssText = "color: green"
    } else {
        console.log("It's a tie!");
        winPlayer.style.cssText = "color: red";
        winDealer.style.cssText = "color: red"; 
    }
}

/**
 * This function is essentially the same thing as the one before, but checks at every turn
 * instead of on user-click. This automatically calculates the winner once the array is full
 */
function checkWinTurn() {
    console.log("CHECKWINTURN: " + usedCards.length);
    document.getElementsByTagName('h1')[1].setAttribute('id', "winPlayer");
    document.getElementsByTagName('h1')[3].setAttribute('id', 'winDealer');
    document.getElementsByTagName('h1')[0].setAttribute('id', "textPlayer");
    document.getElementsByTagName('h1')[2].setAttribute('id', 'textDealer');
    if (playerScore > dealerScore && usedCards.length >= 52) {
        console.log("CHECKWINTURN: Player if ran!");
        document.getElementsByTagName('button')[0].disabled = true;
        console.log("Player has won!");
        textPlayer.innerHTML = "Player has won the hand";
        winPlayer.style.cssText = "color: green";
        console.log(winPlayer);
    } else if (playerScore < dealerScore && usedCards.length >= 52) {
        console.log("CHECKWINTURN: Dealer if ran!");
        document.getElementsByTagName('button')[0].disabled = true;
        console.log("Dealer has won!");
        textDealer.innerHTML = "Dealer has won the hand";
        winDealer.style.cssText = "color: green"
        console.log(winDealer);
    }
}