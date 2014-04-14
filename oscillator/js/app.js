var webAudio = new WebAudio();
var oscType = 'sine';


var fKey = new FlatKeyboard("canvasKenban");
var timerId = setInterval(function(){
    fKey.draw();
}, 80);
fKey.setConnected();

fKey.noteOn=function(key) {
  webAudio.noteOn(key);
};
fKey.noteOff=function(key) {
  webAudio.noteOff(key);
};

$(document).ready(function(){

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
    if(navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({sysex:false}).then(scb, ecb);
        var midi, inputs, mIn;
        function scb(access) {
            midi=access;
            inputs=access.inputs();
            var mi=document.getElementById("midiInSel");
            for(var i=0; i<inputs.length; i++) {
                var deviceName=inputs[i]["name"];
                mi.options[i]=new Option(deviceName, i);
            }
            document.getElementById("midion").addEventListener("click", function(event){
                var selIdx=document.getElementById("midiInSel").selectedIndex;
                midiConnected(inputs[selIdx].name);
                mIn=inputs[selIdx];
                mIn.onmidimessage=function(event) {
                    var a=event.data[0].toString(16).substr(0,1);
                    fKey.onmessage(event.data);
                    switch(a) {
                      case "8":
                        webAudio.noteOff(event.data[1]);
                        break;
                      case "9":
                        webAudio.noteOn(event.data[1]);
                        if(event.data[2]==0) webAudio.noteOff(event.data[1]);
                        break;
                    }
                };
            });
        }
        function ecb(event) {
            console.log("[ERROR] requestMIDIAccess", event);
        }
    }
    
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
  $('div.connectionstatus').html('<div style="position: relative; margin:2px 0px 0px 0px">' + text + '</div>');
}