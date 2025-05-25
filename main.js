var gameData = {
    cocoinUnits: 0,     // each unit = 0.00001 cocoin
    cpsUnits: 1,        // +1 unit per second = +0.00001 cocoin
    lastTick: Date.now()
};

function mineCocoin() {
    gameData.cocoinUnits += gameData.cpsUnits;
    updateDisplay();
}

function updateDisplay() {
    const displayAmount = (gameData.cocoinUnits * 0.00001).toFixed(5);
    document.getElementById("cocoinMined").innerHTML = displayAmount + " cocoins Earned";
}

setInterval(mineCocoin, 1000);

// Save every 5 seconds
setInterval(() => {
    localStorage.setItem("kittoSave", JSON.stringify(gameData));
    console.log("Saved:", gameData);
}, 5000);

// Load saved game (new format only)
var savedGame = JSON.parse(localStorage.getItem("kittoSave"));
if (savedGame !== null) {
    gameData = savedGame;

    const now = Date.now();
    const offlineTime = Math.floor((now - gameData.lastTick) / 1000);
    const offlineGainUnits = offlineTime * gameData.cpsUnits;
    gameData.cocoinUnits += offlineGainUnits;
    gameData.lastTick = now;

    if (offlineGainUnits > 0) {
        const displayOffline = (offlineGainUnits * 0.00001).toFixed(5);
        alert(`You were away for ${offlineTime}s and gained ${displayOffline} cocoins!`);
    }

    updateDisplay();
} else {
    console.log("No saved game found.");
}
// Update lastTick every second
setInterval(() => {
    gameData.lastTick = Date.now();
}, 1000);

function resetGame() {
    if (confirm("Are you sure you want to reset your game? This will erase all progress!")) {
        localStorage.removeItem("kittoSave");
        gameData = {
            cocoinUnits: 0,
            cpsUnits: 1,
            lastTick: Date.now()
        };
        updateDisplay();
        console.log("Game reset complete.");
        alert("Game has been reset!");
    }
}