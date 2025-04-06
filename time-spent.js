const randomFunFact = document.getElementById("random-fun-fact")

const startTime = new Date()
let timeSpent = 0
let timeText = ''
setInterval(timeSpentRefresh, 1)

function timeSpentRefresh() {
    timeSpent = Math.round(((new Date) - startTime) / 1000) 
    if (timeSpent < 60) {
        timeText = `${timeSpent} seconds`
    } else if (timeSpent < 3600) {
        timeText = `${Math.round(timeSpent/60)} minutes and ${timeSpent%60} seconds`
    } else {
        timeText = `${Math.round(timeSpent/3600)} hours, ${Math.round((timeSpent%3600)/60)} minutes and ${timeSpent%60} seconds`
    }

    randomFunFact.textContent = `You have spent ${timeText} on E4Ellis.net.`

    if (timeSpent >= 120) {
        randomFunFact.innerHTML += ` <span class="badge bg-warning">WOW You need help!</span>`
    }
}