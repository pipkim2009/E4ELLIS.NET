const randomFunFact = document.getElementById("random-fun-fact")

const startTime = new Date()
let timeSpent = 0

setInterval(timeSpentRefresh, 1)

function timeSpentRefresh() {
    timeSpent = Math.round(((new Date) - startTime) / 1000) 
    randomFunFact.textContent = `You have spent ${timeSpent} seconds on E4Ellis.net.`
    if (timeSpent >= 120) {
        randomFunFact.innerHTML += ` <span class="badge bg-warning">WOW You need help!</span>`
    }
}