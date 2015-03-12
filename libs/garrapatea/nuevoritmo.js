


function nuevoRitmo(tipo, compasid){
var tipo=document.querySelector('input[name="ritmos"]:checked').value;

//CREAMOS EL COMPÁS O RITMO// create the stave rithm
var canvas = document.getElementById(compasid);

//Podemos utilizarlo para pintar... herramienta de escritura
//var context= canvas.getContext("2d");




  var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

  var ctxsel = renderer.getContext();
  var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  stavesel.addTimeSignature(tipo, 1).setContext(ctxsel).draw();



//creamos y almacenamos el objeto
var Obritmo={nombre:"ritmo", timesignature:tipo};
almacena(Obritmo, compasid);

}
