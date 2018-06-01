// creates an array for all the cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// the deck of cards
const deck = document.getElementById("deckofcards");

// declaring the move variable
let moves = 0;
let counter = document.querySelector(".moves");

// creates a variable for stars
const stars = document.querySelectorAll(".fa-star");

// creates a variable of matched cards
let matchedCard = document.getElementsByClassName("match");

 // variable stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1")

 // array for opened cards
var openedCards = [];


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
};


// shuffles cards when page loads or is refreshed
document.body.onload = newGame();


// starts a new game 
function newGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // resets moves
    moves = 0;
    counter.innerHTML = moves;
    // resets star rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //resets game clock
    second = 0;
    minute = 0; 
    hour = 0;
    var gameclock = document.querySelector(".gameclock");
    gameclock.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// toggles the open and show classes to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// adds opened cards to the OpenedCards list and checks if cards form a pair
function revealCard() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        movesCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            noMatch();
        }
    }
};


// adds the match and disabled classes when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "noEvent");
    openedCards[1].classList.remove("show", "open", "noEvent");
    openedCards = [];
}


// description when cards don't match
function noMatch(){
    openedCards[0].classList.add("notMatched");
    openedCards[1].classList.add("notMatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "noEvent","notMatched");
        openedCards[1].classList.remove("show", "open", "noEvent","notMatched");
        enable();
        openedCards = [];
    },1100);
}


// disables cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// enables cards and disables cards that have been matched
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// a counter for tracking the number of moves a player makes
function movesCounter(){
    moves++;
    counter.innerHTML = moves;
    // starts game clock on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTheClock();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// game clock
var second = 0, minute = 0; hour = 0;
var gameclock = document.querySelector(".gameclock");
var interval;
function startTheClock(){
    interval = setInterval(function(){
        gameclock.innerHTML = minute +" minutes and " + second + " seconds";
        second++;
        if (second == 60){
            minute++;
            second=0;
        }
        if (minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// congratulates the player when all cards match, shows modal and moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = gameclock.innerHTML;

        // shows congratulations modal
        modal.classList.add("show");

        // declares star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        newGame();
    });
}


// play again 
function playAgain(){
    modal.classList.remove("show");
    newGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", revealCard);
    card.addEventListener("click",congratulations);
};