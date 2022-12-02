class ArtMemo {

    constructor() {

        this.girs = 0;
        this.parells = 0;

        this.startedTimer = false;
        this.endedGame = false;

        this.girades = [];
        this.parelles = [];
    }

    iniciaJoc(){
        this.startedTimer = true;
        document.querySelector('[timer]').emit('start');
    }

    clickable(){
        return !joc.endedGame && joc.numCartesGirades()<2;
    }

    imatgeCartaGirada(i){
        return document.querySelector("#"+this.girades[i]).getAttribute('data-img');
    }

    cartesParells(){
        return this.imatgeCartaGirada(0)===this.imatgeCartaGirada(1);
    }

    cartaJaGirada(){
        document.querySelector('#soError').emit('errorCarta');
    }

    girarCarta(idElement){
        this.girades.push(idElement);
        this.girs++;
        document.querySelector('#girs').setAttribute('value', this.girs);
        document.querySelector('#soClick').emit('clickCarta');
    }

    getIdDarreraGirada(){
        return "#"+this.girades[this.girades.length-1];
    }

    informar(){
        let idAsset = "#" + document.querySelector(this.getIdDarreraGirada()).getAttribute('data-asset');
        let textCarta = document.querySelector(this.getIdDarreraGirada()).getAttribute('data-text');

        this.updateInfo("#info1", "#layer1", idAsset,"#text1", textCarta);
        this.updateInfo("#info2", "#layer2", idAsset,"#text2", textCarta);
    }

    updateInfo(idInfo, idLayer, idAsset, idText, textCarta){
        document.querySelector(idInfo).setAttribute('visible', 'true');
        document.querySelector(idLayer).setAttribute('layer', 'src', idAsset);
        document.querySelector(idText).setAttribute('value', textCarta);
    }

    desgirar(){
        document.querySelector('#soError').emit('errorCarta');
        document.querySelector("#"+this.girades[0]).emit('desgirar1', false);
        document.querySelector("#"+this.girades[1]).emit('desgirar2', false);
        this.girades = [];

        setTimeout( function() {
            document.querySelector('#soDesgirar').emit('desgirarCarta');
        }, 3000);
    }

    emparellament(){
        document.querySelector('#soParell').emit('parellCarta');
        this.parelles.push(this.girades[0]);
        this.parelles.push(this.girades[1]);

        document.querySelector('#cards').emit('emparellament', false);
        this.girades = [];
    }

    emparella(){
        console.log("EMPARALLATS");
        this.parells++;
        for(let c in this.parelles){
            let idCarta = "#"+this.parelles[c];
            document.querySelector(idCarta).setAttribute('outline', 'color:#64A3D3; pulse:false;');
        }
    }

    numCartesEmparellades(){
        return this.parells;
    }

    numCartesGirades(){
        return this.girades.length;
    }

    guanya(){
        document.querySelector('#cards').emit('guanya', false);
        document.querySelector('#soGuanya').emit('guanyaPartida');
        document.querySelector('[timer]').emit('stop');
    }

    endGame(){
        this.endedGame = true;
        document.querySelector('#soPerd').emit('perdPartida');

        document.querySelectorAll('[carta]').forEach(function(element, index, arr){
            element.setAttribute('body', 'shape:box;')
        });

        //document.querySelector('#info1').setAttribute('body', 'shape:box;');
        //document.querySelector('#info2').setAttribute('body', 'shape:box;');
        //document.querySelector('#hud').setAttribute('body', 'shape:box;');

        document.querySelector('#next').setAttribute('visible', 'true');
        document.querySelector('#botoNext').setAttribute('class', 'cardA');
        document.querySelector('#botoNext').setAttribute('click-next', '');
    }

    resetGame(){

        console.log("RESET GAME");

        this.girs = 0;
        this.parells = 0;

        this.startedTimer = false;
        this.endedGame = false;

        this.girades = [];
        this.parelles = [];


        var cardsContainer = document.querySelector('#cards');
        cardsContainer.removeAttribute('cartes');
        cardsContainer.removeAttribute('carta');
        cardsContainer.removeAttribute('body');
        cardsContainer.flushToDOM();

        document.querySelectorAll('.card').forEach(function(item, key, paren){
           item.parentNode.removeChild(item);
        });

        cardsContainer.setAttribute('position', '-3.8 1 -4');
        cardsContainer.setAttribute('rotation', '0 0 0');
        document.querySelector('#cards').setAttribute('cartes', 'informacio:assets/galeria.json; galeria:1; numero:9;');

        document.querySelector('#girs').setAttribute('value', this.girs);
        document.querySelector('[timer]').setAttribute('timer', 'temps:5; start:false;');
        document.querySelector('[timer]').setAttribute('value', '5');

        document.querySelector('#next').setAttribute('visible', 'false');
        document.querySelector('#botoNext').removeAttribute('class');




    }
}