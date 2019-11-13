//many global variables, will solve later
var rngArray = new Array(); rngArray = [8];
var rngDiv = new Array(); rngDiv = [8];

var playDiv = new Array(); playDiv = [24];
var playArray = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6]

var colors = ["red", "blue", "white", "orange", "yellow", "green", "black"];

//initializing divs into arrays
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
//shuffles elements of array in the same array, so i don't have to have more array wooo XD
function shuffleColor(arr) {
    let m = arr.length, t1, t2;
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
    //always small arrays, can have quadratic time wooo
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
    //check manually playboard[6,7,8,11,12,13,16,17,18] against testboard[0,1,2,3,4,5,6,7,8]
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

    for (let i = 0; i< 25; i++) {
        playDiv[i].style.backgroundColor = colors[playArray[i]];
    }
}

document.addEventListener("click", changeTile);

function changeTile(e) {
    console.log(e.target.style.backgroundColor);
}