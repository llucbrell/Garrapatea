//BROWSER COMPATIBILITY BYPASSS


function browserCatch() {
  var audioAPI=true;
  var audioHTML=false;
  //test the browser audio support
 trySound();


function trySound(){
  tryAPIsound();
  
  if (audioAPI==false)
  {
  tryHTMLsound();
  }
  
}

function tryAPIsound(){
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    AudioAPIS=true;
    context = new AudioContext();
    livesound="WebAPI";
    loadAudio();
  }
  catch(e) {
    audioAPI=false;
   // alert('Web Audio API is not supported in this browser');
    
  }
}

function tryHTMLsound(){
	audioHTML= !!(document.createElement('audio').canPlayType);
//return a boolean false if browser doesn't support audio html5 tag

if (audioHTML==true){
	//here we check the mp3 and ogg format support at this moment
	//we work with mp3 only
   livesound="HTML5";	
   bypassAudio();
}
else{
   alert('Web Audio API and HTML5 audio is not supported in this browser. Please use another browser or try to fix it with an newer browser version. Otherwise, the Garrapatea Editor should be work without sound in this browser. Thanks for make music.');
    
}

}


}


