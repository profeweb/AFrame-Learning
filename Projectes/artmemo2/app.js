let joc = new ArtMemo();

document.addEventListener('DOMContentLoaded', function () {

    const scene = document.querySelector('a-scene');
    const cards = document.querySelector('#cards');
    const splash = document.querySelector('#splash');
    const loading = document.querySelector('#splash .loading');

    cards.setAttribute('cartes', 'informacio:assets/galeria.json; galeria:0; numero:9;');

    cards.addEventListener('emparellament', function (){
        joc.emparella();
    });

    cards.addEventListener('end', function (){
        joc.endGame();
    });

    scene.addEventListener('nextGame', function (){
        joc.resetGame();
    });

    scene.addEventListener('loaded', function (e) {
        setTimeout(() => {
            loading.style.display = 'none';
            splash.style.display = 'none';
        }, 50);
    });


});