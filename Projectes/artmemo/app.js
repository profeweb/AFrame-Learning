
var girs = 0;
var parells = 0;
var startedTimer = false;

var girades = [];
var parells = [];


function emparellades(){
    let imgCarta1 = document.querySelector("#"+girades[0]).getAttribute('data-img');
    let imgCarta2 = document.querySelector("#"+girades[1]).getAttribute('data-img');
    return imgCarta1===imgCarta2;
}