

function nuevaNota(canvas_y, compasid){
var nota;
var figura;
var direccionplica= 1;    

//selección del compás

var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás



//comprobamos la duración que tiene la nota y le damos valor

figura=document.querySelector('input[name="notas"]:checked').value;




//obtenemos el nombre de la nota
alturaNota(canvas_y);
dibujaNota(nota, figura);

var Obnota={nombre:"nota", keys:nota, duration:figura, stem_direction:direccionplica};
almacena(Obnota, compasid);

//recuerda transformar las notas a otra clave cuando no sea la clave de sol
//la que ha sido marcada 
//de momento utilizaremos sólo las notas en clave de sol



 
function alturaNota(canvas_y){ 

  //un pentagrama sencillo. Hay que mejorarlo con el pentagrama de piano


  //tesitura aguda
if( canvas_y > 25 && canvas_y <32){
  return nota="e/6", direccionplica= -1;
}
if( canvas_y > 32 && canvas_y <38){
  return nota="d/6", direccionplica= -1;
}
if( canvas_y > 38 && canvas_y <45){
  return nota="c/6", direccionplica= -1;
}
if( canvas_y > 45 && canvas_y <49){
  return nota="b/5", direccionplica= -1;
}
if( canvas_y > 49 && canvas_y <54){
  return nota="a/5", direccionplica= -1;
}
if( canvas_y > 54 && canvas_y <59){
  return nota="g/5", direccionplica= -1;
}
if ( canvas_y > 59 && canvas_y< 64){
 return nota="f/5", direccionplica= -1;
}
if ( canvas_y > 64 && canvas_y< 69){
 return nota="e/5", direccionplica= -1;
}
if ( canvas_y > 69 && canvas_y< 74){
 return nota="d/5", direccionplica= -1;
}
if ( canvas_y > 74 && canvas_y< 79){
 return nota="c/5", direccionplica= -1;
}
//tesitura media
if ( canvas_y > 79 && canvas_y< 84){
 return nota="b/4", direccionplica= -1;
}
if ( canvas_y > 84 && canvas_y< 89){
 return nota="a/4";
}
if ( canvas_y > 89 && canvas_y< 94){
 return nota="g/4";
}
if ( canvas_y > 94 && canvas_y< 99){
 return nota="f/4";
}
if ( canvas_y > 99 && canvas_y< 104){
 return nota="e/4";
}
if ( canvas_y > 104 && canvas_y< 109){
 return nota="d/4";
}
if ( canvas_y > 109 && canvas_y< 114){
 return nota="c/4";
}
//tesitura grave
if ( canvas_y > 114 && canvas_y< 119){
 return nota="b/3";
}
if ( canvas_y > 124 && canvas_y< 129){
 return nota="a/3";
}
if ( canvas_y > 129 && canvas_y< 134){
 return nota="g/3";
}
if ( canvas_y > 134 && canvas_y< 139){
 return nota="f/3";
}
if ( canvas_y > 139 && canvas_y< 144){
 return nota="e/3";
}
//PODEMOS CREAR UN OBJETO con el nombre del compasid y la nota o elemento
//dentro del mismo y lo almacenamos en un array
//luego, lo primero que haríamos al ejecutar cualquier función, sería ver 
//si hay algo dentro
}



function dibujaNota(nota, figura){


var notes = [  new Vex.Flow.StaveNote({ keys: [nota], stem_direction: direccionplica, duration: figura }),];



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
