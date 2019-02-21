//import libraries
const fs = require("fs")
const WavDecoder = require("wav-decoder")
const PitchFinder = require("pitchfinder")
const detectPitch = new PitchFinder.YIN()
const Tonal = require("tonal")
const Detect = require("tonal-detector")
const forEach = require("foreach")
const MidiWriter = require("midi-writer-js")
//const Tone = require("tone")
const Fili = require("fili");

//console.log(dsp)


//input files
const TEST_FILE = "data/ipocrisia.wav"

main();




function main(){

	let frequencies = get_frequencies(TEST_FILE)

	let melody_notes = create_melody(frequencies)
	let harmony_notes = create_harmony(melody_notes)

	construct_midi_track(melody_notes,harmony_notes);


	
}






function construct_midi_track(melody_notes,harmony_notes) {

	const track = new MidiWriter.Track();

	track.addEvent(new MidiWriter.ProgramChangeEvent({instrument : 1}));

	let melody_events = new MidiWriter.NoteEvent({pitch:melody_notes, duration: '16', sequential: true});
	track.addEvent(melody_events);

	let harmony_events = new MidiWriter.NoteEvent({pitch:harmony_notes, duration: '4', sequential: true})
	track.addEvent(harmony_events)


	var write = new MidiWriter.Writer([track]);
	var data = write.dataUri();

	data = data.replace(/^data:audio\/\w+;base64,/, "");

	var buf = new Buffer(data, 'base64');
	fs.writeFile('track.mid',buf);

}





function create_melody(freq_array) {

	let note_array = get_note_array(freq_array)

	//set this up just in case we need to filter
	note_array = note_array.filter(function(note){
		return note;
	})

	return note_array
}

function create_harmony(melody_notes) {


	//let melody_string = melody_notes.join(' ')
	//console.log(melody_string)
	console.log(melody_notes)
	let scale = Detect.scale(melody_notes)
	//console.log(scale)


}











function get_note(freq) {
	var midi = Tonal.Note.freqToMidi(freq);
	var note = Tonal.Note.fromMidi(midi);

	return note
}


function get_note_array(freq_array) {
	let note_array = [];



	forEach(freq_array,function(freq, i) {
		var note;
		if (freq === null) {
			note = null;
		} else {
			note = get_note(freq)
		}

		note_array.push(note)
	})

	return note_array

}



function get_frequencies(file){

	let buffer = fs.readFileSync(file)
	

	let decoded = WavDecoder.decode.sync(buffer)
	let float32Array = decoded.channelData[0]


	let iir_calc = new Fili.CalcCascades();

	let iir_filter_coeffs = iir_calc.lowpass({
	    order: 3, // cascade 3 biquad filters (max: 12)
	    characteristic: 'butterworth',
	    Fs: 1000, // sampling frequency
	    Fc: 100, // cutoff frequency / center frequency for bandpass, bandstop, peak
	    BW: 1, // bandwidth only for bandstop and bandpass filters - optional
	    gain: 0, // gain for peak, lowshelf and highshelf
	    preGain: false // adds one constant multiplication for highpass and lowpass
	    // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
  });

	var lp_filter = new Fili.IirFilter(iir_filter_coeffs);

	var filtered_array = lp_filter.multiStep(float32Array);
	


	/*

	
	let filtered_array = BiquadFilter({
	    type: 'bandpass',
	    frequency: 440,
	    Q: 100,
	    gain: 25
	},float32Array)
	console.log(filtered_array)
	*/
	

	

	let frequencies = PitchFinder.frequencies(detectPitch, filtered_array, {
			tempo: 130,
			quantization: 4
		})
	
	return frequencies

}











/*
// Create a new instance of node-core-audio
var coreAudio = require("node-core-audio");
 
// Create a new audio engine
var engine = coreAudio.createNewAudioEngine();
 
// Add an audio processing callback
// This function accepts an input buffer coming from the sound card,
// and returns an ourput buffer to be sent to your speakers.
//
// Note: This function must return an output buffer
function processAudio( inputBuffer ) {
    console.log( "%d channels", inputBuffer.length );
    console.log( "Channel 0 has %d samples", inputBuffer[0].length );
 
    return inputBuffer;
}
 
engine.addAudioCallback( processAudio );

*/


