var m = null;   // m = MIDIAccess object for you to make calls on
function onsuccesscallback( access ) {
  
  m = access;
  
  var inputs = m.enumerateInputs();   // inputs = array of MIDIPorts
  var i = m.getInput( inputs[0] );    // grab first input device.  You can also getInput( index );
  
  if(i==null) {
    onerrorcallback();
    return;
  }
  i.onmessage = onMIDIMessage;
  midiConnected(inputs[0].name);
};

function onerrorcallback(){
  midiError();
};

function onMIDIMessage( event ) {
  var data = event.data;
  var data16 = [ event.data[0].toString(16), event.data[1].toString(16), event.data[2].toString(16)];

  switch(data16[0]) {
   case '90':
    webAudio.noteOn(data[1]);
    if(data[2]==0) webAudio.noteOff(data[1]);
    console.log(data[1]);
    break;
    case '80':
    webAudio.noteOff(data[1]);
    break;
    default:
    console.log('Not Supported yet!');
    break;
  }
  
}
