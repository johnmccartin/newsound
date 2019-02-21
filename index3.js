const fs = require('fs')
const { exec } = require('child_process');


const mic = require('mic');
const DetectPitch = require('detect-pitch');
const WavDecoder = require("wav-decoder")

const micInstance = mic({

  rate: '44100',
  channels: '2',
  debug: false,
  exitOnSilence: 6,
  fileType: 'wav'

});

var micInputStream = micInstance.getAudioStream();
var outputFileStream = fs.WriteStream('output.wav');

var trigger = 0;

micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);
    if (trigger == 0) {
		//console.log(data);
		
		var decoded = WavDecoder.decode.sync(data)
		var float32Array = decoded.channelData[0]
		console.log(float32Array)



	    micInstance.stop();
		trigger = trigger + 1;
    }
});

micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
});

micInstance.start();
