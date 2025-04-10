const playerScore = document.getElementById("player-score")
const systemScore = document.getElementById("system-score")
const playerCards = document.getElementById("player-cards")
const systemCards = document.getElementById("system-cards")

const values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"]
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"]
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
    if (value === "10") {
        card = `10${suit[0].toLowerCase()}.png`
    } else {
        card = `${value}${suit[0].toLowerCase()}.png`
    } 
    
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
    else if (value === "a") {
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

systemCards.innerHTML = `${hit(system)}${hit(system)}`
playerCards.innerHTML = `${hit(player)}${hit(player)}`
systemScore.textContent = `system: ${system.cards}`
playerScore.textContent = `player: ${player.cards}`