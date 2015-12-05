//motor de garrapatea

function iniciaGarrapatea(){
	//la mayor parte de esto lo controlará el bloguero
//contador de compases/stave counter
var numerocompas=0;
var canvas_y;
var canvas_x;
var compasespartitura=[];

//control del tamaño del vex/vex stave size control
var valinivexstave=-1;
var valaltvexstave=20;
var valfinvexstave=39;
//var accion="notas";


//control localización barras
var valinivexbar=0;
var valaltvexbar=20;
var valfinvexbar=38;




//compás inicial para una mejor experiéncia UI 
//se puede mejorar, colocar todo en una función a parte

nuevoCanvas(numerocompas);
nuevoCanvas(numerocompas);
nuevaClave("treble", "c0");
nuevoRitmo("6/8", "c1");
nuevaBarra("2","c0")

//podría crear una función para saber el largo del compás
//en función del tamaño del dispositivo


//ONCLICK LISTENERS

$("#1").on("click", function(){
    nuevoCanvas(numerocompas);
});

});

}