//CONTROL DE LAS COORDENADAS DEL RATÓN SOBRE CADA UNO DE LOS CANVAS DE MANERA INDEPENDIENTE
//MOUSE COORDINATES OVER EACH CANVAS



//obtenemos las coordenadas del click sobre los canvas, en un futuro hay que simplificarlo más
function coordenadasRatonCanvas(event, compasid){

  //Funciona en motor webkit & explorer
  if (event.x != undefined && event.y != undefined)
        {
     canvas_x= event.offsetX;
     canvas_y= event.offsetY;
     return canvas_x, canvas_y, compasid;
    
     
}
  else{
    //código para firefox 
       
       canvas_x= event.layerX;
       canvas_y= event.layerY;

       return canvas_x, canvas_y, compasid;
      

  }
//alert ("x=" +canvas_x + "y="+canvas_y +compasid);
}

