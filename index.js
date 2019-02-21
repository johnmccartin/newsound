let fs = require('fs');
let wav = require('node-wav');
let NodeSynth = require('nodesynth');
let Pitchfinder = require('pitchfinder');
let detectPitch = new Pitchfinder.AMDF({
	minFrequence: 0,
	maxFrequency: 1000
});
let Tonal = require('tonal')
let fft = require('fourier-transform')
var Lowpass = require('lowpass');
let aubio = require('aubio')

let buffer = fs.readFileSync('data/speech2.wav');





let fft_out = []


let result = wav.decode(buffer);



let float32Array = result.channelData[0];



// PITCHFINDER
let frequencies = Pitchfinder.frequencies(detectPitch,float32Array,{
	  tempo: 250, // in BPM, defaults to 120
	  quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
});

let notes = [];
let freqs = [];

for(var i = 0; i<frequencies.length; i++){

	let freq = frequencies[i];
	if (freq != null) {
		var midi = Tonal.Note.freqToMidi(freq);
		let note = Tonal.Note.fromMidi(midi);
		let freq_clean = Tonal.Note.freq(note)
		notes.push(note)
		freqs.push(freq_clean)
	} else {
		notes.push(null);
		freqs.push(null);
	}
	

	
};



console.log(notes)
//let scale = Tonal.Detect.scale(notes)
console.log(Tonal)






var ns = new NodeSynth.Synth({bitDepth: 16, sampleRate: 44100});
ns.play();

ns.source = new NodeSynth.Oscillator('sin', function(t){
	var second = Math.floor(t)

	if( second < frequencies.length ) {
		if (frequencies[second] === null) {
			return null
		} else {
			return frequencies[second]
		}
	} else {
		process.exit(0)
	}

});

setTimeout(function(){
	//ns.stop();
}, 2000);

