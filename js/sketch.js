let slider;

// Instrument
const synth = new Tone.DuoSynth({
  "vibratoAmount"  : 0.5 ,
	"vibratoRate"  : 5 ,
	"harmonicity"  : 1.5 ,
	"voice0"  : {
		"volume"  : -10 ,
		"portamento"  : 0 ,
		"oscillator"  : {
		    "type"  : "sine"
		}  ,
		"filterEnvelope"  : {
			"attack"  : 0.01 ,
			"decay"  : 0 ,
			"sustain"  : 1 ,
			"release"  : 0.5
		}  ,
		"envelope"  : {
			"attack"  : 0.01 ,
			"decay"  : 0 ,
			"sustain"  : 1 ,
			"release"  : 0.5
		}
	}  ,
	"voice1"  : {
		"volume"  : -20 ,
		"portamento"  : 0 ,
		"oscillator"  : {
		    "type"  : "sine"
		}  ,
		"filterEnvelope"  : {
			"attack"  : 0.01 ,
			"decay"  : 0 ,
			"sustain"  : 1 ,
			"release"  : 0.5
		}  ,
		"envelope"  : {
			"attack"  : 0.01 ,
			"decay"  : 0 ,
			"sustain"  : 1 ,
			"release"  : 0.5
		}
    }
});

// Effects
const reverb = new Tone.JCReverb(0.4);
const osc = new Tone.OmniOscillator("C#4", "pwm").start();
const ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.5,
  decay: 0.6,
  sustain: 0.3,
  release: 0.2
})

// Connections
synth.connect(reverb);


// Notes
let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);

  // Creating the slider
  slider = new Nexus.Slider("#slider", {
    'min' : 0,
    'max' : 1,
    'step' : 0.1
  });

  // More connections
  reverb.toDestination();

  synth.release = 2;
  synth.resonance = 0.98;

  // Slider changes
  slider.on('change', (v) =>  {
    reverb.roomSize.value = v;
  }); 

  // Even more connections
  osc.connect(ampEnv);
  ampEnv.connect(reverb);
  new Tone.start()
}

function draw() {
  background(220);
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);

  osc.frequency.value = toPlay;
  ampEnv.triggerAttackRelease('8n');
  

}