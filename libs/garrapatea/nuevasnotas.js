
function nuevaNota(canvas_y, compasid){
var nota;
var figura;
var direccionplica= 1;    
var nota2="g/4";
var arraynotas=[];
//selección del compás

var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás



//comprobamos la duración que tiene la nota y le damos valor

figura=document.querySelector('input[name="notas"]:checked').value;



//obtenemos el nombre de la nota


if (figura==="8"){
     var indice=compasid.slice(1);
     var i= indice-1;
     
     if(almacen[i] && almacen[i].duration==="8"){

      arraynotas[0]=almacen[i].keys;
      alturaNota(canvas_y);
      
          if(+almacen[i].arri%2===0){
             i=i-1;
             var segundanota= almacen[i].keys;
             arraynotas[1]=segundanota;
             var resto=0;
             arraynotas[2]=nota;
             //arraynotas.push(nota);

             for(j in arraynotas){
             dibujalatres(arraynotas, i, figura, resto);
             resto= resto +37;
             i=i+1;
            // dibujalatres(arraynotas, i, figura, resto);
             }
           
              
            }
          else{  
      //probamos de momento sólo con dos
           arraynotas.push(nota);
           dibujaGrupo2Corcheas(arraynotas, i, figura);
            }

      



     

      }


      else{
        alturaNota(canvas_y);
       dibujaNota(nota, figura);

      var Obnota={nombre:"nota", arri:1, keys:nota, duration:figura, stem_direction:direccionplica};
      almacena(Obnota, compasid);

      }

}
else{
  alturaNota(canvas_y);
  dibujaNota(nota, figura)

var Obnota={nombre:"nota", keys:nota, duration:figura, stem_direction:direccionplica};
almacena(Obnota, compasid);
}
//recuerda transformar las notas a otra clave cuando no sea la clave de sol
//la que ha sido marcada 
//de momento utilizaremos sólo las notas en clave de sol



 
function alturaNota(canvas_y){ 

  //un pentagrama sencillo. Hay que mejorarlo con el pentagrama de piano


  //tesitura aguda
if( canvas_y > 25 && canvas_y <32){
  return nota="e/6", direccionplica= -1;
}
if( canvas_y > 31 && canvas_y <38){
  return nota="d/6", direccionplica= -1;
}
if( canvas_y > 37 && canvas_y <45){
  return nota="c/6", direccionplica= -1;
}
if( canvas_y > 44 && canvas_y <49){
  return nota="b/5", direccionplica= -1;
}
if( canvas_y > 48 && canvas_y <54){
  return nota="a/5", direccionplica= -1;
}
if( canvas_y > 53 && canvas_y <59){
  return nota="g/5", direccionplica= -1;
}
if ( canvas_y > 58 && canvas_y< 64){
 return nota="f/5", direccionplica= -1;
}
if ( canvas_y > 63 && canvas_y< 69){
 return nota="e/5", direccionplica= -1;
}
if ( canvas_y > 68 && canvas_y< 74){
 return nota="d/5", direccionplica= -1;
}
if ( canvas_y > 73 && canvas_y< 79){
 return nota="c/5", direccionplica= -1;
}
//tesitura media
if ( canvas_y > 78 && canvas_y< 84){
 return nota="b/4", direccionplica= -1;
}
if ( canvas_y > 83 && canvas_y< 89){
 return nota="a/4";
}
if ( canvas_y > 88 && canvas_y< 94){
 return nota="g/4";
}
if ( canvas_y > 93 && canvas_y< 99){
 return nota="f/4";
}
if ( canvas_y > 98 && canvas_y< 104){
 return nota="e/4";
}
if ( canvas_y > 103 && canvas_y< 109){
 return nota="d/4";
}
if ( canvas_y > 108 && canvas_y< 114){
 return nota="c/4";
}
//tesitura grave
if ( canvas_y > 113 && canvas_y< 119){
 return nota="b/3";
}
if ( canvas_y > 118 && canvas_y< 124){
 return nota="a/3";
}
if ( canvas_y > 123 && canvas_y< 129){
 return nota="g/3";
}
if ( canvas_y > 128 && canvas_y< 134){
 return nota="f/3";
}
if ( canvas_y >  133 && canvas_y< 139){
 return nota="e/3";
}
if ( canvas_y >  132 && canvas_y< 138){
 return nota="d/3";
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

function dibujaGrupo2Corcheas(arraynotas, indice, figura){
//borramos la nota anterior
var compasid= "c" + indice; 
var canvas = document.getElementById(compasid);
var ctx = canvas.getContext('2d');
redibujaCanvas(compasid, ctx);
var Obnota={nombre:"nota", keys:arraynotas[0], duration:figura, stem_direction:direccionplica};
      almacena(Obnota, compasid);

 //seleccionamos el primer compás
var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás


var notes = [  new Vex.Flow.StaveNote({ keys: [arraynotas[0]], stem_direction: direccionplica, duration: figura }), new Vex.Flow.StaveNote({ keys: [arraynotas[1]], stem_direction: direccionplica, duration: figura }),];



  // Create a voice in 4/4
  var voice = new Vex.Flow.Voice({
    num_beats: 1,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });

  // Add notes to voice
  voice.setMode(Vex.Flow.Voice.Mode.SOFT);//funciona con menos notas en el compás, no es estricto.
  voice.addTickables(notes);


//interfaz de pintado de plicas y barrado de corcheas etc, funciona con un mínimo de notas

var beam = new Vex.Flow.Beam(notes);


  // Format and justify the notes to 500 pixels
  var formatter = new Vex.Flow.Formatter().
    joinVoices([voice]).format([voice], 71);

  // Render voice
 
 voice.draw(ctxsel, stavesel);

//renderizado, mostrado de plicas en 
 beam.setContext(ctxsel).draw();

dibujalados(arraynotas, indice, figura);


}


function dibuja2Notas(nota, nota2, compasid, figura){
  
  //seleccionamos el primer compás
var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás







  //añadimos las notas

var notes = [  new Vex.Flow.StaveNote({ keys: [nota], stem_direction: direccionplica, duration: figura }), new Vex.Flow.StaveNote({ keys: [nota2], stem_direction: direccionplica, duration: figura }),];


  //dibujamos


  // Create a voice in 4/4
  var voice = new Vex.Flow.Voice({
    num_beats: 1,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });

  // Add notes to voice
  voice.setMode(Vex.Flow.Voice.Mode.SOFT);//funciona con menos notas en el compás, no es estricto.
  voice.addTickables(notes);


//interfaz de pintado de plicas y barrado de corcheas etc, funciona con un mínimo de notas

var beam = new Vex.Flow.Beam(notes);


  // Format and justify the notes to 500 pixels
  var formatter = new Vex.Flow.Formatter().
    joinVoices([voice]).format([voice], 71);

  // Render voice
 
 voice.draw(ctxsel, stavesel);

//renderizado, mostrado de plicas en 
 beam.setContext(ctxsel).draw();

dibujalados(nota, nota2, compasid, figura);



}

function dibujalados(arraynotas, compasid, figura){
  //seleccionamos el segundo compas


//var indice=compasid.slice(1);
//var i= (+indice+1);
var i= compasid+1;
var compasid2= "c"+i;
var Obnota={nombre:"nota", keys:arraynotas[1], arri:2, duration:figura, stem_direction:direccionplica};
almacena(Obnota, compasid2);
var canvas2 = document.getElementById(compasid2);
var renderer2 = new Vex.Flow.Renderer(canvas2, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel2 = renderer2.getContext();
var stavesel2 = new Vex.Flow.Stave(valinivexstave-37,valaltvexstave, valfinvexstave);
  

  //añadimos las notas

var notes2 = [  new Vex.Flow.StaveNote({ keys: [arraynotas[0]],stem_direction: direccionplica, duration: figura }), new Vex.Flow.StaveNote({ keys: [arraynotas[1]], stem_direction: direccionplica, duration: figura }),];


  //dibujamos


  
  var voice = new Vex.Flow.Voice({
    num_beats: 1,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });


  voice.setMode(Vex.Flow.Voice.Mode.SOFT);//funciona con menos notas en el compás, no es estricto.
  voice.addTickables(notes2);


//interfaz de pintado de plicas y barrado de corcheas etc, funciona con un mínimo de notas

var beam2 = new Vex.Flow.Beam(notes2);


  // Format and justify the notes to 500 pixels
  var formatter = new Vex.Flow.Formatter().
    joinVoices([voice]).format([voice], 71);

  // Render voice
 
 voice.draw(ctxsel2, stavesel2);

//renderizado, mostrado de plicas en 
 beam2.setContext(ctxsel2).draw();

}



function dibujalatres(arraynotas, indice, figura, resto){
  //seleccionamos el segundo compas
var compasid= "c" + indice; 

var canvas = document.getElementById(compasid);
var ctx = canvas.getContext('2d');
redibujaCanvas(compasid, ctx);


var Obnota={nombre:"nota", keys:arraynotas[indice], arri:2, duration:figura, stem_direction:direccionplica};
almacena(Obnota, compasid);




var compasid2= "c"+ indice;
var canvas = document.getElementById(compasid2);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave-resto,valaltvexstave, valfinvexstave);
  

  //añadimos las notas

var notes = [  new Vex.Flow.StaveNote({ keys:[arraynotas[0]], stem_direction: direccionplica, duration: figura }), new Vex.Flow.StaveNote({ keys:[arraynotas[1]], stem_direction: direccionplica, duration: figura }), new Vex.Flow.StaveNote({ keys:[arraynotas[2]], stem_direction: direccionplica, duration: figura }),];


  //dibujamos


  
  var voice = new Vex.Flow.Voice({
    num_beats: 1,
    beat_value: 4,
    resolution: Vex.Flow.RESOLUTION
  });


  voice.setMode(Vex.Flow.Voice.Mode.SOFT);//funciona con menos notas en el compás, no es estricto.
  voice.addTickables(notes);


//interfaz de pintado de plicas y barrado de corcheas etc, funciona con un mínimo de notas

var beam = new Vex.Flow.Beam(notes);


  // Format and justify the notes to 500 pixels
  var formatter = new Vex.Flow.Formatter().
    joinVoices([voice]).format([voice], 106);

  // Render voice
 
 voice.draw(ctxsel, stavesel);

//renderizado, mostrado de plicas en 
 beam.setContext(ctxsel).draw();

}

  
}

