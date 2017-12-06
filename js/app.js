/*
 * Create a list that holds all of your cards
 */

var allCards = [
    "fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt",
    "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle",
    "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb",
    "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
    ];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(allCards);

$(".deck").empty();
$.each( allCards, function(index, value) {
    var li = $("<li/>", {
        "class": "card"
    });
    var i = $("<i/>", {
        "class": "fa " + value
    });
    li.append(i);
    $(".deck").append(li);
});


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

var openCards = [];
var moveCount = 0;
var matchedCardCount = 0;

$( ".card" ).each( function( index, element ){
    $(element).click(function(){
        if(!$(element).hasClass("match") && !$(element).hasClass("open") && openCards.length < 2){
            openCard(element);
            addCardToOpenList(index, element);
            if(openCards.length == 2){
                if(isCardFromOpenListMatch()){
                    setTimeout(matchCardFromOpenList, 1000);
                }else{
                    setTimeout(disMatchCardFromOpenList, 1000);
                }
            }
            incrementMoveCount();
        }
    });
});

function openCard(element) {
    $(element).addClass("animated fadeIn open show");
}

function hideCard(element) {
    $(element).removeClass("open show");
}

function addCardToOpenList(index, element) {
    openCards.push({index: index,element: element});
}

function matchCardFromOpenList(){
    $(openCards[0].element).removeClass("open show");
    $(openCards[0].element).addClass("match");
    $(openCards[1].element).removeClass("open show");
    $(openCards[1].element).addClass("match");
    openCards.length = 0;
    matchedCardCount += 2;
    if(matchedCardCount == allCards.length) {
        alert("Congratulation!! You total moves are " + moveCount);
    }
}

function disMatchCardFromOpenList(){
    hideCard(openCards[0].element);
    hideCard(openCards[1].element);
    openCards.length = 0;
}

function isCardFromOpenListMatch() {
    var index1 = openCards[0].index;
    var index2 = openCards[1].index;
    return allCards[index1] == allCards[index2];
}

function incrementMoveCount() {
    moveCount++;
    $(".moves").html( moveCount );
}
