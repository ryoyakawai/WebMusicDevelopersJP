var WebAudio = function() {

    var audioContext = new (window.webkitAudioContext||window.AudioContext);
    var gainNode = audioContext.createGainNode();
    var osc = new Array();
    var gainValue = 0.3;
    var oscType = 'sine';
    var oscPreset = {
        'sine':0,
        'square':1,
        'sawtooth':2,
        'triangle':3,
    };


  // create frequency
  var r = Math.pow( 2.0, 1.0 / 12.0 );
  var noteDefMIDI = new Array();
  noteDefMIDI[69] = 440 ;
  for ( var i = 70; i <= 127; i++ ) {
  noteDefMIDI[i] = noteDefMIDI[i-1] * r;
  }
  for (  i = 68; i >= 0; i-- ) {
    noteDefMIDI[i] = noteDefMIDI[i+1] / r;
  }
  
  return {
    setGainValue: function(value) {
      gainValue = value;
    },
    setOscType: function(type) {
       oscType = oscPreset[type];
    },
    noteOn: function(key) {
      var freq = noteDefMIDI[key];

      osc[key] = audioContext.createOscillator();
      gainNode.gain.value = gainValue;

      osc[key].type = oscType;
      osc[key].frequency.value = freq;

      osc[key].connect( gainNode );
      gainNode.connect(audioContext.destination );
      
      osc[key].noteOn(0);
    },

    noteOff: function(key) {
      osc[key].noteOff(0);
    }
  };  
};
