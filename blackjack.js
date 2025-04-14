const playerScore = document.getElementById("player-score")
const systemScore = document.getElementById("system-score")
const hitButton = document.getElementById("hit-button")
const standButton = document.getElementById("stand-button")
const playerCards = document.getElementById("player-cards")
const systemCards = document.getElementById("system-cards")
const alertContainer = document.getElementById("alert-container")

const values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"]
const suits = ["c", "d", "h", "s"]
let usedCards = []

let player = {
    score: 0,
    cards: [],
    aceEleven: 0 
}

let system = {
    score: 0,
    hiddenPoints: 0,
    cards: [],
    aceEleven: 0 
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
    
    if (!isNaN(parseInt(value))) {
        points += parseInt(value)
    }
    else if (value != "a") {
        points = 10
    }
    else {
        if (user.score <= 10) {
            points = 11
            user.aceEleven++
        } else {
            points = 1
        }
    }

    user.score += points

    if ((user.score > 21) && (user.aceEleven != 0)) {
        user.score += -10
        user.aceEleven--
    }

    if ((user === system) && (system.cards.length != 0)) {
        system.hiddenPoints += points
    }

    user.cards.push(card)
}

function stand() {
    if (system.score < 17) {
        hit(system)
        stand()
    } else {
        render(true)
    }
}

function render(stand) {
    playerCards.innerHTML = ''
    playerScore.textContent = `player: ${player.score}`
    for (let i = 0; i < player.cards.length; i++) {
        playerCards.innerHTML += `<img src='./assets/images/cards/${player.cards[i]}' class='w-25'/>`
    }

    systemCards.innerHTML = ''
    if (stand === false) {
        systemScore.textContent = `system: ${system.score - system.hiddenPoints}`
        systemCards.innerHTML += `<img src='./assets/images/cards/${system.cards[0]}' class='w-25'/>`
        systemCards.innerHTML += `<img src='./assets/images/cards/hidden-card.png' class='w-25'/>`
    } else {
        for (let i = 0; i < system.cards.length; i++) {
            systemScore.textContent = `system: ${system.score}`
            systemCards.innerHTML += `<img src='./assets/images/cards/${system.cards[i]}' class='w-25'/>`
        }

        hitButton.setAttribute("disabled", "")
        hitButton.style.opacity = 0.5
        standButton.setAttribute("disabled", "")
        standButton.style.opacity = 0.5
    }
}

hitButton.addEventListener("click", function() {
    hit(player)
    render(false)
})

standButton.addEventListener("click", function() {
    stand()
})

// setup game
hit(player)
hit(player)
hit(system)
hit(system)
render(false)