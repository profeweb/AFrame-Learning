AFRAME.registerComponent('carta', {

    schema: {
        id: {type:'number', default:0},
        girada: {type:'boolean', default:false}
    },

    init: function () {

        var el = this.el;
        var data = this.data;

        el.addEventListener('click', function(event){

            if(joc.clickable() && el.getAttribute('class')==='card') {

                let idElement = el.getAttribute('id');

                if(!data.girada) {
                    data.girada = true;
                    el.emit('girar', {'id':data.id});

                    joc.girarCarta(idElement);
                    joc.informar();

                    if(!joc.startedTimer){
                        joc.iniciaJoc();
                    }

                    if(joc.numCartesGirades() == 2){

                        if(joc.cartesParells()) {
                            joc.emparellament();

                            if(joc.numCartesEmparellades() == 9){
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