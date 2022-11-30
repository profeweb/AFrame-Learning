AFRAME.registerComponent('timer', {

    schema: {
        temps: {type:'number', default:100},
        start: {type:'boolean', default:false}
    },

    init: function () {

        var el = this.el;
        var data = this.data;

        el.setAttribute('value', this.data.temps);
        this.throttledFunction = AFRAME.utils.throttle(this.cadaSegon, 1000, this);

        el.addEventListener('start', function (){
            data.start = true;
        })
    },

    cadaSegon: function () {
        if(this.data.start && this.data.temps>0) {
            this.data.temps--;
            this.el.setAttribute('value', this.data.temps);
            if(this.data.temps==0){
                console.log("EMMIT END");
                this.el.emit('end');
            }
        }
    },

    tick: function (time, deltaTime) {
        this.throttledFunction();  // Cridada una vegada cada segon
    },

});