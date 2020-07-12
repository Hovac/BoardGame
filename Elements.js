//class for element manipulation

function Elements() {
    this.playTable = document.getElementById("player-table");
    this.rText = document.getElementById("restart-text");
    this.movesDiv = document.getElementById("moves");
    this.timerDiv = document.getElementById("timer");
    this.winScreen = document.getElementById("win-screen");
    this.winMoves = document.getElementById("win-moves");
    this.winTime = document.getElementById("win-time");
    this.rngDiv = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.playDiv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];

    this.winString = "";

    //renders the blocks
    this.renderTable = function (blocks, colorPlace) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundColor = colors[colorPlace[i]];
        }
    };

    this.timerWrite = function (m, s) {
        let tempMin = "";
        let tempSec = "";
        (m < 10) ? tempMin = "0" + m: tempMin = m;
        (s < 10) ? tempSec = "0" + s: tempSec = s;
        this.winString = "Time: " + tempMin + ":" + tempSec;
        this.timerDiv.innerHTML = this.winString;
    };

    this.timerRestart = function () {
        this.timerDiv.innerHTML = "Time: 00:00";
    }

    this.setArrayCondition = function (arr, playArray) {
        let tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let j = 0;
        if (playArray) {
            for (let i = 6; i < arr.length - 5; i += (i % 5 == 3) ? 3 : 1) {
                tempArray[j] = arr[i];
                j++;
            }
        } else {
            for (let i = 0; i < 9; i++) {
                tempArray[i] = arr[i];
            }
        }
        return tempArray;
    }
}