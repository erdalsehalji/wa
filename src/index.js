 let a1 = ["aa", "b1", "b1", "ce", "aa", "ce", "b1", "z"];

let novi_Objekt = {}
let reducer = function (novi, stari) {
    if(!novi[stari]) {
        novi[stari] = 1;
    }
    else {
        novi[stari] = novi[stari] + 1;
    }
    return novi
}

let brojac = a1.reduce(reducer, novi_Objekt);
console.log(brojac)
