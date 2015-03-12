

function nuevaNota(canvas_y, compasid){
var nota;
var figura; 
var alteracionesChecked;
var SoundChecked;
var direccionplica= 1;    
var nota2="g/4";
var indice= compasid.slice(1);
//var compasanterior= +indice -1;
var arraynotas=[];
var arrayduracionnotas=[];
var arraynotasalteradas=[];
var iniciogruponotas;
var fingruponotas=indice;
//selección del compás

var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás



//si está el sonido on... toca la nota

SoundChecked=document.getElementById("sonido").checked;




//comprobamos la duración que tiene la nota y le damos valor

figura=document.querySelector('input[name="notas"]:checked').value;

//variable control de las alteraciones
alteracionesChecked=document.getElementById("alteraciones").checked;

//obtenemos el nombre de la nota al clickar sobre el canvas
alturaNota(canvas_y);

//si son corcheas o más pequeñas
if (figura>=8){

 
//comprobamos que la nota simple no tenga alteraciones
   if(alteracionesChecked===true){
    var accidenteSelected= document.querySelector('input[name="accidentes"]:checked').value;
      dibujaNotaAlterada(nota, figura, accidenteSelected);
      var Obnota={nombre:"nota", keys:nota, alteracion:accidenteSelected, duration:figura, stem_direction:direccionplica};

      almacena(Obnota, compasid);
      playNote(Obnota, SoundChecked);

   }
   else{

  var Obnota={nombre:"nota", keys:nota, alteracion:"natural", duration:figura, stem_direction:direccionplica};
  almacena(Obnota, compasid);
  dibujaNota(nota, figura);
  playNote(Obnota, SoundChecked);
}
//averiguamos si las notas vecinas son también barrables
 for (i=+indice+1; i<almacen.length; ++i){
   if (almacen[i]!=undefined && almacen[i].nombre!="silencio" && almacen[i].duration && almacen[i].duration>=8){
      fingruponotas=i;
   }
   else{
    fingruponotas=i-1;
    break;
   }

 }

 for (i=+indice-1; i>0; --i){
   if (almacen[i]!=undefined && almacen[i].nombre!="silencio" && almacen[i].duration && almacen[i].duration>=8){
      iniciogruponotas=i;
   }
   else{
      iniciogruponotas=i+1;
    break;
   }

 }
  //usado para comprobar que funciona bien el bucle  
//alert("primero del grupo " + iniciogruponotas+ "ultimo del grupo "+ fingruponotas +figura);

//bucle que almacena las keys de todas las notas del grupo en un array
//para que luego lo usemos para repintar las notas con las barras
   
   if(iniciogruponotas!= fingruponotas){
    for (i=iniciogruponotas, j=0; i<=fingruponotas; i++){
        arraynotas[j]=almacen[i].keys;
        ++j;
     }
     //también funciona
    
     for (i=iniciogruponotas, j=0; i<=fingruponotas; i++){
        arrayduracionnotas[j]=almacen[i].duration;
        ++j;
     }

     for (i=iniciogruponotas, j=0; i<=fingruponotas; i++){
        arraynotasalteradas[j]=almacen[i].alteracion;
        ++j;
     }
   // alert(arraynotas +"****"+ arraynotasalteradas);
  dibujaGrupoNotas(iniciogruponotas,fingruponotas,arraynotas, arrayduracionnotas, arraynotasalteradas);
     }

}


//si es una nota mayor de corchea
else{
  //si está clicakdo el checbox de las alteraciones

  if(alteracionesChecked===true)
    {
      
    var accidenteSelected= document.querySelector('input[name="accidentes"]:checked').value;
      dibujaNotaAlterada(nota, figura, accidenteSelected);
      var Obnota={nombre:"nota", keys:nota, alteracion:accidenteSelected, duration:figura, stem_direction:direccionplica};

      almacena(Obnota, compasid);
      playNote(Obnota, SoundChecked);

    }


   else{ 
  dibujaNota(nota, figura);

//llamamos a la función de pintado de notas
//creamos y almacenamos la nota nueva creada al clickar
  var Obnota={nombre:"nota", alteracion:"natural", keys:nota, duration:figura, stem_direction:direccionplica};
  almacena(Obnota, compasid);
  playNote(Obnota, SoundChecked);
   }
//recuerda transformar las notas a otra clave cuando no sea la clave de sol
//la que ha sido marcada 
//de momento utilizaremos sólo las notas en clave de sol
}



//no deja un buen formato al mezclar notas alteradas y notas sin alterar
//de momento lo dejo así, xq mientras sean pocas notas, las dibuja

 function dibujaGrupoNotas(iniciogruponotas,fingruponotas,arraynotas, arrayduracionnotas, arraynotasalteradas){
var i;
var notes=[];
var nota;
var resto=0;
var formato=76;
var aumento=38;
var aumentof=0;

//recorremos el grupo de notas
      for (i=0; i<arraynotas.length; i++){
//si tiene alteraciones lo comprobamos aquí--- implementar
//si tiene alteración añadimos la nota alterada al array

if(arraynotasalteradas[i]==="natural"){
 nota= new Vex.Flow.StaveNote({ keys:[arraynotas[i]] , stem_direction:direccionplica, duration: arrayduracionnotas[i] });
 notes.push(nota);
}
else{
  nota= new Vex.Flow.StaveNote({ keys: [arraynotas[i]], stem_direction: direccionplica, duration: arrayduracionnotas[i] }).addAccidental(0, new Vex.Flow.Accidental(arraynotasalteradas[i]));
notes.push(nota);
}

     
     }   








//alert(notes);
//usado para comprobar el almacenamiento de las notas;
var numeronotas=arraynotas.length;

//usamos los condicionales para dar formato al grupo de notas

if (numeronotas===2){
     //aumento=38;
     formato=76;
    }

if (numeronotas===3){
     //aumento=38;
     formato=112;
    }

if (numeronotas===4){
     //aumento=38;
     formato=150;
}

if (numeronotas===5){
    //aumento=38;
    formato=188;
}

if (numeronotas===6){
    //aumento=38;
    formato=226;
}

if (numeronotas===7){
    //aumento=38;
    formato=264;
}

if (numeronotas===8){
    //aumento=38;
    formato=302;
}

if (numeronotas===9){
    //aumento=38;
    formato=340;
}

if (numeronotas===10){
    //aumento=38;
    formato=378;
}

if (numeronotas===11){
    //aumento=38;
    formato=416;
}

if (numeronotas===12){
    //aumento=38;
    formato=454;
}

if (numeronotas===13){
    //aumento=38;
    formato=492;
}

if (numeronotas===14){
    //aumento=38;
    formato=530;
}

if (numeronotas===15){
    //aumento=38;
    formato=568;
}

if (numeronotas===16){
    //aumento=38;
    formato=606;
}


//pintamos el grupo de notas

    for (i=iniciogruponotas; i<=fingruponotas; j++, i++, resto=resto+aumento){
 //seleccionamos el compas


       var compasid= "c" + i; 
       
       var canvas = document.getElementById(compasid);
       var ctx = canvas.getContext('2d');
       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
       nuevoCompas(compasid);


//var compasid2= "c"+ i;


       var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
       var ctxsel = renderer.getContext();
       var stavesel = new Vex.Flow.Stave(valinivexstave-resto,valaltvexstave, valfinvexstave);
  

  

  
 var voice = new Vex.Flow.Voice({
          num_beats: 4,
          beat_value: 4,
          resolution: Vex.Flow.RESOLUTION
          });

       


          voice.setMode(Vex.Flow.Voice.Mode.SOFT);//funciona con menos notas en el compás, no es estricto.
          voice.addTickables(notes);


//interfaz de pintado de plicas y barrado de corcheas etc, funciona con un mínimo de notas

         var beam = new Vex.Flow.Beam(notes);


  // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).format([voice], formato);
















  // Render voice

        voice.draw(ctxsel, stavesel);

//renderizado, mostrado de plicas en 
       beam.setContext(ctxsel).draw();
       
}
}
  


 










function alturaNota(canvas_y){ 


  //un pentagrama sencillo. Hay que mejorarlo con el pentagrama de piano



  //tesitura aguda
if( canvas_y > 25 && canvas_y <32){
   nota="e/6", direccionplica= -1;
}
if( canvas_y > 31 && canvas_y <38){
   nota="d/6", direccionplica= -1;
}
if( canvas_y > 37 && canvas_y <45){
   nota="c/6", direccionplica= -1;
}
if( canvas_y > 44 && canvas_y <49){
   nota="b/5", direccionplica= -1;
}
if( canvas_y > 48 && canvas_y <54){
   nota="a/5", direccionplica= -1;
}
if( canvas_y > 53 && canvas_y <59){
   nota="g/5", direccionplica= -1;
}
if ( canvas_y > 58 && canvas_y< 64){
  nota="f/5", direccionplica= -1;
}
if ( canvas_y > 63 && canvas_y< 69){
  nota="e/5", direccionplica= -1;
}
if ( canvas_y > 68 && canvas_y< 74){
  nota="d/5", direccionplica= -1;
}
if ( canvas_y > 73 && canvas_y< 79){
  nota="c/5", direccionplica= -1;
}
//tesitura media
if ( canvas_y > 78 && canvas_y< 84){
  nota="b/4", direccionplica= -1;
}
if ( canvas_y > 83 && canvas_y< 89){
  nota="a/4";
}
if ( canvas_y > 88 && canvas_y< 94){
  nota="g/4";
}
if ( canvas_y > 93 && canvas_y< 99){
  nota="f/4";
}
if ( canvas_y > 98 && canvas_y< 104){
 nota="e/4";
}
if ( canvas_y > 103 && canvas_y< 109){
  nota="d/4";
}
if ( canvas_y > 108 && canvas_y< 114){
  nota="c/4";
}
//tesitura grave
if ( canvas_y > 113 && canvas_y< 119){
  nota="b/3";
}
if ( canvas_y > 118 && canvas_y< 124){
  nota="a/3";
}
if ( canvas_y > 123 && canvas_y< 129){
  nota="g/3";
}
if ( canvas_y > 128 && canvas_y< 134){
  nota="f/3";
}
if ( canvas_y >  133 && canvas_y< 139){
  nota="e/3";
}
if ( canvas_y >  132 && canvas_y< 138){
  nota="d/3";
}


//return the note for drawing
return nota;
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



//función que dibuja las notas alteradas de figuras mayores a la corchea
function dibujaNotaAlterada(nota, figura, accidenteSelected){

//controlamos el formato de  las notas alteradas

//Vexflow... ¿por qué dibujar las cosas siempre de la misma manera, si puedo pintar donde me de la gana? XD
if (accidenteSelected==="#")
{
stavesel = new Vex.Flow.Stave(valinivexstave-12,valaltvexstave, valfinvexstave);
 } 
if (accidenteSelected==="n")
{
  stavesel = new Vex.Flow.Stave(valinivexstave-10,valaltvexstave, valfinvexstave);
}
if (accidenteSelected==="b")
{
  stavesel = new Vex.Flow.Stave(valinivexstave-10,valaltvexstave, valfinvexstave);
 }

//el doble bemol se corta un poco, en un futuro lo resolveré ganando 
//un pixel en cada canvas
if (accidenteSelected==="bb")
{
  stavesel = new Vex.Flow.Stave(valinivexstave-16,valaltvexstave, valfinvexstave);
 }
if (accidenteSelected==="##")
{
  stavesel = new Vex.Flow.Stave(valinivexstave-15,valaltvexstave, valfinvexstave);
 }




var notaAccidental=nota;
//usado pensando que era necesario introducir la alteración en el key
//object, pero parece que no... Hay que testearlo también en otros 
//navegadores
//var notaAccidental= nota[0]+accidenteSelected+nota[1]+nota[2];

var notes = [  new Vex.Flow.StaveNote({ keys: [notaAccidental], stem_direction: direccionplica, duration: figura }).addAccidental(0, new Vex.Flow.Accidental(accidenteSelected)),];



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



  
}


