var midi;
var inputs, outputs;
var midiout;
var timerId;

window.onload=function() {
    // #1 requestMIDIAccessでMIDIデバイスを取得
};
    
// #2 MIDIデバイスの取得が完了した時のCallback
function scb(access) {
    midi=access;

    // #3 inputデバイス一覧をGlobal変数inputsへ

    // #4 outputデバイス一覧ををGlobal変数outputsへ

    var mi=document.getElementById("midiInSel");
    // #5 プルダウンメニューにinputデバイスをリストアップ

    var mo=document.getElementById("midiOutSel");
    // #6 プルダウンメニューにoutputデバイスをリストアップ

    /* Inputボタンを押した時の動作 */
    document.getElementById("midiInSelB").addEventListener("click", function(){
        var port=document.getElementById("midiInSel").value;
        for(var i=0; i<inputs.length; i++) {
            inputs[i].onmidimessage=function(){
                return;
            };
        }
        // #7 選択したデバイスのinputポートにEventを指定
        /*
          注) ソフトウェアキーボードの動作させる為、Event内に必ず追加
           fKey.onmessage(event.data);
        */
    });

    /* Outputボタンを押した時の動作 */
    document.getElementById("midiOutSelB").addEventListener("click", function(){
        var port=document.getElementById("midiOutSel").value;
        // #7 選択したデバイスをoutputポートに指定

        // voiceChange(0); /* Web MIDI API Wrapper を使っていない場合のみ有効(「//」を削除)にしてください */
        fKey.setConnected();
    });

    /* ProgramChangeのスライダを動かした時の動作 */
    document.getElementById("programChangeRange").addEventListener("change", function(){
        var voiceNo=document.getElementById("programChangeRange").value;
        voiceChange(voiceNo);
    });

    /* Panicボタンを押した時の動作 */
    document.getElementById("panicButton").addEventListener("click", function(){
        // #8 AllSoundOff, resetAllController, allNoteOff のメッセージを送信
        /*
          AllSoundOff        : 0xb0 0x78 0x00
          resetAllController : 0xb0 0x79 0x00
          allNoteOff         : 0xb0 0x7b 0x00
        */
    });
    
    
}

/* MIDIデバイスリスト取得を失敗したときのCallback */
function ecb(e){
    console.log(e);
}

function voiceChange(voiceNo) {
    if(midiout!==null) {
        // #9 ProgramChangeのメッセージを送信
        /*
          ProgramChange: 0xc0 [VoiceNo] 0x00 
        */
    }
    var dVoiceNo=parseInt(voiceNo)+1;
    document.getElementById("voiceName").innerHTML=dVoiceNo + ". "+ voiceList.getGMVoiceName("instruments", voiceNo);
}

/**
 * SoftWareキーボードの動作
 * js file: flatKeyboard.js
 */   
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

