function redibujaCanvas(compasid, contextopix){
   //alert("borramos"+dato1+dato2+dato3+dato4);

contextopix.clearRect(0, 0, contextopix.canvas.width, contextopix.canvas.height); 
nuevoCompas(compasid);

//borramos el objeto del almacen
 var indice=compasid.slice(1);
 var i= +indice;
 almacen[i]=undefined;
}


function borraCanvasAndRedibuja(compasid){
var indice=compasid.slice(1);
 var i= +indice;
var canvas=document.getElementById(compasid);
 var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
 var ctxsel = renderer.getContext();

ctxsel.clearRect(0, 0, ctxsel.canvas.width, ctxsel.canvas.height); 
       nuevoCompas(compasid);

almacen[i]=undefined;       
}


function borraCanvasDom(){
   var div = document.getElementById("partitura");
   var lastCanvas = div.lastChild;

   div.removeChild(lastCanvas);

}