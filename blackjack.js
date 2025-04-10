const playerScore = document.getElementById("player-score")
const systemScore = document.getElementById("system-score")
const hitButton = document.getElementById("hit-button")
const standButton = document.getElementById("stand-button")
const playerCards = document.getElementById("player-cards")
const systemCards = document.getElementById("system-cards")

const values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"]
const suits = ["c", "d", "h", "s"]
let usedCards = []

let player = {
    score: 0,
    cards: 0
}

let system = {
    score: 0,
    cards: 0
}

function hit(user) {
    let value = values[Math.floor(Math.random() * values.length)]
    let suit = suits[Math.floor(Math.random() * suits.length)]

    let card = ""
    card = `${value}${suit}.png`
    
    if (usedCards.includes(card)) {
        return(hit())
    } else {
        usedCards.push(card)
    }

    // card is number
    if (value != "a" && value != "j" && value != "q" && value != "k") {
        user.score += parseInt(value)
    }
    // card is royal
    else if (value != "a") {
        user.score += 10
    }
    // card is ace
    else {
        if (user.score <= 10) {
            user.score += 11
        } else {
            user.score += 1
        }
    }

    user.cards++

    return(`<img src='./assets/images/cards/${card}' class='w-25'/>`)
}

hitButton.addEventListener("click", function() {
    playerCards.innerHTML += `${hit(player)}`
    playerScore.textContent = `player: ${player.score}`
})

playerCards.innerHTML = `${hit(player)}${hit(player)}`
systemCards.innerHTML = `${hit(system)}${hit(system)}`
playerScore.textContent = `player: ${player.score}`
systemScore.textContent = `system: ${system.score}`