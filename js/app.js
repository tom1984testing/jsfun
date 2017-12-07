/*
 * Create a list that holds all of your cards
 */

var cards = [
    "fa-diamond","fa-paper-plane-o", "fa-anchor", "fa-bolt",
    "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle",
    "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb",
    "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"
    ];

var intervalId = -1;
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


// count timer when begin the game
intervalId = setInterval(countTimer, 1000);

// timing 
function countTimer(){
    $(".timer").text(timeUsed);
    timeUsed += 1;
}

function stopCount(){
    clearInterval(intervalId)
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
            if(openCards.length === 2){
                setTimeout("doMatch()", 500);
            }
        }
    });
});

function openCard(element) {
    $(element).addClass("animated fadeIn open show");
}

function addCardToOpenList(index, element) {
    openCards.push({index: index,element: element});
}

function doMatch() {
    incrementMoveCount();
    if(isCardFromOpenListMatch()){
        matchCardFromOpenList();
        matchedCardCount += 2;
        if(matchedCardCount === cards.length){
            gameOver();
        }
    }else{
        disMatchCardFromOpenList();
    }
    clearOpenCards();
}

function matchCardFromOpenList(){
    $(openCards[0].element).removeClass("fadeIn");
    $(openCards[0].element).removeClass("open show");
    $(openCards[0].element).addClass("match animated rubberBand");

    $(openCards[1].element).removeClass("fadeIn");
    $(openCards[1].element).removeClass("open show");
    $(openCards[1].element).addClass("match animated rubberBand");
}

function disMatchCardFromOpenList(){
    $(openCards[0].element).removeClass("open show");
    $(openCards[1].element).removeClass("open show");
}

function isCardFromOpenListMatch() {
    return cards[openCards[0].index] === cards[openCards[1].index];
}

function clearOpenCards() {
    openCards.length = 0;
}

function incrementMoveCount() {
    moveCount++;
    $(".moves").text( moveCount );

    var s = calculateStars();
    if(s !== stars){
        $(".stars li").last().remove();
        stars = s;
    }
}

function calculateStars() {
    return moveCount >= 20 ? 1 : moveCount >= 15 ? 2 : 3;
}

function gameOver() {
    stopCount();
    $("#dialog-confirm").find("p").html(`Congratulation, you used ${moveCount} moves within ${timeUsed-1} seconds, have won ${stars} stars!!!`);
    $( "#dialog-confirm" ).dialog({
      resizable: true,
      height:300,
      buttons: {
        "Replay": function() {
          restart();
        },
        "Close": function() {
          $( this ).dialog( "close" );
        }
      }
    });
}

/**
 * Restart the game
 * - Reset the game cards
 * - Reset counters: timer, stars, moves
 */
$(".restart").click(function(){
    restart();
})

function restart() {
    location.reload();
}



