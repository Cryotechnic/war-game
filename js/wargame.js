// Initializing variables
var usedCards = []; 
playerImg = document.createElement('img');
dealerImg = document.createElement('img');
playerScore = 0;
dealerScore = 0;

// FIXME: Further test J, Q, K & Ace to see if they match parameters
// FIXME: Some methods use returns, others just pass on their parameters, test to see if you can get away with not using return
// FIXME: Create img tags before modifying attributes

// document.window.onload = assignCards(); // FIXME: innerHtml undefined

/**
 * Generates random number in range
 * @param {*} max maximum number 
 * @param {*} min minimum number
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

    card1.innerHTML = "";
    card2.innerHTML = "";

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
    return [playerCard, dealerCard, card1, card2];
}

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
        //playerImgExtra1.setAttribute('id', 'playerImgExtra1');
        playerImgExtra1.style.height = "140px";
        
        playerImgExtra2 = document.createElement('img');
        //playerImgExtra2.setAttribute('id', 'playerImgExtra2');
        playerImgExtra2.style.height = "140px";
        
        playerImgExtra3 = document.createElement('img');
        //playerImgExtra3.setAttribute('id', 'playerImgExtra3');
        playerImgExtra3.style.height = "140px";
        
        dealerImgExtra1 = document.createElement('img');
        //dealerImgExtra1.setAttribute('id', 'dealerImgExtra1');
        dealerImgExtra1.style.height = "140px";
        
        dealerImgExtra2 = document.createElement('img');
        //dealerImgExtra2.setAttribute('id', 'dealerImgExtra2');
        dealerImgExtra2.style.height = "140px";
        
        dealerImgExtra3 = document.createElement('img');
        //dealerImgExtra3.setAttribute('id', 'dealerImgExtra3');
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

        // Compare war cards & update point count
        compare(playerImgExtra3, dealerImgExtra3); // FIXME: implement war method instead of normal compare
        pointCount();

        return [playerCard, dealerCard, card1, card2]; // TESTME: Test to see if return is required
    }
}

/**
 * Compares card values
 * @param {*} playerCard distributed player card
 * @param {*} dealerCard distributed dealer card
 */
function compare1(playerCard, dealerCard) {
    if ((playerCard % 13) > (dealerCard % 13) || playerCard > dealerCard) {
        if (playerCard == 11 || playerCard == 12 || playerCard == 13
            || playerCard == 24 || playerCard == 25 || playerCard == 26
             || playerCard == 37 || playerCard == 38 || playerCard == 39 || 
              playerCard == 50 || playerCard == 51 || playerCard == 52) {
                  playerCard = 100;
                if (playerCard == 1 || playerCard == 14 || playerCard == 27 || playerCard == 40) {
                    playerCard = 1
                }  
                // Checks if there is War between player & dealer
                if (playerCard == dealerCard) {
                      console.log(playerCard);  
                      playerCard = 10;
                      compare(playerCard, dealerCard);
                    }
                }
                //playerCard = 10;
        console.log("player won"); // Implement proper formatting
        console.log(playerCard); // Implement proper formatting
        console.log(dealerCard); // Implement proper formatting
        playerScore++; 
    } else if ((playerCard % 13) < (dealerCard % 13) || playerCard < dealerCard) {
        if (dealerCard == 11 || dealerCard == 12 || dealerCard == 13 || 
            dealerCard == 24 || dealerCard == 25 || dealerCard == 26
            || dealerCard == 37 || dealerCard == 38 || dealerCard == 39 || 
            dealerCard == 50 || dealerCard == 51 || dealerCard == 52) {
                dealerCard = 100;
                if (playerCard == 1 || playerCard == 14 || playerCard == 27 || playerCard == 40) {
                    playerCard = 1
                }
                if (dealerCard == playerCard) {
                    console.log("dealer: " + dealerCard + " " + playerCard);
                    console.log(dealerCard);
                    dealerCard = 10;
                    compare(playerCard, dealerCard);
                    }
                }
                //dealerCard = 10;
        console.log("dealer won"); // Implement proper formatting
        console.log(dealerCard); // Implement proper formatting
        console.log(playerCard); // Implement proper formatting
        dealerScore++;
    } else {
        // FIXME: Should there be a nested if-loop if this is already checking for tie?
        // Executes War function if none of the parameters match
        console.log("tie");
        tie(playerCard, dealerCard);
    }
}

function compare(playerCard, dealerCard) {
    console.log("COMPARE " + playerCard + " " + dealerCard);
    var playerVal = calcValue(playerCard);
    console.log("player value: " + playerVal);
    var dealerVal = calcValue(dealerCard);
    console.log("dealer value: " + dealerVal);
    console.log(playerVal + " " + dealerVal);
    if (playerVal > dealerVal && playerCard > dealerCard) {
        console.log(playerCard);
        playerScore++;
    } else if (playerVal < dealerVal && playerCard < dealerCard) {
        console.log(dealerCard);
        dealerScore++;
    } else {
        tie(playerVal, dealerVal);
    }
}

function calcValue(number) {
    var value = (number % 13);

    if (value == 0) {
        console.log(value);
        value = 10;
    } else if (value > 10) {
        console.log(value);
        value = 10;
    }
    return value;
}

/**
 * 
 * @param {*} playerImgExtra3 
 * @param {*} dealerImgExtra3 
 */
// function compareWar(playerImgExtra3, dealerImgExtra3) {
//     //compare(playerImgExtra3, dealerImgExtra3);
//     if (playerImgExtra3 == dealerImgExtra3 || (playerImgExtra3 % 13) == (dealerImgExtra3 % 13)) {
//         tie(playerImgExtra3, dealerImgExtra3);
//     }

// }

function removeExtra(card1, card2) {
    console.log(card1);
    console.log(card2);
    document.getElementsByTagName('figure')[0].innerHTML = "<img src='img/back.png'/>";
    document.getElementsByTagName('figure')[1].innerHTML = "<img src='img/back.png'/>";
    // card1.innerHTML = "";
    // card2.innerHTML = "";
}

function checkWin() {
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