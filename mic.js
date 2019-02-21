
const fs = require('fs')
const AudioContext = require('web-audio-api').AudioContext;
var context = new AudioContext;
//const exec = require('exec')
const child_process = require('child_process');
const WavDecoder = require("wav-decoder")


const mic = require('mic');

const micInstance = mic({

  rate: '16000',
  channels: '1',
  debug: false,
  exitOnSilence: 6,
  fileType: 'wav'

});

const micInputStream = micInstance.getAudioStream();
const outputFileStream = fs.WriteStream('output.wav');






micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);
    //var decoded = WavDecoder.decode.sync(data)
    //var float32Array = decoded.channelData[0]
    //console.log(float32Array)
});
 
micInputStream.on('error', function(err) {
   console.log("Error in Input Stream: " + err);
});
 
micInputStream.on('startComplete', function() {
    console.log("Got SIGNAL startComplete");
    setTimeout(function() {
            micInstance.pause();
    }, 5000);
});
    
micInputStream.on('stopComplete', function() {
    console.log("Got SIGNAL stopComplete");
});
    
micInputStream.on('pauseComplete', function() {
    //console.log("Got SIGNAL pauseComplete");
    setTimeout(function() {
        micInstance.resume();
    }, 5000);
});
 
micInputStream.on('resumeComplete', function() {
    //console.log("Got SIGNAL resumeComplete");
    setTimeout(function() {
        //micInstance.stop();
    }, 5000);
});
 
micInputStream.on('silence', function() {
    console.log("Got SIGNAL silence");
});
 
micInputStream.on('processExitComplete', function() {
    console.log("Got SIGNAL processExitComplete");
});
 
micInstance.start();

micInputStream.pipe(outputFileStream);
child_process.execFile('play -b 16 -e signed -c 1 -r 16000 output.wav', (err, stdout, stderr) => {
  if (err) {
    console.log('issue in exec')
    return;
  }
});







