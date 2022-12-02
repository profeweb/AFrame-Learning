let joc = new ArtMemo();

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#cards').setAttribute('cartes', 'informacio:assets/galeria.json; galeria:0; numero:9;');

    document.querySelector('#cards').addEventListener('emparellament', function (){
        joc.emparella();
    });

    document.querySelector('#cards').addEventListener('end', function (){
        joc.endGame();
    });

    document.querySelector('a-scene').addEventListener('nextGame', function (){
        joc.resetGame();
    });

});