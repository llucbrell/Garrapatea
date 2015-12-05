//GENERADOR DE COMPASES POR BOTÓN/ stave button creator

function nuevoCanvas(){
  $("#partitura").append("<canvas width=\"38\" height=\"150\" id=\"c" +numerocompas +"\" class=\"compas\" onclick=\"clickeoEnCanvas(event, this.id)\"></canvas>");
      
    var idcompas= "c"+numerocompas;
    nuevoCompas(idcompas);
    numerocompas+=1;

    
}
  
function nuevoCompas(idcompas){
  var canvas = document.getElementById(idcompas);
  var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

  var ctx = renderer.getContext();
  var stave = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
  stave.setContext(ctx).draw();



//creamos el array como almacén de las notas del compás en cuestión


//sumamos para llevar la cuenta de los compases


//podemos añadir aquí código de dibujado de barra entre los compases
}
