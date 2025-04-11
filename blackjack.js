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
    cards: []
}

let system = {
    score: 0,
    cards: []
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

    let points = 0
    // card is number
    if (!isNaN(parseInt(value))) {
        user.score += parseInt(value)
    }
    // card is royal
    else if (value != "a") {
        points = 10
    }
    // card is ace
    else {
        if (user.score <= 10) {
            points = 11
        } else {
            points = 1
        }
    }

    user.score += points

    return (card)
}

function render() {
    playerCards.innerHTML = ''
    playerScore.textContent = `player: ${player.score}`
    for (let i = 0; i < player.cards.length; i++) {
        playerCards.innerHTML += `<img src='./assets/images/cards/${player.cards[i]}' class='w-25'/>`
    }

    systemCards.innerHTML = ''
    systemScore.textContent = `system: ${system.score}`
    for (let i = 0; i < system.cards.length; i++) {
        if (i === 0) {
            systemCards.innerHTML += `<img src='./assets/images/cards/hidden-card.png' class='w-25'/>`
        } else {
            systemCards.innerHTML += `<img src='./assets/images/cards/${system.cards[i]}' class='w-25'/>`
        }
    }
}

hitButton.addEventListener("click", function() {
    player.cards.push(hit(player))
    render()
})

player.cards.push(hit(player))
player.cards.push(hit(player))
system.cards.push(hit(system))
system.cards.push(hit(system))

render()

systemScore.innerHTML += ` -- ${system.cards}`