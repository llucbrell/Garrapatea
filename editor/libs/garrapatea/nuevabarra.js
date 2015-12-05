
//CREADOR DE  BARRAS /New bar creator
function nuevaBarra(canvas_x, compasid){
  var tipobarra;


//selección del compás

var canvas = document.getElementById(compasid);
var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
var ctxsel = renderer.getContext();
 //stavesel.setContext(ctxsel).draw(); Con esto  podemos redibujar el compás


//comprobamos la barra seleccionada
tipobarra=document.querySelector('input[name="barras"]:checked').value;





if (tipobarra==="barranormal"){
//falla al colocarse al final del compás
var stavesel = new Vex.Flow.Stave(valinivexbar,valaltvexbar, valfinvexbar);

  if (canvas_x>19){

  //barra normal al final
  stavesel.setContext(ctxsel).drawVerticalBar(valfinvexbar-1, true);
   }

   if (canvas_x<20){

  //barra normal al final
  stavesel.setContext(ctxsel).drawVerticalBar(valinivexbar, true);
   }
}

if (tipobarra==="barradoble"){
var stavesel = new Vex.Flow.Stave(valinivexbar,valaltvexbar, valfinvexbar);
 
 if (canvas_x>19){

  //barra doble
stavesel.setContext(ctxsel).drawVerticalBar(valfinvexbar-1, true);
stavesel.setContext(ctxsel).drawVerticalBar(valfinvexbar-4,true);
   }

   if (canvas_x<20){

 //barra doble
stavesel.setContext(ctxsel).drawVerticalBar(valinivexbar, true);
stavesel.setContext(ctxsel).drawVerticalBar(valinivexbar+3,true);
   }

}



//RESTAMOS UNO A LAS VARIABLES VALVEXBAR
if (tipobarra==="barrafinal"){
var stavesel = new Vex.Flow.Stave(valinivexbar-1, valaltvexbar, valfinvexbar+1);

//barra final
stavesel.setContext(ctxsel).setEndBarType(Vex.Flow.Barline.type.END).draw();
}

if (tipobarra==="barrarepeticionend"){
var stavesel = new Vex.Flow.Stave(valinivexbar-1, valaltvexbar, valfinvexbar+1);


//repetición end
stavesel.setContext(ctxsel).setEndBarType(Vex.Flow.Barline.type.REPEAT_END).draw();
}


if (tipobarra==="barrarepeticionprin"){
var stavesel = new Vex.Flow.Stave(valinivexbar-1, valaltvexbar, valfinvexbar+1);

//repetición prin
stavesel.setContext(ctxsel).setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN).draw();
}



//creamos y almacenamos el objeto
var Obbarra={nombre:"barra", type:tipobarra};
almacena(Obbarra, compasid);


}