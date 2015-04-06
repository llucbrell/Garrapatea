
function muestraImagenPartitura(){	

//obtenemos el contexto del canvas a dibujar
var can2 = document.getElementById('preview');
var ctx2 = can2.getContext('2d');

//seleccionamos cada canvas compas y lo añadimos al canvas general
for (var i=0, x=0, y=0; i<numerocompas; i++, x=x+38){
  var can = document.getElementById('c'+i);
 // console.log(can);
  var ctx = can.getContext('2d');
  
  //añadiremos la rectificación de linea en funcion de la pantalla del usuario
 if(can2.width<x){

 	//can2.setAttribute('width', x);
   can2.width= x;
     for (var j=0, q=0, k=0; j<numerocompas; j++, q=q+38){
      var can = document.getElementById('c'+j);
 // console.log(can);
      var ctx = can.getContext('2d');
  //	can2.width= x;
     ctx2.drawImage(can, q, k);
   }	
  	
  
 }
   	ctx2.drawImage(can, x, y);


 
}

 
var visual= document.getElementById("visual");

var img  = can2.toDataURL("image/png");
//visual.innerHTML= '<img src="'+img+'"/>';

//ocultamos el canvas del que obtuviomos la imagen
$("#visual").hide();
$("#preview").hide();

//abrimos una ventana donde insertamos la imagen png



//window.open('url to open','window name','attribute1,attribute2') 
/*
var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
var URL = "///C:/Users/Lucas/version-control/garrapatea/preview.html" + location.href;
var win = window.open(URL, "_blank", strWindowFeatures);
*/

//si dejamos windo.open vacío, generamos una tab en vez de una ventana
//var ventana=window.open('','','width=600, height=600');
var ventana=window.open();
ventana.document.open();
ventana.document.write('<img src="'+img+'"/>');
ventana.document.close();
/*
var div= win.document.getElementById("contenedorpreview");
div.innerHTML= '<img src="'+img+'"/>';*/
}


