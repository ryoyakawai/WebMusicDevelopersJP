var fKey = new FlatKeyboard("keyboard");
timerId = setInterval(function(){
    fKey.draw();
}, 64);

var midi;
var inputs, outputs;
var midiout=null;
var timerId;

var wmaw = new WebMIDIAPIWrapper( true );
window.onload=function(){
    wmaw.initMidi();
};

wmaw.setMidiInputSelect=function() {
    var misel=document.getElementById("midiInSel");
    for(var i=0; i<this.devices.inputs.length; i++) {
        misel.options[i]=new Option(this.devices.inputs[i]["name"], i);
    }
    document.getElementById("midiInSelB").addEventListener("click", function(){
        console.log("inputs");
        var port=document.getElementById("midiInSel").value;
        function midiInputEvent(event) {
            if(typeof wmaw.ports.out[0]=="object") {
                wmaw.ports.out[0].send(event.data);
            }
            fKey.onmessage(event.data);
        }
        wmaw.setMidiInputToPort(port, 0, midiInputEvent);
    });
};

wmaw.setMidiOutputSelect=function() {
    var mosel=document.getElementById("midiOutSel");
    var options=new Array();
    for(var i=0; i<this.devices.outputs.length; i++) {
        mosel.options[i]=new Option(this.devices.outputs[i]["name"], i);
    }
    document.getElementById("midiOutSelB").addEventListener("click", function() {
        var port=document.getElementById("midiOutSel").value;
        wmaw.setMidiOutputToPort(port, 0);
        changeVoice(0);
        fKey.setConnected();
        fKey.noteOn=function(noteNo) {
            wmaw.sendNoteOn(0, 0, noteNo, 127, 0);
        };
        fKey.noteOff=function(noteNo) {
            wmaw.sendNoteOff(0, 0, noteNo, 127, 0);
        };
     });
     document.getElementById("programChangeRange").addEventListener("change", function() {
         var voiceNo=this.value;
         changeVoice(voiceNo);
     });
    function changeVoice(voiceNo) {
        wmaw.sendProgramChange(0, 0, voiceNo, 0);
        document.getElementById("voiceName").innerHTML=voiceNo + ". "+ voiceList.getGMVoiceName("instruments", voiceNo);
    }
};

