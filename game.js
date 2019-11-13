var rngArray = new Array(); rngArray = [8];
var colors = ["red", "blue", "white", "orange", "yellow", "green"];
var rngDiv = new Array(); rngDiv = [8];

window.onload = function () {
    for (let i = 0; i < 9; i++) {
        rngDiv[i] = document.getElementById("r" + i);
    }
}

function RNG(c) {
    return Math.floor((Math.random() * c));
}

function testDuplicate() {
    let t0 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0,
        t4 = 0,
        t5 = 0;
    for (let i = 0; i < 9; i++) {
        switch (rngArray[i]) {
            case 0:
                t0++;
                break;
            case 1:
                t1++;
                break;
            case 2:
                t2++;
                break;
            case 3:
                t3++;
                break;
            case 4:
                t4++;
                break;
            case 5:
                t5++;
                break;
        }
    }

    if (t0 > 4 || t1 > 4 || t2 > 4 || t3 > 4 || t4 > 4 || t5 > 4) {
        test();
    } else {
        return 0;
    }
}

function test() {
    for (let i = 0; i < 9; i++) {
        rngArray[i] = RNG(6);
    }
    testDuplicate();

    for (let i = 0; i < 9; i++) {
        rngDiv[i].style.backgroundColor = colors[rngArray[i]];
    }
}