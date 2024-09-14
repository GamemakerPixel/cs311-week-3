const matchesRemainingText = "Matches Remaining: "
const winText = "You win!"

let lastClickedCardElement = null;
let comparing = false;
let matchesLeft = 8;


function updateMatchesRemaining() {
    matchesRemainingElement = document.getElementById("matches-remaining")
    if (matchesLeft == 0) {
	matchesRemainingElement.innerHTML = winText
	return
    }
    matchesRemainingElement.innerHTML = matchesRemainingText + matchesLeft
}


function cardClicked(cardElement) {
    if (comparing) {
	return
    }
    
    if (lastClickedCardElement == null) {
	lastClickedCardElement = cardElement
    }
    else {
	revealCards(cardElement)
    }
}


function revealCards(cardElement) {
    lastClickedCardElement.value = lastClickedCardElement.dataset.text
    cardElement.value = cardElement.dataset.text

    comparing = true
    // JS stores a reference, then passes control? (Breaks when I just pass lastClickedCardElement due to null)
    secondCardElement = lastClickedCardElement
    setTimeout(() => { compareCards(cardElement, secondCardElement) }, 1000)
    lastClickedCardElement = null

}


function compareCards(cardElement, secondCardElement) {
    if (secondCardElement.dataset.text === cardElement.dataset.text) {
	cardElement.remove()
	secondCardElement.remove()

	matchesLeft -= 1
	updateMatchesRemaining()
    }
    else {
	cardElement.value = ""
	secondCardElement.value = ""
    }

    comparing = false
}
