AFRAME.registerComponent('galeria', {
    schema: {
        informacio: {type: 'asset'}
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
        console.log(numGaleries);

        let galeria = galeries[0];
        console.log(galeria);

        document.querySelector('#titol').setAttribute('value', galeria.tema);
        let assets = document.querySelector('a-assets');

        for (let obra of galeria.pics) {
            // <img id="texturaCarta" src="assets/cartaTextura.png"/>
            let entity = document.createElement('img');
            entity.setAttribute('id', obra.id);
            entity.setAttribute('src', 'assets/imgs/'+obra.file);
            assets.appendChild(entity);
        };

    }
});