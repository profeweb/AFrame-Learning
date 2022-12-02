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
        console.log("CARTA JA GIRADA");
        document.querySelector('#soError').emit('errorCarta');
    }

    girarCarta(idElement){
        this.girades.push(idElement);
        this.girs++;
        document.querySelector('#girs').setAttribute('value', this.girs);
        document.querySelector('#soClick').emit('clickCarta');
    }

    informar(){

        document.querySelector('#info1').setAttribute('visible', 'true');
        document.querySelector('#info2').setAttribute('visible', 'true');

        let idAsset = document.querySelector("#"+this.girades[this.girades.length-1]).getAttribute('data-asset');
        document.querySelector('#layer1').setAttribute('layer', 'src', '#'+idAsset);
        document.querySelector('#layer2').setAttribute('layer', 'src', '#'+idAsset);
        let textCarta = document.querySelector("#"+this.girades[this.girades.length-1]).getAttribute('data-text');
        document.querySelector('#text1').setAttribute('value', textCarta);
        document.querySelector('#text2').setAttribute('value', textCarta);
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

        document.querySelector('#info1').setAttribute('body', 'shape:box;');
        document.querySelector('#info2').setAttribute('body', 'shape:box;');
    }
}