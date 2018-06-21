/*
 * Create a list that holds all of your cards
 */

var deck_of_cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", 
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", 
"fa fa-leaf", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube", "fa fa-bomb"];

var deck = document.getElementById("deckofcards");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //Creates  the cards and ays them down in a grid
var cardGrid = document.querySelector('.deck');

//Displays the player's rating
var starsRating = document.querySelector(".stars")

//Displays the player's move total 
var movesCounter = document.querySelector(".moves")
moves = 0;

var flippedCards = [];

var cardPairs = 0;



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


//Based on https://github.com/elharony/Udacity-Study-Jam-FEND-P3-Memory-Game/blob/master/js/app.js
function startGame (card) {
	deck.innerHTML = "";
	card = shuffle(deck_of_cards);
	for (var x = 0; x < deck_of_cards.length; x++) {
		var card = document.createElement("li");
		card.classList.add("card");
		card.innerHTML = "<i class = '" + deck_of_cards[x] + "'</i>"
		cardGrid.appendChild(card);

		reveal(card);



	}


}

/*
 * set up the event listener for a card. If a card is clicked:
 *  Function 1.  display the card's symbol (put this functionality in another function that you call from this one)
 *  Function 2 add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  	- if the list already has another card, check to see if the two cards match
 *    		Function 3 - if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    		Function 4 - if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    		Function 5 - increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    		Function 6 - if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




// Function 1 and 2: Displays the card clicked by the player and adds the card to an array of open
// cards (flippedCards) to check if both match
function reveal (card) {		
	card.addEventListener("click", function() {
		if (flippedCards.length === 1) {
			card.classList.add("open", "show", "disabled")
			flippedCards.push(this);
			checkForMatch();			
		} else {
			card.classList.add("open", "show", "disabled")
			flippedCards.push(this); 
				
		}

	});

}


/*
* Function 3: Checks to see if two cards selected do match, and adds +1 to the cardPairs variable 
* to keep score of how many matches/pairs have been made, and checks if all pairs have been made.
* Otherwise calls a noMatch function if the cards don't match.
*/
function checkForMatch() {
	moves++;
	movesCounter.innerHTML = moves;
	score();

	if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
		flippedCards[0].classList.add("match");
		flippedCards[1].classList.add("match");
		cardPairs++
		flippedCards.length = 0;
		youWin();

	} else {
		noMatch();

	}

}

// Function 4: If the two cards don't match, hides the cards again by removing the corresponding 
// classes from both, and sets the flippedCards array back to empty.
function noMatch() {
	setTimeout(function() {
		flippedCards[0].classList.remove("open", "show", "disabled");
		flippedCards[1].classList.remove("open", "show", "disabled");
		flippedCards.length = 0;			
	}, 500);
}


// Function 6: Checks if player has won by comparing the variable cardPairs to half the length of the
// deck_of_cards array and sends out an corresponding alert. 
function youWin() {
	if (cardPairs === deck_of_cards.length/2) {
		setTimeout(function() {
			if (moves <= 10) {
				alert("Congratulations! \nYou won with " + moves + " moves for a rating of three stars!");
			}

			else if (moves <= 15) {
				alert("Congratulations! \nYou won with " + moves + " moves for a rating of two stars!");
			}

			else 
				alert("Congratulations! \nYou won with " + moves + " moves for a rating of one star!");
			
		}, 500);
		
	}
}


// Changes the score in real time as the player clicks away.
function score() {
	if (moves <= 10) {
		starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
	}
	else if (moves <= 15) {
		starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
	}
	else
		starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>`;
}

// Deletes all cards from arrays except for the deck, resets all counters to zero, and restarts game
// Modified from https://github.com/elharony/Udacity-Study-Jam-FEND-P3-Memory-Game/blob/master/js/app.js
var restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {
	cardGrid.innerHTML = "";
	moves = 0;
	movesCounter.innerHTML = moves;
	cardPairs.length = 0;
	starsRating.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`
	startGame();
	
});

startGame();