AFRAME.registerComponent('carta', {

    schema: {
        id: {type:'number', default:0},
        girada: {type:'boolean', default:false}
    },

    init: function () {

        var el = this.el;
        var data = this.data;

        el.addEventListener('click', function(event){

            if(!joc.endedGame && el.getAttribute('class')==='card' && joc.cartesGirades()<2) {

                let idElement = el.getAttribute('id');
                console.log("CLICK SOBRE CARTA "+idElement);

                if(!data.girada) {

                    data.girada = true;
                    console.log("EMET EVENT GIRAR");
                    el.emit('girar', {'id':data.id});

                    joc.girar(idElement);
                    joc.informar();

                    if(!joc.startedTimer){
                        joc.iniciaJoc();
                    }

                    if(joc.cartesGirades() == 2){

                        if(joc.emparellades()) {
                            joc.emparellament();

                            if(joc.cartesEmparellades() == 9){
                                joc.guanya();
                            }
                        }
                        else {
                            joc.desgirar();
                        }
                    }
                }
                else {
                    joc.cartaJaGirada();
                }
            }
        });

        el.addEventListener('desgirar1', function (){
            data.girada = false;
        });

        el.addEventListener('desgirar2', function (){
            data.girada = false;
        });

    },

});