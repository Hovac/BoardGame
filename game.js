//many global variables, will solve later
var rngArray = new Array();
rngArray = [8];
var rngDiv = new Array();
rngDiv = [8];

var playDiv = new Array();
playDiv = [24];
var playArray = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6]

var checkArray = [playArray[6], playArray[7], playArray[8], playArray[11], playArray[12], playArray[13], playArray[16], playArray[17], playArray[18]];

var colors = ["red", "blue", "white", "orange", "yellow", "green", "black"];
var playTable = document.getElementById("player_table");
//initializing div into arrays
window.onload = function () {
    for (let i = 0; i < 9; i++) {
        rngDiv[i] = document.getElementById("r" + i);
    }
    for (let i = 0; i < 25; i++) {
        playDiv[i] = document.getElementById("l" + i);
    }
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

//tests if there are 4 duplicates in an array. Currently only used in "check condition array" -> "CCA", since it must have equal chance to spawn 4 same colors but not more. If i used shuffle for the CCA, there wouldn't be equal distribution of the colours.
function testDuplicate(A) {
    let testArray = new Array;
    testArray = [A.length];
    for (let i = 0; i < A.length; i++) {
        testArray[i] = 0;
    }
    //always small arrays, can have quadratic time
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

// check condition playDiv [6,7,8,11,12,13,16,17,18]
function testCondition(playBoard, testBoard) {
    //check manually playBoard[6,7,8,11,12,13,16,17,18] against testBoard[0,1,2,3,4,5,6,7,8]
}

//self explanatory
function restart() {
    for (let i = 0; i < 9; i++) {
        rngArray[i] = RNG(6);
    }
    testDuplicate(rngArray);
    for (let i = 0; i < 9; i++) {
        rngDiv[i].style.backgroundColor = colors[rngArray[i]];
    }

    shuffleColor(playArray);

    for (let i = 0; i < 25; i++) {
        playDiv[i].style.backgroundColor = colors[playArray[i]];
    }
}

function checkCond(play, cond) {
    if (play == cond) {
        return 1;
    }
}

playTable.addEventListener("click", function (e) {
    if (e.target.style.backgroundColor != "black") {
        let a = parseInt(e.path[0].id.substr(1), 10);
        let t = 0;
        if (playArray[a - 5] == 6) {
            t = playArray[a - 5];
            playArray[a - 5] = playArray[a];
            playArray[a] = t;
        }
        if (playArray[a - 1] == 6) {
            t = playArray[a - 1];
            playArray[a - 1] = playArray[a];
            playArray[a] = t;
        }
        if (playArray[a + 1] == 6) {
            t = playArray[a + 1];
            playArray[a + 1] = playArray[a];
            playArray[a] = t;
        }
        if (playArray[a + 5] == 6) {
            t = playArray[a + 5];
            playArray[a + 5] = playArray[a];
            playArray[a] = t;
        }
        //bruteforce rendering whole array since it isn't big array
        for (let i = 0; i < 25; i++) {
            playDiv[i].style.backgroundColor = colors[playArray[i]];
        }
        checkArray = [playArray[6], playArray[7], playArray[8], playArray[11], playArray[12], playArray[13], playArray[16], playArray[17], playArray[18]];

        if (JSON.stringify(checkArray) === JSON.stringify(rngArray)) {
            console.log("POBJEDA!");
        }
    }
});

document.onkeydown = keyNav;

function keyNav(e) {
    let p = playArray.indexOf(6);
    //gore
    if (e.keyCode == 38) {
        if (p > 4) {
            let t = playArray[p - 5];
            playArray[p - 5] = playArray[p];
            playArray[p] = t;
        }
    }
    //dolje
    if (e.keyCode == 40) {
        if (p < 20) {
            let t = playArray[p + 5];
            playArray[p + 5] = playArray[p];
            playArray[p] = t;
        }
    }
    //lijevo
    if (e.keyCode == 37) {
        if (p != 0 && p != 5 && p != 10 && p != 15 && p != 20) {
            let t = playArray[p - 1];
            playArray[p - 1] = playArray[p];
            playArray[p] = t;
        }
    }
    //desno
    if (e.keyCode == 39) {
        if (p != 4 && p != 9 && p != 14 && p != 19 && p != 24) {
            let t = playArray[p + 1];
            playArray[p + 1] = playArray[p];
            playArray[p] = t;
        }
    }
    for (let i = 0; i < 25; i++) {
        playDiv[i].style.backgroundColor = colors[playArray[i]];
    }
    checkArray = [playArray[6], playArray[7], playArray[8], playArray[11], playArray[12], playArray[13], playArray[16], playArray[17], playArray[18]];

    if (JSON.stringify(checkArray) === JSON.stringify(rngArray)) {
        console.log("POBJEDA!");
    }
}