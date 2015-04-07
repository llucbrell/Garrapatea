
//recorremos el array almacén traduciendo cada nota al lenguaje midi
//recordamos, hexadecimal en base64


function aMidi(arrayalmacen){

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
      case 'ritmo':
      //pintamos
      case 'clave':
      //pinta
     }


}
var fin=new MidiMessage("endTrack");
midisketch.setChunk();
console.log("endTrack");
track.addMessageToTrack(fin);//añadimos el mensaje que cierra
midisketch.addTrack(track);

}


function midiNota(objeto){
    var figura=objeto.duration;
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

    var nota=getMidiNoteNumber(objeto);//conseguimos el número de nota midi en decimal
    console.log("nota"+nota);
    var notaOn= new MidiMessage("noteOn",nota, "47");
    var notaOff= new MidiMessage("noteOff", nota, "00", delta);
    
    track.addMessageToTrack(notaOn);
    track.addMessageToTrack(notaOff);

}




