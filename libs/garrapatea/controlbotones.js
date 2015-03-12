//CONTROL DE BOTONES PULSADOS/ pressed button control


/* FUNCIONA CON TODOS LOS NAVEGADORES//WORKS ON ALL BROWSERS
function repartoAcciones(canvas_x, canvas_y, compasid){
  var accion;
function get_radio_value()
{
for (var i=0; i < document.controles.radioButtons.length; i++)
   {
   if (document.controles.radioButtons[i].checked)
      {
       accion = document.controles.radioButtons[i].value;
      }
   }
}

get_radio_value();
  if (accion==="notas"){

  	dibujanotas(canvas_y, compasid)
  }

  if (accion==="claves"){


  	nuevaClave("treble", compasid);

  }

  if (accion==="ritmos"){

    nuevoRitmo("3/4", compasid);

  }
}


/*/

//funcion que actua de click listener de manera dinámica
function clickeoEnCanvas(event, compasid){
  //obtenemos las coordenadas del click
  coordenadasRatonCanvas(event,compasid);

//obtenemos el contexto del canvas
var canvas = document.getElementById(compasid);
var ctx = canvas.getContext('2d');
  ObtenPixelColor (canvas_x, canvas_y, ctx, compasid);
  
}



function ObtenPixelColor (canvas_x, canvas_y, contextopix, compasid){

  var pixel=contextopix.getImageData(canvas_x, canvas_y, 1, 1);
  var datos = pixel.data;

  if (datos[0]===0&&datos[1]===0&&datos[2]===0&&datos[3]===255){
   //pixel es negro
    redibujaCanvas(compasid, contextopix);/*, datos[0], datos[1], datos[2],datos[3]);
*/ 
  }
  else{
    //enviamos las coordenadas al repartidor
    repartoAcciones(canvas_x, canvas_y, compasid); 


  }
}



//esto funciona también con todos pero incluye menos líneas de código   
//works with all browsers too, but we have less code lines here
function repartoAcciones(canvas_x, canvas_y, compasid){


var accion=document.querySelector('input[name="radioButtons"]:checked').value;
//var accion= $('input[name="radioButtons"]:checked').val();


 

  if (accion==="notas"){
    
  	nuevaNota(canvas_y, compasid);
  }

  if (accion==="claves"){
    
  	nuevaClave("treble", compasid);

  }

  if (accion==="ritmos"){
   
    //$("#claves").hide();
    nuevoRitmo("3/4", compasid);

  }
  if (accion==="silencios"){
    nuevoSilencio(compasid);
  }

  if (accion==="barra"){
    nuevaBarra(canvas_x, compasid);
  }
  if (accion==="armadura"){
    if (contador>7){contador=0};
    nuevaArmadura(contador, compasid);
    contador=contador+1;

  }
}
/*
function muestraControles(control, controlanterior){
  var controlanterior= $("#ritmos");
   controlanterior.hide();
   control.show();
   controlanterior= control;
}
*/

