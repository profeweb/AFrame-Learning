AFRAME.registerComponent('creix', {

    schema: {
        initValue: {type:'number', default:0},
        finalValue: {type:'number', default:100},
        amtValue:  {type:'number', default:0.1},
        start: {type:'boolean', default:false}
    },

    init: function () {
        this.currentValue = this.data.initValue;
    },

    update: function () {
        this.currentValue = this.data.initValue;
    },

    tick: function (time, deltaTime) {
        if(this.data.start && this.currentValue<1){
            this.currentValue+= this.data.amtValue;
            let scaleValue = this.currentValue+" "+this.currentValue+" "+this.currentValue;
            this.el.setAttribute('scale', scaleValue);
        }
    },

});