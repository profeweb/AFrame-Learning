
var girs = 0;
var parells = 0;
var startedTimer = false;
var endedGame = false;

var girades = [];
var parelles = [];


function emparellades(){
    let imgCarta1 = document.querySelector("#"+girades[0]).getAttribute('data-img');
    let imgCarta2 = document.querySelector("#"+girades[1]).getAttribute('data-img');
    return imgCarta1===imgCarta2;
}

function girarGirades(){
    for(let c in girades){
        let idCarta = "#"+girades[c];
        document.querySelector(idCarta).emit('desgirar', false);
    }
    girades = [];
}

function emparella(){
    console.log("EMPARALLATS");
    parells++;
    for(let c in parelles){
        let idCarta = "#"+parelles[c];
        //document.querySelector(idCarta).setAttribute('outline', 'color:red; pulse:true;');
    }
}

function endGame(){
    console.log("END GAME");
    endedGame = true;
    document.querySelectorAll('[carta]').forEach(function(element, index, arr){
        element.setAttribute('body', 'shape:box;')
    });
}