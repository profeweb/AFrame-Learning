/**
 * Aferra entitat al punt d'intersecció del click.
 * `<a-entity intersection-spawn="mixin: box; material.color: red">` genera una entitat
 * `<a-entity mixin="box" material="color: red">` en el punt d'intersecció.
 */
AFRAME.registerComponent('intersection-spawn', {
    schema: {
        default: '',
        parse: AFRAME.utils.styleParser.parse
    },

    init: function () {
        const data = this.data;
        const el = this.el;

        el.addEventListener(data.event, evt => {

            // Crea l'entitat.
            const spawnEl = document.createElement('a-entity');

            // Estableix la posició en el punt d'intersecció.
            spawnEl.setAttribute('position', evt.detail.intersection.point);

            // Estableix components i propietats
            Object.keys(data).forEach(name => {
                if (name === 'event') { return; }
                AFRAME.utils.entity.setComponentProperty(spawnEl, name, data[name]);
            });

            // Afegeix l'entitat a l'escena.
            el.sceneEl.appendChild(spawnEl);
        });
    }
});