var rngArray = new Array(); rngArray = [8];
var rngDiv = new Array(); rngDiv = [8];

var playArray = new Array(); playArray = [24];
var playDiv = new Array(); playDiv = [24];

var colors = ["red", "blue", "white", "orange", "yellow", "green"];


window.onload = function () {
    for (let i = 0; i < 9; i++) {
        rngDiv[i] = document.getElementById("r" + i);
    }
    for (let i = 0; i < 25; i++) {
        playDiv[i] = document.getElementById("l" + i);
    }
}
function RNG(c) {
    return Math.floor((Math.random() * c));
}

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
                console.log(testHold);
            }
        }
        if (testHold > 4) {
            console.log("Opalio je");
            restart();

        } else {
            return 0;
        } 
    }
}

function restart() {
/*     for (let i = 0; i < 9; i++) {
        rngArray[i] = RNG(6);
    }

    testDuplicate(rngArray);

    for (let i = 0; i < 9; i++) {
        rngDiv[i].style.backgroundColor = colors[rngArray[i]];
    } */


    for (let i = 0; i < 24; i++) {
        playArray[i] = RNG(6);
    }

    testDuplicate(playArray);

    for (let i = 0; i < 24; i++) {
        playDiv[i].style.backgroundColor = colors[playArray[i]];
    }
}