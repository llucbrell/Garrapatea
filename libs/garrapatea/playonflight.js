/////////////////////////////////////////////////
//INTERFAZ DE REPRODUCTOR DE MIDI ONLINE
//carga un archivo desde su url para manejarlo
//mediante leemidi.js y lo reproduce usando
//la librería jasmid
//
//
/////////////////////////////////////////////////

/*
Copiright (C) 2015 by Lucas Cerveró Beltrán_LLuc Brell_Hobbes
  <llucbrell@gmail.com>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

////////////////////////////////////////////////////////////////////////////////


function  aReproducir(SketchObject) {
  var reader= new FileReader();
  var textToWrite= MidiSketch("write", midisketch);
//create an unsigned array
  var byteArray = new Uint8Array(textToWrite.length/2);
      //translate the string to binary
      for (var x = 0; x < byteArray.length; x++){
         byteArray[x] = parseInt(textToWrite.substr(x*2,2), 16);
         }
//binary to blob object
 var textFileAsBlob = new Blob([byteArray], {type: "application/octet-stream"});
       //use reader to parse the blob to the jasmid library
           reader.readAsBinaryString(textFileAsBlob);
           
          //reader function onload //when all file its loaded
          //add control load in the future
   reader.onload = function(e){
         midiFile = MidiFile(reader.result);
         synth = Synth(44100);
         replayer = Replayer(midiFile, synth);
         audio = AudioPlayer(replayer);
      }   
            
           
          
  
}




////////////////////////////////////////////////////////////
//POSICIONAMIENTO DEL PUNTERO DE LECTURA SOBRE
//EL ARCHIVO MIDI, OJO, DIFERENTES TIPOS DE CODIFICACIONES



//Copyright (c) 2010, Matt Westcott & Ben Firshman 
/*
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.
* The names of its contributors may not be used to endorse or promote products
derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

///////////////////////////////////////////////////////////

  /* Wrapper for accessing strings through sequential reads */
function Stream(str) {
  var position = 0;
  console.log("stream");
  function read(length) {
    var result = str.substr(position, length);
    position += length;
    return result;
  }
  
  /* read a big-endian 32-bit integer */
  function readInt32() {
    var result = (
      (str.charCodeAt(position) << 24)
      + (str.charCodeAt(position + 1) << 16)
      + (str.charCodeAt(position + 2) << 8)
      + str.charCodeAt(position + 3));
    position += 4;
    return result;
  }

  /* read a big-endian 16-bit integer */
  function readInt16() {
    var result = (
      (str.charCodeAt(position) << 8)
      + str.charCodeAt(position + 1));
    position += 2;
    return result;
  }
  
  /* read an 8-bit integer */
  function readInt8(signed) {
    var result = str.charCodeAt(position);
    if (signed && result > 127) result -= 256;
    position += 1;
    return result;
  }
  
  function eof() {
    return position >= str.length;
  }
  
  /* read a MIDI-style variable-length integer
    (big-endian value in groups of 7 bits,
    with top bit set to signify that another byte follows)
  */
  function readVarInt() {
    var result = 0;
    while (true) {
      var b = readInt8();
      if (b & 0x80) {
        result += (b & 0x7f);
        result <<= 7;
      } else {
        /* b is the last byte */
        return result + b;
      }
    }
  }
  
  return {
    'eof': eof,
    'read': read,
    'readInt32': readInt32,
    'readInt16': readInt16,
    'readInt8': readInt8,
    'readVarInt': readVarInt
  }
}



////////////////////////////////////////////////
//END

