
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

midisketch= new MidiObject();
track= new MidiTrack();
//recorremos el array almacén

//OJO SI ENCOTRAMOS ARRAY DENTRO, NO LO LEE
//don't read if there is an array inside arrayalmacen[i]
for (var i=0; i<arrayalmacen.length; i++){
  if(Array.isArray(arrayalmacen[i])){
      midiArray(arrayalmacen[i]);
  }
  else{


   switch (arrayalmacen[i] && arrayalmacen[i].nombre) {
      case 'nota':
        //enviamos el objeto al respectivo traductor
        midiNota(arrayalmacen[i]);
        //almacenamos el id
        lastId=i;
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

}


function midiNota(objeto){
    var figura=objeto.duration;
    var deltasil="04";
    var channel="01";
   // var delta;


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
//si había un silencio antes usamos el delta de noteOn para dejar un tiempo el
//reproductor sin sonar
    if(silencio===true){
      deltasil=figurasilencio;
      silencio=false;
    }
    


    var nota=getMidiNoteNumber(objeto);//conseguimos el número de nota midi en decimal
    console.log("nota"+nota);
    var notaOn= new MidiMessage("noteOn",nota, "47", deltasil, channel);
    var notaOff= new MidiMessage("noteOff", nota, "00", delta, channel);
    
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

function midiArray(objetarray){
  
//array para plifonía
var notasmidipoli=[];
//  var figuraspolifonia=[];
  //var ok=false;
   //console.log("ARRAY"+objetarray);
for (var i=0; i<objetarray.length; i++){
   switch (objetarray[i] && objetarray[i].nombre) {
      case 'nota':
        //enviamos el objeto al respectivo traductor
        notasmidipoli.push(objetarray[i]);

        break;
      case 'silencio':
      //almacenamos el silencio
      // retirado de momento//  midiSilencio(objetarray[i]);
      case 'ritmo':
      //pintamos
      case 'clave':
      //pinta
     }




}
if(notasmidipoli[1]){polifonia(notasmidipoli)};


}
//la polifonía en midi se sustenta en el uso de dos notas on  seguidas de sus respectivas
//notasOFF
function polifonia(notasmidi){
   var mensajes=[];
   var len=notasmidi.length;
    for (var t=0; t<len; t++){
    
    var figura=notasmidi[t].duration;
    var deltasil="00";
    var channel="01";
   
   // var delta;
  if (t===0){
    deltasil="04";
  }

    //comprobamos la duración de los objetos nota, del almacen
    console.log("dur"+notasmidi[t].duration);

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
    if(notasmidi[t].dot===1){
      var dur=parseInt(delta, 16);
      var deltadecimal=dur+(dur/2);
      delta= deltadecimal.toString(16);
    }
//si había un silencio antes usamos el delta de noteOn para dejar un tiempo el
//reproductor sin sonar
    if(silencio===true){
      deltasil=figurasilencio;
      silencio=false;
    }
    

console.log("NOTAON");

    var nota=getMidiNoteNumber(notasmidi[t]);//conseguimos el número de nota midi en decimal
    
    var notaOnPol= new MidiMessage("noteOn", nota, "47", deltasil, channel);
   
   
    mensajes.push(notaOnPol);
   
}

//recorremos de nuevo el array para esta vez añadir los mensajes noteOff
for (var t=0; t<len; t++){
  
    var figura=notasmidi[t].duration;
    var deltasil="00";
    var channel="01";
   
   // var delta;


    //comprobamos la duración de los objetos nota, del almacen
    console.log("dur"+notasmidi[t].duration);

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
    if(notasmidi[t].dot===1){
      var dur=parseInt(delta, 16);
      var deltadecimal=dur+(dur/2);
      delta= deltadecimal.toString(16);
    }
//si había un silencio antes usamos el delta de noteOn para dejar un tiempo el
//reproductor sin sonar
    if(silencio===true){
      deltasil=figurasilencio;
      silencio=false;
    }
    

    if(t!==0){
      delta="00";
    }

console.log("NOTAOFF");

    var nota=getMidiNoteNumber(notasmidi[t]);//conseguimos el número de nota midi en decimal
    var notaOffPol= new MidiMessage("noteOff", nota, "00", delta, channel);
   
   
    mensajes.push(notaOffPol);
   
}

console.log("llegamos AQUIIIIII");
console.log("MENSAJES", mensajes);

    for(var w=0; w<mensajes.length; w++){
       
       track.addMessageToTrack(mensajes[w]);

    }

}




//completamos el midiobjeto, dandole el formato correcto
var fin=new MidiMessage("endTrack");
midisketch.setChunk();
console.log("endTrack");
track.addMessageToTrack(fin);//añadimos el mensaje que cierra
midisketch.addTrack(track);
var texto= MidiSketch("write", midisketch);
console.log("texto"+texto);//escribimos midisketch
var preview= document.getElementById("miditexto");
preview.innerHTML=texto;
//se envía el hexadecimal para ser descargado
descargaMidi(texto);
}




