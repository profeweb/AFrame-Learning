AFRAME.registerComponent('galeria', {
    schema: {
        informacio: {type: 'asset'},
        galeria:{type:'number', default:0}
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
        let galeriaNum = this.data.galeria;
        let galeria = galeries[galeriaNum];

        document.querySelector('#titol').setAttribute('value', galeria.tema);
        let assets = document.querySelector('a-assets');

        for (let obra of galeria.pics) {
            let entity = document.createElement('img');
            entity.setAttribute('id', 'obra'+obra.id);
            entity.setAttribute('class', 'obra');
            entity.setAttribute('src', 'assets/imgs/'+obra.file);
            assets.appendChild(entity);
        };

    }
});