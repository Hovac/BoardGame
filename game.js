var colors = ["#d61745", "#3569bc", "white", "#f4862a", "#eaed19", "#329f64", "black"];

var el = new Elements();
var clr = new Coloring();

var moves = 0;
var seconds = 0;
var minutes = 0;
var timer;

var checkRNGArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var checkPlayArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//initializing div into arrays
window.onload = function () {
    for (let i = 0; i < 9; i++) {
        el.rngDiv[i] = document.getElementById("r" + i);
    }
    for (let i = 0; i < 25; i++) {
        el.playDiv[i] = document.getElementById("l" + i);
    }
    el.renderTable(el.rngDiv, clr.rngColorPlaces);
    el.renderTable(el.playDiv, clr.playColorPlaces);
    el.setArrayCondition(clr.playColorPlaces);

}

//tests if there are 4 duplicates in an array. used only in rngArray - currently not needed, found bulletproof workaround
/* function testDuplicate(A) {
    let testArray = new Array;
    testArray = [A.length];
    for (let i = 0; i < A.length; i++) {
        testArray[i] = 0;
    }
    for (let i = 0; i < A.length; i++) {
        let testHold = 0;
        for (let j = 0; j < A.length; j++) {
            if (A[i] == A[j]) {
                testHold++;
            }
        }
        if (testHold > 4) {
            //maybe replace current element instead of starting the process of generating tiles over and over. Theoretically I can generate infinite times of 4+ same tiles, but practically that will *almost* never happen. maybe new solution later.
            restart();
        } else {
            return 0;
        }
    }
} */

function timerMove() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    el.timerWrite(minutes, seconds);
}

//self explanatory
function restart() {
    seconds = 0;
    minutes = 0;
    el.timerRestart();
    clearInterval(timer);
    moves = 0;
    el.movesDiv.innerHTML = "Moves: " + moves;

    //shuffles all 25 div like it is play array
    clr.shuffleColor(clr.rngColorPlaces);
    //but only renders first 9
    el.renderTable(el.rngDiv, clr.rngColorPlaces);
    //shuffles all 25 and renders all 25
    clr.shuffleColor(clr.playColorPlaces);
    el.renderTable(el.playDiv, clr.playColorPlaces);

    timer = setInterval(timerMove, 1000);
}

//checking win condition every click or keyboardPress
function checkWinCond(a, b) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
        el.winScreen.style.zIndex = 50;
        el.winScreen.style.opacity = 1;
        el.winMoves.innerHTML = "Moves: " + moves;
        el.winTime.innerHTML = el.winString;
    }
}

el.winScreen.addEventListener("click", function () {
    el.winScreen.style.zIndex = -50;
    el.winScreen.style.opacity = 0;
});

//mouse controls
el.playTable.addEventListener("click", function (e) {
    if (e.target.style.backgroundColor != "black") {
        let a = parseInt(e.path[0].id.substr(1), 10);
        let t = 0;
        if (clr.playColorPlaces[a - 5] == 6) {
            t = clr.playColorPlaces[a - 5];
            clr.playColorPlaces[a - 5] = clr.playColorPlaces[a];
            clr.playColorPlaces[a] = t;
            moves++;
        }
        if (clr.playColorPlaces[a - 1] == 6) {
            t = clr.playColorPlaces[a - 1];
            clr.playColorPlaces[a - 1] = clr.playColorPlaces[a];
            clr.playColorPlaces[a] = t;
            moves++;
        }
        if (clr.playColorPlaces[a + 1] == 6) {
            t = clr.playColorPlaces[a + 1];
            clr.playColorPlaces[a + 1] = clr.playColorPlaces[a];
            clr.playColorPlaces[a] = t;
            moves++;
        }
        if (clr.playColorPlaces[a + 5] == 6) {
            t = clr.playColorPlaces[a + 5];
            clr.playColorPlaces[a + 5] = clr.playColorPlaces[a];
            clr.playColorPlaces[a] = t;
            moves++;
        }
        //rendering whole array since it isn't big array. Have to think of a way to only render those blocks that changed...
        el.renderTable(el.playDiv, clr.playColorPlaces);

        //storing parts of clr.playColorPlaces in checkPlayArray so it is easier to check for win condition
        checkPlayArray = el.setArrayCondition(clr.playColorPlaces, true);
        checkRNGArray = el.setArrayCondition(clr.rngColorPlaces, false);
        el.movesDiv.innerHTML = "Moves: " + moves;

        //checking win condition
        checkWinCond(checkPlayArray, checkRNGArray);
    }
});
//keyboard controls
document.onkeydown = function (e) {
    let p = clr.playColorPlaces.indexOf(6);
    //up
    if (e.keyCode == 38) {
        if (p > 4) {
            let t = clr.playColorPlaces[p - 5];
            clr.playColorPlaces[p - 5] = clr.playColorPlaces[p];
            clr.playColorPlaces[p] = t;
            moves++;
        }
    }
    //down
    if (e.keyCode == 40) {
        if (p < 20) {
            let t = clr.playColorPlaces[p + 5];
            clr.playColorPlaces[p + 5] = clr.playColorPlaces[p];
            clr.playColorPlaces[p] = t;
            moves++;
        }
    }
    //left
    if (e.keyCode == 37) {
        if (p != 0 && p != 5 && p != 10 && p != 15 && p != 20) {
            let t = clr.playColorPlaces[p - 1];
            clr.playColorPlaces[p - 1] = clr.playColorPlaces[p];
            clr.playColorPlaces[p] = t;
            moves++;
        }
    }
    //right
    if (e.keyCode == 39) {
        if (p != 4 && p != 9 && p != 14 && p != 19 && p != 24) {
            let t = clr.playColorPlaces[p + 1];
            clr.playColorPlaces[p + 1] = clr.playColorPlaces[p];
            clr.playColorPlaces[p] = t;
            moves++;
        }
    }
    el.renderTable(el.playDiv, clr.playColorPlaces);

    el.movesDiv.innerHTML = "Moves: " + moves;

    checkPlayArray = el.setArrayCondition(clr.playColorPlaces, true);
    checkRNGArray = el.setArrayCondition(clr.rngColorPlaces, false);

    checkWinCond(checkPlayArray, checkRNGArray);
}