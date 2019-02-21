const fs = require('fs')
const AudioContext = require('web-audio-api').AudioContext;
var context = new AudioContext;
var pcmdata = [];
var beat_log = [];
const { exec } = require('child_process');
const WavDecoder = require("wav-decoder")













var soundfile = "data/speech.wav"

decodeSoundFile(soundfile);


function decodeSoundFile(soundfile){
  fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
      //console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
      pcmdata = (audioBuffer.getChannelData(0)) ;
      //console.log(pcmdata)
      samplerate = audioBuffer.sampleRate; // store sample rate
      maxvals = [] ; 
      max = 0 ;
      playsound(soundfile)
      findPeaks(pcmdata, samplerate)
      //console.log(peak_log)
    }, function(err) { throw err })
  })
}

function play_song(beats) {

  

}


function findPeaks(pcmdata, samplerate){
  var interval = 0.05 * 1000; 
  var index = 0 ;
  var step = Math.round( samplerate * (interval/1000) );
  var max = 0 ;
  var prevmax = 0 ;
  var prevdiffthreshold = 0.1 ;

  //loop through song in time with sample rate
  var samplesound = setInterval(function() {
    if (index >= pcmdata.length) {
      clearInterval(samplesound);
      console.log("finished sampling sound")
      console.log(beat_log)
      return;
    }

    for(var i = index; i < index + step ; i++){ 
    	max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
    }

    // Spot a significant increase? Potential peak
    bars = getbars(max) ;

    if ( max-prevmax >= prevdiffthreshold ) {
      bars = bars + " == peak == ";
      beat_log.push('peak');

    } else {
      beat_log.push('hold');
    }

    // Print out mini equalizer on commandline
    //console.log(bars, max )
    prevmax = max ; max = 0 ; index += step ;
  }, interval,pcmdata);
}



 
function getbars(val){
  bars = ""
  for (var i = 0 ; i < val*50 + 2 ; i++){
    bars= bars + "|";
  }
  return bars ;
}

function playsound(soundfile){

  var create_audio = exec('ffplay -autoexit '+soundfile, {maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {

    }
  });
}


