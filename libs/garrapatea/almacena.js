//FUNCION QUE ALMACENA LOS OBJETOS // Object saving array-model

function almacena(objeto, compasid){
  var indice=compasid.slice(1);
  var i= +indice;

  if (almacen[i]===undefined){
  almacen[i]=objeto;
}
  else{
  	almacen[i]=[almacen[i], objeto];
  }
}

//FUNCION QUE ALMACENA LOS OBJETOS // Object saving array-model

function overriteAlmacen(objeto, compasid){
  var indice=compasid.slice(1);
  var i= +indice;

  
  almacen[i]=objeto;

  }


