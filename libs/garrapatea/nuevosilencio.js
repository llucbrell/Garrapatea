

function nuevoSilencio(compasid){
var figura;
var direccionplica= 1;   
var nota="b/4";
var dotchecked;
//selección del compás

var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás



//comprobamos la duración que tiene la nota y le damos valor

figura=document.querySelector('input[name="notas"]:checked').value;

//checkeador de puntillos
dotchecked=document.getElementById("puntillo").checked;


//obtenemos el nombre de la nota
dibujaSilencio(figura);


//creamos y almacenamos el objeto si tiene puntillo o si no...
if(dotchecked===true){
  var Obsilencio={nombre:"silencio", keys:nota, duration:figura, stem_direction:direccionplica, type:"r", dot:1};
almacena(Obsilencio, compasid);
}
else{
var Obsilencio={nombre:"silencio", keys:nota, duration:figura, stem_direction:direccionplica, type:"r"};
almacena(Obsilencio, compasid);
}


 



function dibujaSilencio(figura){

if(dotchecked===true){
var notes = [  new Vex.Flow.StaveNote({ keys: [nota], stem_direction: direccionplica, duration: figura,  type: "r" }).addDotToAll(),];
}
else{
var notes = [  new Vex.Flow.StaveNote({ keys: [nota], stem_direction: direccionplica, duration: figura,  type: "r" }),];
}

// Create a voice in 4/4 AQUÍ INTRODUCIMOS LA FUNCION DEL COMPAS..

//puede que funcione añadir voces para realizar los acordes de manera sencilla

  var voice = new Vex.Flow.Voice({
    num_beats: 1,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });

  // Add notes to voice
  voice.setMode(Vex.Flow.Voice.Mode.SOFT);//funciona con menos notas en el compás, no es estricto.
  voice.addTickables(notes);


  
//interfaz de pintado de plicas y barrado de corcheas etc, funciona con un mínimo de notas
//usaremos beam sólo con corcheas y otras
//var beam = new Vex.Flow.Beam(notes); 



  // Format and justify the notes to 500 pixels
  var formatter = new Vex.Flow.Formatter().
    joinVoices([voice]).format([voice], 300);

  // Render voice
 
 voice.draw(ctxsel, stavesel);

//renderizado, mostrado de plicas en 
// beam.setContext(ctx).draw();


}

//**************************

//NOS FALTA AÑADIR EL ALMACÉN DE NOTAS******/

}
