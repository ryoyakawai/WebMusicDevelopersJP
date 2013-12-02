/**
 *  Copyright 2013 Ryoya KAWAI
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 **/
var midiOut, midiIn;

navigator.requestMIDIAccess({sysex:false}).then(scb, ecb);
function scb(access) {
    var br=document.createElement("br");

    var inputs=access.inputs();
    if(inputs<1) {
        var span=document.createElement("span");
        span.innerHTML="No MIDI Input Device Found.\n";
        span.style.setProperty("color", "#afafaf");
        document.querySelector("#inputResult").appendChild(span);
    } else {
        var select=document.createElement("select");
        select.type="select"; select.id="mInSel"; var options=[];
        for(var i=0; i<inputs.length; i++) {
            var span=document.createElement("span");
            var disp=document.querySelector("#inputResult");
            select.options[i]=new Option("["+i+"] "+inputs[i].name, i);
            document.querySelector("#inputResult").appendChild(select);
        }
        var inDiv=document.createElement("div");
        inDiv.id="midiInEvent";
        inDiv.style.setProperty("border", "solid 1px #afafaf");
        inDiv.style.setProperty("border-radius", "3px");
        inDiv.style.setProperty("height", "200px");
        inDiv.style.setProperty("width", "200px");
        inDiv.style.setProperty("word-wrap", "break-word");
        inDiv.style.setProperty("overflow", "auto");
        inDiv.style.setProperty("font-family", "monospace, monospace");
        document.querySelector("#inputMsg").appendChild(inDiv);
        
        midiIn=inputs[0];        
        document.querySelector("#mInSel").addEventListener("change", function(){
            midiIn=outputs[this.value];
        });


        midiIn.onmidimessage=function(event) {
            var inMsg="";
            for(var i=0; i<event.data.length; i++) {
                inMsg+="0x"+event.data[i].toString(16)+" ";
            }
            var inDiv=document.querySelector("#midiInEvent");
            inDiv.innerHTML=inMsg+"<br>\n"+inDiv.innerHTML;
        };
    }

    var outputs=access.outputs();
    if(outputs<1) {
        var span=document.createElement("span");
        span.innerHTML="No MIDI Output Device Found.\n";
        span.style.setProperty("color", "#afafaf");
        document.querySelector("#outputResult").appendChild(span);
    } else {
        var select=document.createElement("select");
        select.type="select"; select.id="mOutSel"; var options=[];
        for(var i=0; i<outputs.length; i++) {
            var span=document.createElement("span");
            var disp=document.querySelector("#outResult");
            select.options[i]=new Option("["+i+"] "+outputs[i].name, i);
            document.querySelector("#outputResult").appendChild(select);
        }
        midiOut=outputs[0];
        document.querySelector("#mOutSel").addEventListener("change", function(){
            midiOut=outputs[this.value];
        });

        var msgOut=document.createElement("input");
        msgOut.id="midiOutMsg"; msgOut.type="input";
        var msgButton=document.createElement("input");
        msgButton.id="msgOutButton"; msgButton.type="button"; msgButton.value="Send"; 
        msgOut.style.setProperty("width", "180px"); msgOut.setAttribute("placeholder", "ex) 0x90 0x45 0x7f");
        msgOut.style.setProperty("border-radius", "3px");
        document.querySelector("#outputMsg").appendChild(msgOut);
        document.querySelector("#outputMsg").appendChild(msgButton);

        var spanText=document.createElement("span");
        spanText.style.setProperty("padding", "1px 2px");
        spanText.style.setProperty("border", "1px solid #000000");
        spanText.style.setProperty("border-radius", "3px");
        spanText.style.setProperty("font-size", "8px");
        spanText.innerHTML="Sent Message";
        var spanMsg=document.createElement("span");
        spanMsg.id="sentMsg";
        spanMsg.style.setProperty("padding", "0px 0px 0px 4px");
        document.querySelector("#outputMsgSent").appendChild(spanText);
        document.querySelector("#outputMsgSent").appendChild(spanMsg);
                
        document.querySelector("#msgOutButton").addEventListener("click", function(){

            var midiOutMsg=document.querySelector("#midiOutMsg");
            if(midiOutMsg.value=="") {
                blinkInput(midiOutMsg);
            } else {
                var midiMsg=midiOutMsg.value;
                midiOut.send(midiMsg.split(" "));
                document.querySelector("#sentMsg").innerHTML=midiMsg;
            }

            function blinkInput(element) {
                element.style.setProperty("border-color", "#ff0000");
                element.style.setProperty("background-color", "#f08080");
                setTimeout(function(){
                    element.style.removeProperty("border-color");
                    element.style.removeProperty("background-color");
                }, 800);
            }

        });
        
    }
}
function ecb(event) {
    console.log("[Error]", event);
}
