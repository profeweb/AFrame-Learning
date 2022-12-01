AFRAME.registerComponent('carta', {

    schema: {
        id: {type:'number', default:0},
        girada: {type:'boolean', default:false}
    },

    init: function () {

        var el = this.el;
        var data = this.data;

        el.addEventListener('click', function(event){

            if(!endedGame && el.getAttribute('class')==='card' && girades.length<2) {

                let idElement = el.getAttribute('id');
                console.log("CLICK SOBRE CARTA "+idElement);

                if(!data.girada) {

                    el.emit('girar', {'id':data.id});
                    document.querySelector('#speaker').emit('playCarta');
                    console.log("EMET EVENT GIRAR");
                    data.girada = true;
                    girades.push(idElement);

                    girs++;
                    document.querySelector('#girs').setAttribute('value', girs);

                    document.querySelector('#info1').setAttribute('visible', 'true');
                    document.querySelector('#info2').setAttribute('visible', 'true');

                    let idAsset = document.querySelector("#"+girades[girades.length-1]).getAttribute('data-asset');
                    document.querySelector('#layer1').setAttribute('layer', 'src', '#'+idAsset);
                    document.querySelector('#layer2').setAttribute('layer', 'src', '#'+idAsset);
                    let textCarta = document.querySelector("#"+girades[girades.length-1]).getAttribute('data-text');
                    document.querySelector('#text1').setAttribute('value', textCarta);
                    document.querySelector('#text2').setAttribute('value', textCarta);

                    if(!startedTimer){
                        startedTimer = true;
                        console.log("EMIT START");
                        document.querySelector('[timer]').emit('start');
                    }

                    if(girades.length==2){

                        if(emparellades()) {
                            console.log("EMET EMPARELLAMENT");
                            parelles.push(girades[0]);
                            parelles.push(girades[1]);

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