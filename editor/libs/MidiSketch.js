//this is a class which works as interface between midi sequencer
// synth, or midi port
//you can pass the commands for write on a file
//or send to another midi sequencer, synth (for playing) or
//midi instrument --- some features are still undeveloped

function MidiObject(){
           //this.tracks="00";//hay que cambiarlo
           this.chunk_header=[];//store the header chunk here// in the future we add a funtion to include the copyright 
           this.total_tracks=0; //number of track stored in the array
           this.tracks_array=[];//store the tracks with their events in this array
  
  
//metodos




//getters & setters
 MidiObject.prototype.getTrack= function(id){
  return this.tracks_array[id];
 };
 
 MidiObject.prototype.getNumberTracks= function(){
  return this.total_tracks;
 };

/*function getHex(number){
       return number.toString(16);
}

//propuesta de herramienta para ayudar al usuario de la lib

*/ 

MidiObject.prototype.setChunk = function(user_format, tracks, user_length, user_ticks){
      var track_number="00";//default values
      var midi_format="01";
      var length="06";
      var ticks="10";
    //  b = typeof b !== 'undefined' ?  b : 1; //its ok? 
    //  return a*b; // then do it
    //2 line for default parameters
       if (user_format){
         if(user_format>-1&&user_format<4){
           midi_format="0"+user_format.toString();
           }
           else{
            //error no es el formato correcto
            console.log(user_format+" Is a wrong midi format.");
           }
         }  
       if(tracks){
           track_number=tracks.toString();
       }
       if (user_length){
       length=user_length.toString();
       }
       if(user_ticks){
          ticks==user_ticks.toString();
       }
//call the property and asign the headr to the MidiSketch Object
      
        this.chunk_header=["4d", "54", "68", "64", "00", "00", 
     "00", length,// weight of the midi header chunk Allways 6 by default
     "00", midi_format, // single-track format //0x01 multitrack
     "00", track_number, // one track for testing /more tracks=poliphony
     "00", ticks] // 16 ticks per quarter// m0x20 === 32 ticks played more quickly

       }
      



MidiObject.prototype.addTrack= function(Track){
    //add a track to the Sketch-- good for writing then into a file
       var _ceros;
       var _tracknum= this.chunk_header[11];
       var _new_tracknum=parseInt(_tracknum, 16)+1;
 
      if(_new_tracknum<16){
        _ceros="0";
      }
       if(_new_tracknum>15){
        _ceros="";
      } 
     

       this.chunk_header[11]=_ceros+ _new_tracknum.toString(16);
       //add the new track size to the array important be exact because it doesn't work instead
        //console.log(Track);
        this.tracks_array.push(Track);
        this.total_tracks+=1;
  }

//track getter
//track getter midiarray

MidiObject.prototype.getTrack=function(id){
  if (this.tracks_array[id-1] !==undefined){
  return this.tracks_array[id-1];
  }
  else{
   console.log("there is nothing inside this "+(id+1) +"track");
  }

 }
 

};
/********************************************************************/
              //end of MidiSketch header objectclass 




/*
//help function 
this.getInfo = function() {
    console.info("This is an hexdecimal midi array class. It's build as interface between programer and midi low-level hexadecimal language. You can use it to write on a file or send it to a midi synth or instrument

        There are various methods to use... Remember to pass the numbers in hexadecimal code or transform the caracters by getHex() method.

        addChunk() method-- add the header// better for files
        addTrack() method-- add the track chunk header
        addMidiEvent(midiEvent, data) method-- add the midi event// use allways after addTrack() method...
        For more info please, read the documentation");
};
*/


function MidiTrack(){

 this.track_chunk="4d54726b";//beginning of track chunk
 this.track_length="0000";//length of the track in bytes// remember transform it to a two byte hexadecimal.
 this.total_track_events=0;// each time we add an event, we add some bytes to the track_lengrh Track Object Property
 this.midi_events_array=[]; //store the events in the array
      

 MidiTrack.prototype.getNumberEvents=function(){
  return this.total_track_events;
 }       
  


//adds a Midi Message to track
MidiTrack.prototype.addMessageToTrack= function (MidiMessage){
    

       var _tracklength= this.track_length;
       var _tracklengthNum=parseInt(_tracklength, 16);
       var _ceros;

       //console.log(MidiMessage); 

       _tracklengthNum+= (+MidiMessage.messageLength);
       console.log("MidiMessage " + MidiMessage.messageLength);
      console.log("tracklength"+_tracklengthNum);
 //the 4 its the classic midi event length-- four bytes
 //check the events length and give a correct format in hex
       if(_tracklengthNum>-1 && _tracklengthNum<16){
        _ceros="0000000";
        console.log("1 "+ this.track_length);
      }
       if(_tracklengthNum>15 && _tracklengthNum<256){
        _ceros="000000";
         console.log("2 "+ this.track_length);
      } 
       if(_tracklengthNum>256){
        _ceros="00000";
         console.log("3 "+ this.track_length);
      }



       this.track_length=_ceros +_tracklengthNum.toString(16);
       //add the new tracklenght in hex
       this.midi_events_array+=MidiMessage.hex;
       // console.log(this.track_length +" y "+ this.midi_events_array);


      this.total_track_events+=1;
/*** Need to transform the _new_tracklength to a 4 digit hexadecimal number****/

 }
//return all the midimessages stored on a Track Object
MidiTrack.prototype.getMessages= function (Track){
       return this.midi_events_array;
}



}






/*********************************************************************/
         //end of Track object class



function MidiMessage( event_name, data1, data2, user_delta, user_channel){
    //user channel number from 0 to 15 no string, integer please
        this.hex;
        this.messageLength;
        var _delta="00";
        var _channel="0";
        var _data1def="3c";//default middle C decimal 60
        var _data2def="7f"; //default velocity d 127

        if(user_delta){
          _delta=user_delta;
        }
        if(user_channel){
          if(user_channel<0||user_channel>15){
            console.log(user_channel+" Its not a correct channel (1-16");
          }
          else{
           _channel=(user_channel-1).toString(16);
            }
        }
        if(data1){
            if(data1<0||data1>127){
            console.log(data1+" It's not a correct note number 0-127// in decimal")
            }    
            else{
          _data1def=data1.toString(16);
            }
        } 
        else{
          console.log("please, define the data1 value");
        }    
        if(data2){    
            if(data2<0||data2>127){
            console.log(data1+" It's not a correct velocity value number 0-127// in decimal")
            }
            else{             
              _data2def=data2.toString(16);
            }
        }
        else{
          console.log("please, define the data2 value");
        }   

        

        //event executions
        if(event_name==="noteOn"){//noteOn midi message
             var _noteOn=_delta+"9"+_channel+_data1def+_data2def;//data1- note number  
             this.hex=_noteOn;//data2- velocity
             this.messageLength=4;// this event is 4 byte long
         }  
        if (event_name==="noteOff") {//noteOff midi message
              var _noteOff=_delta+"8"+_channel+_data1def+_data2def;//data1-note number 
             this.hex=_noteOff; //ata2 -velocity of key release
             this.messageLength=4;
         }
       
        if (event_name==="endTrack"){
          var _fin_track="01ff2f00";
          this.hex=_fin_track; //ata2 -velocity of key release
          this.messageLength=4; 
        }
        /*if (event_name==="key"){
          var _key=_delta+"ff590200";//event name
      //control of the key signature-- in decimals 0 == no accidents
   // negative numbers, number of flats-- -2 === 2 flats
   //positive numbers, number of sharps in the equal tonal mode   
          var _accidents=
          this.hex=_key+hex_accidents;
//revisar con el pdf////////////////////////////
         this.messageLength=6;

        }
*/
     };

//add more midiEvents-messages --->here
//the objective is to include all standard midi messages



/**********************************************************************/
                  //end of class object MidiMessage




//construction and send objects

//transforma los Sketchobjetos en strings de midi en hexadecimal
function MidiSketch(command, SketchObject){
    if(command==="write"){
      //console.log(SketchObject);
       if(SketchObject instanceof MidiMessage){
        return SketchObject.hex;
       }
       if(SketchObject instanceof MidiTrack) {
        return SketchObject.track_chunk+ SketchObject.track_length+ SketchObject.midi_events_array;
        }
       if(SketchObject instanceof MidiObject){
        //primero la cabecera
        var hexstring="";
        var _array_ojt=SketchObject.tracks_array;
     //we run inside the headerchunk parameter, and extract all the values and store it into a hexadecimalstring
        for (i=0; i<SketchObject.chunk_header.length; i++){
           hexstring+=SketchObject.chunk_header[i];//write the chunck header concatenated in one hexadecimal string
        }
        //thes same but now run inside the tracks array, where the stored tracks would be attached
            for (i=0; i<SketchObject.tracks_array.length; i++){
//use console log for debugg
//console.log(i+ " y "+ hexstring+ "Y" + SketchObject.tracks_array[i]);
         hexstring+= SketchObject.tracks_array[i].track_chunk+ _array_ojt[i].track_length+ _array_ojt[i].midi_events_array;
        }
        return hexstring;
       // return all together into the hexadecimal string, ready for writting on a file or other staff
       }

    }
  }  


  function MidiToBinarySketch(SketchObject, filename){


    var textToWrite= MidiSketch("write", SketchObject);

       function destroyClickedElement(event)
       {
       document.body.removeChild(event.target);
       }


      //create an unsigned array
      var byteArray = new Uint8Array(textToWrite.length/2);
      //translate the string to binary
              for (var x = 0; x < byteArray.length; x++){
              byteArray[x] = parseInt(textToWrite.substr(x*2,2), 16);
              }


       var nombrearchivo= filename;
        //create a blob
       var textFileAsBlob = new Blob([byteArray], {type: "application/octet-stream"});
       //console.log("texto"+);
       var fileNameToSaveAs = nombrearchivo +".mid";
       //document.getElementById("tituloguion").value;
       //create a downloadable link
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";

       //test for the navigator agent to apply different sintax
        var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
        ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
        ieVer=(ie ? ie[1] : (ie11 ? 11 : -1));

            if (ie && ieVer<10) {
       // console.log("No blobs on IE ver<10");
             alert("Your navigator is not compatible with Blob API, please update it to a newer version or you can't download midi.");
              return;
             }


              if (ie || ie11) {//IE solution.. thanks StackOverflow
              window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
             } else {
                    var downloadLink = document.createElement("a");
                   downloadLink.download = fileNameToSaveAs;
                    downloadLink.innerHTML = "Download File";

                   if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
                   downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                 } else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked. //Solucion motor GECO 
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = destroyClickedElement;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                 }

         downloadLink.click();
         }


  }





