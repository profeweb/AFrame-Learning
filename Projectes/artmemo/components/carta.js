AFRAME.registerComponent('carta', {

    schema: {
        id: {type:'number', default:0},
        girada: {type:'boolean', default:false}
    },

    init: function () {

        var el = this.el;
        var data = this.data;

        el.addEventListener('click', function(event){

            if(el.getAttribute('class')==='card' && girades.length<2) {

                let idElement = el.getAttribute('id');
                console.log("CLICK SOBRE CARTA "+idElement);

                if(!data.girada) {

                    el.emit('girar', {'id':data.id});
                    console.log("EMET EVENT GIRAR");
                    data.girada = true;
                    girs++;
                    document.querySelector('#girs').setAttribute('value', girs);
                    girades.push(idElement);
                    if(!startedTimer){
                        startedTimer = true;
                        console.log("EMIT START");
                        document.querySelector('[timer]').emit('start');
                    }

                    if(girades.length==2){

                        let punt = emparellades();
                        if(punt) {
                            console.log("EMET EMPARELLAMENT");
                            document.querySelector('#cards').emit('emparellament', false);
                            girades = [];
                            if(parells == 9){
                                document.querySelector('#cards').emit('guanya', false);
                            }
                        }
                        else {
                            console.log("EMET DESGIRAR");
                            document.querySelector('#cards').emit('desgirar', false);
                        }
                    }
                }
                else {
                    console.log("CARTA JA GIRADA");
                }
            }
        });

        el.addEventListener('desgirar', function (){
            data.girada = false;
        });

    },

});