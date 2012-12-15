var webAudio = new WebAudio();
var oscType = 'sine';

function noteOnFunc(key) {
  webAudio.noteOn(key);
}
function noteOffFunc(key) {
  webAudio.noteOff(key);
}

$(document).ready(function(){
  canvasKenban(noteOnFunc, noteOffFunc);

  $('#sine').click(function(){
    $('#' + oscType).addClass('oscOff');
    oscType='sine';
    webAudio.setOscType(oscType);
    $("#sine").removeClass('oscOff');
  });
  $('#square').click(function(){
    $('#' + oscType).addClass('oscOff');
    oscType='square';
    webAudio.setOscType(oscType);
    $("#square").removeClass('oscOff');
  });
  $('#sawtooth').click(function(){
    $('#' + oscType).addClass('oscOff');
    oscType='sawtooth';
    webAudio.setOscType(oscType);
    $("#sawtooth").removeClass('oscOff');
  });
  $('#triangle').click(function(){
    $('#' + oscType).addClass('oscOff');
    oscType='triangle';
    webAudio.setOscType(oscType);
    $("#triangle").removeClass('oscOff');
  });

  $('input.gain').change(function(){
    webAudio.setGainValue( $(this).val() );
  });

  // midi
  changeStatus('<font color="gray">No MIDI device are connected.</font>');
  $('input.midiStatus').click(function(){
    switch($(this).attr('status')){
      case 'off':
      navigator.requestMIDIAccess( onsuccesscallback, onerrorcallback );
      break;
    }
  });
  
});


function midiConnected(text) {
  $('div.midiStatus').attr('status', 'on');
  $('div.midiStatus').css('background-color', '#7F7FFF');
  $('input.midiStatus').attr('disabled', 'disabled');
  changeStatus('Successfully connected to "' + text + '".');
}

function midiError(){
  changeStatus('<font color="red">ERROR has been occured during connecting to MIDI device.</font>');
}

function changeStatus(text){
  $('div.connectionstatus').html('<div style="position: relative; margin:2px 0px 0px 73px">' + text + '</div>');
}