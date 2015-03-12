//this is the sound interface // es la interfaz de sonido


function playNote(Obnota, SoundChecked){

	if(SoundChecked== false){
       return console.log("the sound is off");
	}
	//the sound is off
	else{
    var midinote= getMidiNoteNumber(Obnota);
     // the MIDI note... aquí llamamos al reproductor
       ejecutaNota(midinote);
        }

     }      








function getMidiNoteNumber(Obnota){
	//obtenemos el nombre de la nota en la clave de sol
	var solclefnote= Obnota.keys;
    //console.log(solclefnote[0]);
    var notaname=solclefnote[0];
    //miramos la tesitura y el nombre de manera independiente
    var notates= parseInt(solclefnote[2]);
    var arraynombres=["c","#","d","#","e","f","#","g","#","a","#","b"];
    //recorremos el array de notas hasta encontrar el nombre
    var numbernote;
    for(var i=0; i<arraynombres.length; i++){
         if (notaname==arraynombres[i]){
         	
            numbernote=i;
         	break;
         }
    }
    //now its in the midi numbercodification, but in the middles 

    numbernote= numbernote+60;

    //test the range-- miramos la tesitura

    if(notates<4){
    	numbernote= numbernote-12;
    }
    if(notates==5){
    	numbernote= numbernote+12;
    }
    if (notates==6) {
        numbernote= numbernote+24;
    }
    if(Obnota.alteracion=="#"){numbernote+=1};
    if(Obnota.alteracion=="##"){numbernote+=2};
    if(Obnota.alteracion=="b"){numbernote-=1};
    if(Obnota.alteracion=="bb"){numbernote-=2};
    //aún falta implementar la posibilidad de que haya
    //una armadura antes de la nota a ejecutar
console.log(numbernote);
  return numbernote;

}
