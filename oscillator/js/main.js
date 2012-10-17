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


});


