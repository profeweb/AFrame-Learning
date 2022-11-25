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
        let galeria = galeries[0];
        console.log(galeria);

        document.querySelector('#titol').setAttribute('value', galeria.tema);
        /*
        for (let obra of obres) {
            let entity = document.createElement('a-entity');
            entity.setAttribute('geometry', 'primitive', obra['primitiva']);
            entity.setAttribute('position', obra['x']+" "+obra['y']+" "+obra['z']);
            entity.setAttribute('material', 'color', obra['color']);
            this.el.appendChild(entity);

            let info = document.createElement('a-text');
            info.setAttribute('value', obra['info']);
            info.setAttribute('color', 'black');
            info.setAttribute('align', 'center');
            info.setAttribute('position', "0 -1 0");
            entity.appendChild(info);

        };

         */
    }
});