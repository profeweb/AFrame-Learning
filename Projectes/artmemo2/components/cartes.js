AFRAME.registerComponent('cartes', {
    schema: {
        informacio: {type: 'asset'},
        numero: {type: 'number'},
        galeria: {type:'number', default:0}
    },

    dependencies: ['carta'],

    init: function () {
        this.loader = new THREE.FileLoader();
    },

    update: function (oldData) {

        const data = this.data;
        if (AFRAME.utils.deepEqual(oldData, data)) {
            return;
        }
        if (data.informacio && data.informacio !== oldData.informacio) {
            this.loader.load(data.informacio, this.onDataLoaded.bind(this));
        }
    },

    onDataLoaded: function (file) {
        let galeries = JSON.parse(file);

        let numGaleries = galeries.length;
        let galeriaRand = Math.floor(Math.random()*numGaleries);
        //console.log(galeriaRand);
        galeriaRand= this.data.galeria;

        let galeria = galeries[galeriaRand];

        document.querySelector('#titol').setAttribute('value', galeria.tema);
        let cards = document.querySelector('#cards');

        let obres = galeria.pics;
        //obres.sort((a, b) => 0.5 - Math.random());

        let numCarta = 0;
        for(let t=0; t<2; t++) {
            for(let i=0; i<this.data.numero; i++){

                //console.log(obres[i].file);

                let imgObra = obres[i].file;
                let textObra = obres[i].titol;

                let entity = document.createElement('a-entity');
                entity.setAttribute('id', 'carta_'+numCarta)
                entity.setAttribute('class', 'card');
                entity.setAttribute('geometry', 'primitive:box; width:1; height:1.2; depth:0.25;');
                entity.setAttribute('scale', '0 0 0');
                entity.setAttribute('material', 'opacity:0.15');
                entity.setAttribute('carta', 'id:'+numCarta);
                entity.setAttribute('data-img', imgObra);
                entity.setAttribute('data-asset', 'obra'+(i+1));
                entity.setAttribute('data-text', textObra);
                entity.setAttribute('creix', 'start:true');
                entity.setAttribute('animation__girar', 'property:rotation; from:0 0 0; to:0 180 0; startEvents: girar');
                //entity.setAttribute('animation__creix', 'property:scale; from:0 0 0; to:1 1 1; dur:1000; startEvents: creix');
                entity.setAttribute('animation__desgirar1', 'property:rotation; from:0 180 0; to:0 0 0; startEvents: desgirar1; delay:3000');
                entity.setAttribute('animation__desgirar2', 'property:rotation; from:0 180 0; to:0 0 0; startEvents: desgirar2; delay:3000');

                let caraA = document.createElement('a-entity');
                caraA.setAttribute('class', 'cardA');
                caraA.setAttribute('geometry', 'primitive: box; height: 1.2; width: 1; depth:0.01');
                caraA.setAttribute('material', 'src:#texturaCarta');
                caraA.setAttribute('position', '0 0 0');
                entity.appendChild(caraA);


                let caraB = document.createElement('a-entity');
                caraB.setAttribute('class', 'cardB');
                caraB.setAttribute('geometry', 'primitive: box; height: 1.2; width: 1; depth:0.1');
                caraB.setAttribute('material', 'src: assets/imgs/'+imgObra);
                caraB.setAttribute('position', '0 0 -0.1');
                entity.appendChild(caraB);

                cards.appendChild(entity);

                numCarta++;
            }
        }

    }


});