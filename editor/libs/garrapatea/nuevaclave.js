//CREACIÓN DEL CANVAS DE LA CLAVE Y DEL RITMO/create inicial stave
 function nuevaClave(tipo, compasid){

var tipo=document.querySelector('input[name="claves"]:checked').value;

var canvas = document.getElementById(compasid);

//Podemos utilizarlo para pintar... herramienta de escritura
//var context= canvas.getContext("2d");




  var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

  var ctxsel = renderer.getContext();
  var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  stavesel.addClef(tipo).setContext(ctxsel).draw();

  

  //creamos y almacenamos el objeto

  var Obclave={nombre:"clave", clef:tipo};
almacena(Obclave, compasid);
}