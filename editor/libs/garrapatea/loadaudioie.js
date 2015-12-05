//load all the mp3 audio for being ready for plaing 

//carga el audioHTML si está soportado por el navegador

function bypassAudio(directorio){
 //creamos un objeto para cada nota, con su url

var ruta;

if(directorio){
	ruta=directorio;
}
else{
	ruta = "libs/sonidosmin/";
	  console.log("holamed");
}

//cargamos las notas justas, para dar un soporte mínimo de momento
for(var i=48; i<91; i++){
    var pitch={midinotenumber: i, url: ruta + i +".mp3"};
  

        loadHTMLnote(pitch, pitch.url, i);
        arraymp3s.push(pitch);
//almacenamos los objetos en un array para luego llamarlos
 }

}



function loadHTMLnote(pitch, url){
 // console.log("holafin");
   // $("#audio").append("<audio id=\"a"+pitch.midinotenumber+ "\"" + "src=\""+pitch.url+ "\""+"></audio>");
    var audiotag= document.getElementById("audio");
    var mp3note= document.createElement("audio");
    mp3note.id= "a"+ pitch.midinotenumber;
    mp3note.src= pitch.url;
    audiotag.appendChild(mp3note);
//construimos los html audio tags para su reproducción
    }



 function ejecutaNotaHTML(number){
 //conseguiomos el id      
      var tagid= "a"+number;
      //conseguimos el objeto
      var  notaHTML= document.getElementById(tagid);
      console.log("nota"+number);
      notaHTML.play();
    }   