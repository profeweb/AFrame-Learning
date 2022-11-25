AFRAME.registerComponent('cartes', {
    schema: {
        informacio: {type: 'asset'},
        numero: {type: 'number'}
    },

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
        galeriaRand=0;

        let galeria = galeries[galeriaRand];

        document.querySelector('#titol').setAttribute('value', galeria.tema);
        let cards = document.querySelector('#cards');

        let obres = galeria.pics;
        obres.sort((a, b) => 0.5 - Math.random());

        for(let t=0; t<2; t++) {

        for(let i=0; i<this.data.numero; i++){

            console.log(obres[i].file);

            let imgObra = obres[i].file;


                let entity = document.createElement('a-entity');
                entity.setAttribute('class', 'card');
                entity.setAttribute('animation', 'property:rotation; from:0 0 0; to:0 180 0; startEvents: click');

                let caraA = document.createElement('a-entity');
                caraA.setAttribute('class', 'cardA');
                caraA.setAttribute('geometry', 'primitive: box; height: 1.2; width: 1; depth:0.1');
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
            }
        }

    }


});