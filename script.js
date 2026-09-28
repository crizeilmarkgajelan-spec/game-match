let teamA = 0;
let teamB = 0;

let amountInterval = null;
let resultShown = false;

/*
    I-SET INI BASE HA IMO VIDEO

    Example:
    20 seconds = start han purok
    35 seconds = end han purok

    Temporary winner la ini.
    Diri pa ini nagbabasa mismo han winner ha video.
*/
const purokStart = 20;
const purokEnd = 35;
const winner = "WALA";


/* RANDOM INITIAL AMOUNT */

function randomAmount() {
    return Math.floor(100000 + Math.random() * 900000);
}


/* DISPLAY LARGE TEAM AMOUNTS */

function updateDisplay() {

    document.getElementById("teamA").textContent =
        teamA.toLocaleString();

    document.getElementById("teamB").textContent =
        teamB.toLocaleString();
}


/* MOVE / INCREASE AMOUNTS */

function increaseAmounts() {

    teamA += Math.floor(1000 + Math.random() * 10000);
    teamB += Math.floor(1000 + Math.random() * 10000);

    updateDisplay();
}


/* START MOVEMENT */

function startAmountMovement() {

    if (amountInterval !== null) {
        return;
    }

    amountInterval = setInterval(function () {

        increaseAmounts();

    }, 1000);
}


/* STOP MOVEMENT */

function stopAmountMovement() {

    if (amountInterval !== null) {

        clearInterval(amountInterval);
        amountInterval = null;
    }
}


/* RESET AMOUNTS */

function resetAmounts() {

    stopAmountMovement();

    teamA = 0;
    teamB = 0;

    updateDisplay();
}


/* SHOW WINNER */

function showWinner() {

    if (resultShown) {
        return;
    }

    resultShown = true;

    const result = document.getElementById("result");

    result.textContent =
        "🏆 WINNER: " + winner;

}


/* HIDE WINNER */

function hideWinner() {

    resultShown = false;

    document.getElementById("result").textContent = "";

}


/* SELECT TEAM */

function selectTeam(team) {

    document.getElementById("selection").textContent =
        "Bet " + team;

}


/* SET PREDICTION AMOUNT */

function setAmount(amount) {

    document.getElementById("predictionAmount").value =
        Number(amount).toFixed(2);

}


/* MENU */

function toggleMenu() {

    const menu =
        document.getElementById("menuDropdown");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";
    }
}


/* DATE */

function showDate() {

    const today = new Date();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("date").textContent =
        today.toLocaleDateString(undefined, options);
}


/* VIDEO */

const gameVideo =
    document.getElementById("gameVideo");


/*
    MONITOR VIDEO TIME
*/

gameVideo.addEventListener("timeupdate", function () {

    const currentTime =
        gameVideo.currentTime;


    /*
        BEFORE PUROK

        Numbers move/increase
    */

    if (currentTime < purokStart) {

        if (!gameVideo.paused) {

            startAmountMovement();
        }

        hideWinner();

        return;
    }


    /*
        DURING PUROK

        Numbers stop moving
    */

    if (
        currentTime >= purokStart &&
        currentTime < purokEnd
    ) {

        stopAmountMovement();

        return;
    }


    /*
        AFTER PUROK

        Numbers return to zero
        Then show winner
    */

    if (currentTime >= purokEnd) {

        resetAmounts();

        showWinner();
    }

});


/* WHEN VIDEO STARTS */

gameVideo.addEventListener("play", function () {

    const currentTime =
        gameVideo.currentTime;

    if (currentTime < purokStart) {

        startAmountMovement();

    }

});


/* WHEN VIDEO PAUSES */

gameVideo.addEventListener("pause", function () {

    stopAmountMovement();

});


/*
    WHEN VIDEO IS SEEKED
    (USER DRAGS VIDEO TIMELINE)
*/

gameVideo.addEventListener("seeked", function () {

    const currentTime =
        gameVideo.currentTime;


    if (currentTime < purokStart) {

        resetAmounts();
        hideWinner();

        if (!gameVideo.paused) {

            startAmountMovement();
        }

    }

    else if (
        currentTime >= purokStart &&
        currentTime < purokEnd
    ) {

        stopAmountMovement();
        hideWinner();

    }

    else {

        resetAmounts();
        showWinner();

    }

});


/* INITIAL DISPLAY */

teamA = randomAmount();
teamB = randomAmount();

updateDisplay();
showDate();