//class for color manipulation and basic functions like shuffle and RNG

function Coloring() {
    this.colors = ["#d61745", "#3569bc", "white", "#f4862a", "#eaed19", "#329f64", "black"];
    this.rngColorPlaces = [0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 4, 4, 4, 4, 2, 5, 5, 5, 5];
    this.playColorPlaces = [0, 0, 0, 0, 2, 1, 1, 1, 1, 2, 3, 3, 3, 3, 2, 4, 4, 4, 4, 2, 5, 5, 5, 5, 6];

    //basic whole number RNG function so i don't have to write it all the time
    this.RNG = function (c) {
        return Math.floor(Math.random() * c);
    };

    //shuffles elements of array in the same array, so i don't have to have more array
    this.shuffleColor = function (clrArr) {
        let m = clrArr.length;
        let t1, t2;
        while (m) {
            t1 = this.RNG(m--);
            t2 = clrArr[m];
            clrArr[m] = clrArr[t1];
            clrArr[t1] = t2
        }
        return clrArr;
    };

}