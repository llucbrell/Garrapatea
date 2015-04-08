
//recorremos el array almacén traduciendo cada nota al lenguaje midi
//recordamos, hexadecimal en base64


function aMidi(arrayalmacen){
//variables que nos ayudan en la construcción de los mensajes midi
var silencio=false;
var figurasilencio;


//comprobamos que se pase el argumento almacen
if (!arrayalmacen){
  alert("There is no possible midi translate");
  throw console.log("no objects placed on to the sheet");
}



//recorremos el array almacén
for (var i=0; i<arrayalmacen.length; i++){
   switch (arrayalmacen[i] && arrayalmacen[i].nombre) {
      case 'nota':
        //enviamos el objeto al respectivo traductor
        midiNota(arrayalmacen[i]);
        break;
      case 'silencio':
      //almacenamos el silencio
        midiSilencio(arrayalmacen[i]);
      case 'ritmo':
      //pintamos
      case 'clave':
      //pinta
     }


}


function midiNota(objeto){
    var figura=objeto.duration;
    var deltasil="02";
    //comprobamos la duración de los objetos nota, del almacen
    console.log("dur"+objeto.duration);

    if (figura==="1"){delta="80"};
    if (figura==="2"){delta="40"};
    if (figura==="4"){delta="20"};
    if (figura==="8"){delta="10"};
    if (figura==="16"){delta="08"};
    if (figura==="32"){delta="04"};
    if (figura==="64"){delta="02"};
    if (figura==="128"){delta="01"};

//para quando usemos tresillo
   //  if(objeto.tresillo===1){delta=(parseInt(delta)*2)/3};
//puntillo
    if(objeto.dot===1){
      var dur=parseInt(delta, 16);
      var deltadecimal=dur+(dur/2);
      delta= deltadecimal.toString(16);
    }

    if(silencio===true){
      deltasil=figurasilencio;
      silencio=false;
    }

    var nota=getMidiNoteNumber(objeto);//conseguimos el número de nota midi en decimal
    console.log("nota"+nota);
    var notaOn= new MidiMessage("noteOn",nota, "47", deltasil);
    var notaOff= new MidiMessage("noteOff", nota, "00", delta);
    
    track.addMessageToTrack(notaOn);
    track.addMessageToTrack(notaOff);

}

function midiSilencio(objeto){
   silencio=true;
//marcamos un silencio con true
   var figur=objeto.duration;
   
   //variables para el cálculo del delta

    if (figur==="1"){figurasilencio="80"};
    if (figur==="2"){figurasilencio="40"};
    if (figur==="4"){figurasilencio="20"};
    if (figur==="8"){figurasilencio="10"};
    if (figur==="16"){figurasilencio="08"};
    if (figur==="32"){figurasilencio="04"};
    if (figur==="64"){figurasilencio="02"};
    if (figur==="128"){figurasilencio="01"};

//realizamos la misma operación para calcular el delta del silencio con puntillo
    if(objeto.dot===1){
      var duri=parseInt(delta, 16);
      var duridecimal=dur+(dur/2);
      figurasilencio= duridecimal.toString(16);
    }



}




//completamos el midiobjeto, dandole el formato correcto
var fin=new MidiMessage("endTrack");
midisketch.setChunk();
console.log("endTrack");
track.addMessageToTrack(fin);//añadimos el mensaje que cierra
midisketch.addTrack(track);

}




