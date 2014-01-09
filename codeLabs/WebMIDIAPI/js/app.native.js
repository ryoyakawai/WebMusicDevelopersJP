var midi;
var inputs, outputs;
var midiout;
var timerId;

//
window.onload=function() {
    navigator.requestMIDIAccess({sysex:false}).then(scb, ecb);
};

function scb(access) {
    midi=access;
    inputs=midi.inputs();
    outputs=midi.outputs();

    var mi=document.querySelector("#midiInSel");
    for(var i=0; i<inputs.length; i++) {
        mi.options[i]=new Option(inputs[i].name, i);
    }

    var mo=document.querySelector("#midiOutSel");
    for(var i=0; i<outputs.length; i++) {
        mo.options[i]=new Option(outputs[i].name, i);
    }

    document.querySelector("#midiInSelB").addEventListener("click", function(){
        var port=document.querySelector("#midiInSel").value;
        for(var i=0; i<inputs.length; i++) {
            inputs[i].onmidimessage=function(){
                return;
            };
        }
        inputs[port].onmidimessage=function(event){
            midiout.send(event.data);
            fKey.onmessage(event.data);
        };
    });

    document.querySelector("#midiOutSelB").addEventListener("click", function(){
        var port=document.querySelector("#midiOutSel").value;
        midiout=outputs[port];
        fKey.setConnected();
    });

    document.querySelector("#programChangeRange").addEventListener("change", function(){
        var voiceNo=document.querySelector("#programChangeRange").value;
        voiceChange(voiceNo);
    });

    document.querySelector("#panicButton").addEventListener("click", function(){
        midiout.send([ 0xb0, 0x78, 0x00 ]); // allSoundOff
        midiout.send([ 0xb0, 0x79, 0x00 ]); // resetAllController
        midiout.send([ 0xb0, 0x7b, 0x00 ]); // allNoteOff
    });

    


    
}


function ecb(e){
    console.log(e);
}

function voiceChange(voiceNo) {
    if(midiout!==null) {
        midiout.send([ 0xc0, voiceNo, 0x00 ]);
    }
    var dVoiceNo=parseInt(voiceNo)+1;
    document.querySelector("#voiceName").innerHTML=dVoiceNo + ". "+ voiceList.getGMVoiceName("instruments", voiceNo);
}

var fKey = new FlatKeyboard("keyboard");
timerId = setInterval(function(){
    fKey.draw();
}, 64);
fKey.noteOn=function(noteNo) {
    midiout.send([0x90, noteNo, 127]);
};
fKey.noteOff=function(noteNo) {
    midiout.send([0x80, noteNo, 127]);
};

