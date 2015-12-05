//load all the mp3 audio for being ready for plaing 

function loadAudio(directorio){
 //creamos un objeto para cada nota, con su url
var context = new AudioContext();
var ruta;
if(directorio){
	ruta=directorio;
}
else{
	ruta = "libs/sonidosmin/";
}

 for(var i=48; i<91; i++){
    var pitch={midinotenumber: i, url: ruta + i +".mp3"};
  

        loadNote(pitch, pitch.url);
        arraymp3s.push(pitch);
//almacenamos los objetos en un array para luego llamarlos
 }





}


function loadNote(pitch, url){
    var request = new XMLHttpRequest();
		    request.open('GET', url, true);
		    request.responseType = 'arraybuffer';

		    request.onload = function() {
		        context.decodeAudioData(request.response, function(buffer) {
		            pitch.buffer = buffer;
		        });
		    }
		    request.send();
		//almacenamos los sonidos en el bufer
    }



function ejecutaNota(number){
        var object;
     for(var i=0; i<arraymp3s.length; i++){
        if (arraymp3s[i].midinotenumber==number){
            object=arraymp3s[i];
        	break;
        }
     }
        var s = context.createBufferSource();
        s.buffer = object.buffer;
        s.connect(context.destination);
        s.start(0);
        object.s = s;
    }