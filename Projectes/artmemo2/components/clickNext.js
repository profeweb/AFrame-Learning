AFRAME.registerComponent("click-next", {

    init: function() {

        var el = this.el;

        this.el.addEventListener("click", function(e) {
            el.emit('nextGame');
        });

        this.el.addEventListener("mouseenter", function(e) {
            el.setAttribute('scale', {x: 1.2, y: 1.2, z: 1.2});
        });

        this.el.addEventListener("mouseleave", function(e) {
            el.setAttribute('scale', {x: 1, y: 1, z: 1});
        });

    }

});