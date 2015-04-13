

//GUARDAR CAMBIOS 



//EN ARCHIVO

//falla en explorer

function descargaMidi(textto){


var nombrearchivo= $("#titulo").html();

  //generamos el archivo como binario y lo almacenamos en  un array de ints
  //sin signo

  var textToWrite = $("#miditexto").html();

var byteArray = new Uint8Array(textToWrite.length/2);
for (var x = 0; x < byteArray.length; x++){
    byteArray[x] = parseInt(textToWrite.substr(x*2,2), 16);
}


//var blob = new Blob([byteArray], {type: "application/octet-stream"});


 
  var textFileAsBlob = new Blob([byteArray], {type: "application/octet-stream"});
   //console.log("texto"+);
  var fileNameToSaveAs = nombrearchivo +".mid";
  //document.getElementById("tituloguion").value;

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null)
  {
    //solución motores webkit
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else
  {
    //Solucion motor GECO 
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();

}
function destroyClickedElement(event)
{
  document.body.removeChild(event.target);
}


function b64EncodeUnicode(str) {
    return btoa(str); 
        

}

 function tobyt(str){
    var bytes = [];
    
    for (var i = 0; i < str.length; ++i)
    {
        bytes.push(str.charCodeAt(i));
        bytes.push(0);
    }
    
    return bytes;
  }


/*
$("#guardar").on("click", function(){
  descargaMidi();
});
*/