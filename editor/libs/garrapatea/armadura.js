//FUNCION QUE ALMACENA LOS OBJETOS // Object saving array-model


function nuevaArmadura(contador, compasid){
var tonalidad;
var tonalidadsostenidos=["G","D","A","E","B","F#","C#"];
var tonalidadbemoles=["F","Bb","Eb","Ab","Db","Gb","Cb"];
var indice=compasid.slice(1);
var i= +indice;
var compasid2= "c"+(i+1);
var a= 36;

//check for the kind of accident
var alteracionesChecked= document.querySelector('input[name="accidentes"]:checked').value;
     
if(alteracionesChecked==="n"){
   alert("por favor selecciona sostenidos o bemoles");
}
if(alteracionesChecked==="#" || alteracionesChecked==="##"){
 //controlamos el número de sostenidos mediante un contador
 //que suma uno al hacer click sobre el compás
 tonalidad=tonalidadsostenidos[contador];
 
}

if(alteracionesChecked==="b" || alteracionesChecked==="bb"){
//almacenamos  el valor del array en la variable tonalidad
 tonalidad=tonalidadbemoles[contador];
 
}

//checkeamos si la armadura es mayor que el canvas y llamamos a la función
//dibujaArmadura una o dos veces
if(contador>2){
	if (contador===7){
		//si el contador llega a siete, borramos los dos compases
		//y los redibujamos
      borraCanvasAndRedibuja(compasid);
      borraCanvasAndRedibuja(compasid2);

	}
	else{
 dibujaArmadura(tonalidad, compasid);  
 dibujaArmadura(tonalidad, compasid2, a);
 almacenaTonalidad(tonalidad, compasid);
    }
}
else{
  dibujaArmadura(tonalidad, compasid);
  almacenaTonalidad(tonalidad, compasid);
}

}

function testArmadura(nota, armadura){
  var tonalidades=["G","D","A","E","B","F#","C#","F","Bb","Eb","Ab","Db","Gb","Cb"];
   var bemoles=["b","e","a","d","g","c","f"];
   var sostenidos=["f","c","g","d","a","e","b"];
  var boleano;
   var tonali;
   var contador;

   for(var z=0; z<tonalidades.length; z++){
     if(armadura.tonalidad===tonalidades[z]){
      tonali=tonalidades[z];
      contador=z;
      break;
     }
  }
  console.log("contador"+ contador);
  if(contador>6){
    
    for(var p=0; p<contador-6; p++){
      console.log(p+nota);
      if(nota[0]===bemoles[p]){
        boleano= "b";
      }
      console.log("alterados"+bemoles[contador]);
        }
  }
  else{
    for(var l=0; l<contador+1; l++){
       console.log("#"+l+nota);
      if(nota[0]===sostenidos[l]){
        boleano= "#";
      }

       }
    }
  return boleano;
}


function almacenaTonalidad(tonalidad, compasid){
//alert("hola"+alteracionesChecked);

var Obkey={nombre:"armadura", tonalidad:tonalidad};
overriteAlmacen(Obkey, compasid);

}



function dibujaArmadura(tonalidad, compasid, a){

var canvas=document.getElementById(compasid);
 var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
 var ctxsel = renderer.getContext();

ctxsel.clearRect(0, 0, ctxsel.canvas.width, ctxsel.canvas.height); 
       nuevoCompas(compasid);
  

//alert("funciona"+ tonalidad);
 

//dibujamos la armadura 

//si no existe a-- dibujamos el segundo compás
if(a){
  var stavesel = new Vex.Flow.Stave(valinivexstave-a,valaltvexstave, valfinvexstave-10);
stavesel.setContext(ctxsel);  

stavesel.addKeySignature(tonalidad).draw();  

}

else{ 
var stavesel = new Vex.Flow.Stave(valinivexstave,valaltvexstave, valfinvexstave);
stavesel.setContext(ctxsel);  

stavesel.addKeySignature(tonalidad).draw();  
}
 
  
}




