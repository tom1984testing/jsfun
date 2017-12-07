/*
 * Create a list that holds all of your cards
 */

var cards = [
    "fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt",
    "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle",
    "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb",
    "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
    ];

var timer;
var timeUsed = 0;
var stars = 3;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
displayCards(cards);

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

// create card HTML element and show in deck
function displayCards(cards) {
    $(".deck").empty();
    $.each( cards, function(index, value) {
        var li = $(`<li class="card"><i class="fa ${value}"></i></li>`);
        $(".deck").append(li);
    });
}

// timing 
function countTimer(){
    $(".timer").text(timeUsed);
    timeUsed += 1;
    timer = setTimeout("countTimer()",1000);
}

function stopCount(){
    clearTimeout(timer)
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
                setTimeout("doMatch()", 1000);
            }
        }
    });
});

function openCard(element) {
    // start timing
    if(timeUsed == 0){
        countTimer();
    }
    $(element).addClass("animated fadeIn open show");
}

function hideCard(element) {
    $(element).removeClass("open show");
}

function addCardToOpenList(index, element) {
    openCards.push({index: index,element: element});
}

function doMatch() {
    if(isCardFromOpenListMatch()){
        matchCard(openCards[0].element, openCards[1].element);
        matchedCardCount += 2;
        if(matchedCardCount == cards.length){
            gameOver();
        }
    }else{
        disMatchCard(openCards[0].element, openCards[1].element);
    }
    incrementMoveCount();
    clearOpenCards();
}

function matchCard(element1, element2){
    $(element1).removeClass("open show");
    $(element1).addClass("match");
    $(element2).removeClass("open show");
    $(element2).addClass("match");
}

function disMatchCard(element1, element2){
    $(element1).removeClass("open show");
    $(element2).removeClass("open show");
}

function isCardFromOpenListMatch() {
    var index1 = openCards[0].index;
    var index2 = openCards[1].index;
    return cards[index1] == cards[index2];
}

function clearOpenCards() {
    openCards.length = 0;
}

function incrementMoveCount() {
    moveCount++;
    $(".moves").html( moveCount );

    var t = moveCount >= 30? 1 : moveCount >= 20 ? 2 : 3;
    if( t != stars ){
        stars = t;
        refreshStars();
    }
}

//stars
function refreshStars(){
    $(".stars").empty();
    for(var i=1; i<=stars; i++){
        $(".stars").append($(`<li><i class="fa fa-star"></i></li>`));
    }
}


function gameOver() {
    stopCount();
    alert("Congratulation!! You total moves are " + moveCount);
}

/**
 * Restart the game
 * - Reset the game cards
 * - Reset counters: timer, stars, moves
 */
$(".restart").click(function(){
    location.reload();
})



