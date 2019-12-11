//many global variables, will solve later
var colors = ["#d61745", "#3569bc", "white", "#f4862a", "#eaed19", "#329f64", "black"];

var rngArray = [0,0,0,0,0,0,0,0,0];
var rngDiv = [0,0,0,0,0,0,0,0,0];

var playDiv = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
var playArray = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6]

var playTable = document.getElementById("player_table");
var rText = document.getElementById("restart-text");
var movesDiv = document.getElementById("moves");
var timerDiv = document.getElementById("timer");
var moves = 0;
var seconds = 0; 
var minutes = 0;
var timer;

//initializing div into arrays
window.onload = function () {
    for (let i = 0; i < 9; i++) {
        rngDiv[i] = document.getElementById("r" + i);
    }
    for (let i = 0; i < 25; i++) {
        playDiv[i] = document.getElementById("l" + i);
    }
    renderTable(rngDiv, rngArray);
    renderTable(playDiv, playArray);
}
//basic whole number RNG function so i don't have to write it all the time
function RNG(c) {
    return Math.floor((Math.random() * c));
}
//shuffles elements of array in the same array, so i don't have to have more array XD
function shuffleColor(arr) {
    let m = arr.length,
        t1, t2;
    while (m) {
        t1 = RNG(m--);
        t2 = arr[m];
        arr[m] = arr[t1];
        arr[t1] = t2;
    }
    return arr;
}
//renders the blocks
function renderTable(blocks, places) {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = colors[places[i]];
    }
}

//tests if there are 4 duplicates in an array. Currently used only in rngArray
function testDuplicate(A) {
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
}

function timerMove() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes < 10) {
        if (seconds < 10) {
            timerDiv.innerHTML = "Time: " + "0" + minutes + ":" + "0" + seconds;
        } else {
            timerDiv.innerHTML = "Time: " + "0" + minutes + ":" + seconds;
        }
    } else {
        if (seconds < 10) {
            timerDiv.innerHTML = "Time: " + minutes + ":" + "0" + seconds;
        } else {
            timerDiv.innerHTML = "Time: " + minutes + ":" + seconds;
        }
    }
}

//self explanatory
function restart() {
    seconds = 0;
    minutes = 0;

    rText.innerHTML = "RESTART";
    for (let i = 0; i < 9; i++) {
        rngArray[i] = RNG(6);
    }
    testDuplicate(rngArray);

    renderTable(rngDiv, rngArray);
    shuffleColor(playArray);
    renderTable(playDiv, playArray);

    moves = 0;
    movesDiv.innerHTML = "Moves: " + moves;

    timer = setInterval(timerMove, 1000);
    timer.clearInterval();

}
//checking win condition every click or keyboardPress
function checkWinCond(a, b) {
    if (JSON.stringify(a) === JSON.stringify(b)) {
        console.log("POBJEDA!");
        console.log("moves: " + moves);
        console.log("time: " + minutes + ":" + seconds);
        timer.clearInterval();
        return 1;
    }
}
//mouse controls
playTable.addEventListener("click", function (e) {
    if (e.target.style.backgroundColor != "black") {
        let a = parseInt(e.path[0].id.substr(1), 10);
        let t = 0;
        if (playArray[a - 5] == 6) {
            t = playArray[a - 5];
            playArray[a - 5] = playArray[a];
            playArray[a] = t;
            moves++;
        }
        if (playArray[a - 1] == 6) {
            t = playArray[a - 1];
            playArray[a - 1] = playArray[a];
            playArray[a] = t;
            moves++;
        }
        if (playArray[a + 1] == 6) {
            t = playArray[a + 1];
            playArray[a + 1] = playArray[a];
            playArray[a] = t;
            moves++;
        }
        if (playArray[a + 5] == 6) {
            t = playArray[a + 5];
            playArray[a + 5] = playArray[a];
            playArray[a] = t;
            moves++;
        }
        //rendering whole array since it isn't big array. Have to think of a way to only render those blocks that changed...
        renderTable(playDiv, playArray);

        //storing parts of playArray in checkArray so it is easier to check for win condition
        let checkArray = [playArray[6], playArray[7], playArray[8], playArray[11], playArray[12], playArray[13], playArray[16], playArray[17], playArray[18]];

        movesDiv.innerHTML = "Moves: " + moves;
        
        //checking win condition
        checkWinCond(checkArray, rngArray);
    }
});

//keyboard controls
document.onkeydown = function(e) {
    let p = playArray.indexOf(6);
    //gore
    if (e.keyCode == 38) {
        if (p > 4) {
            let t = playArray[p - 5];
            playArray[p - 5] = playArray[p];
            playArray[p] = t;
            moves++;
        }
    }
    //dolje
    if (e.keyCode == 40) {
        if (p < 20) {
            let t = playArray[p + 5];
            playArray[p + 5] = playArray[p];
            playArray[p] = t;
            moves++;
        }
    }
    //lijevo
    if (e.keyCode == 37) {
        if (p != 0 && p != 5 && p != 10 && p != 15 && p != 20) {
            let t = playArray[p - 1];
            playArray[p - 1] = playArray[p];
            playArray[p] = t;
            moves++;
        }
    }
    //desno
    if (e.keyCode == 39) {
        if (p != 4 && p != 9 && p != 14 && p != 19 && p != 24) {
            let t = playArray[p + 1];
            playArray[p + 1] = playArray[p];
            playArray[p] = t;
            moves++;
        }
    }
    renderTable(playDiv, playArray);

    movesDiv.innerHTML = "Moves: " + moves;

    let checkArray = [playArray[6], playArray[7], playArray[8], playArray[11], playArray[12], playArray[13], playArray[16], playArray[17], playArray[18]];

    checkWinCond(checkArray, rngArray);
}


//triban ubacit tajmer i brojač poteza