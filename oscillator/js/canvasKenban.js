function canvasKenban(noteOnCallback, noteOffCallback) {
  var canvasSize = { 'width': 680, 'height': 130 };

  var canvas = document.getElementById('canvasKenban');
  if (!canvas.getContext) return;
  var context = canvas.getContext('2d');
  
  var w_x = 0,
      b_x = w_x+20,
      keyCount = 0,
      widthCount = 0,
      midiNumber = 72,
      midiNumberStart = midiNumber;
  var kenban = new Array();
  var nowKeyOn = new Array();
  var mouseDown = false;  
  var widthDelta = { '1': 20, '2': 20, '3': 10, '4': 20, '5': 20, '6': 20, '7': 20, '8': 10, '9': 20, '10': 10, '11': 20, '12': 20 }; // width of white key

  // draw kenabn in canvas
  for(var i=0; i<=20; i++) {
    keyCount++;
    var x = w_x + i*30;
    context.fillStyle = '#FFFFFF';  
    context.fillRect(x, 10, 30, 110); // fill white
    context.strokeStyle = '#000000';  
    context.strokeRect(x, 10, 30, 110); // stroke rect
    var x_d_start = x;
    var x_d_end = x + 30;
    kenban[midiNumber] = {'x': x, 'x_d_start': x_d_start, 'x_d_end': x_d_end, 'color': 'white'}; 
    midiNumber++;
		  if( keyCount!=3 && keyCount!=7 ) {
      var x = b_x + i*30;
      kenban[midiNumber] = {'x': x, color: 'black'}; 
      midiNumber++;
    }
    if(keyCount==7) keyCount=0;
  }
  // fill black keys
  keyCount=0;
  for(var i=0; i<=20; i++) {
    keyCount++;
		  if( keyCount!=3 && keyCount!=7 ) {
      var x = b_x + i*30;
      context.fillStyle = '#000000';  
      context.fillRect  (x, 10, 20,  70); // fill black
    }
    if(keyCount==7) keyCount=0;
  }
  // set axis value
  var start_tmp=false;
  for(var i in kenban) {
    widthCount++;
    if(start_tmp == false) {
      var x_u_start = w_x;
      start_tmp=true;
    } else {
      var x_u_start = kenban[i-1].x_u_end;
    }
    var x_u_end = x_u_start + widthDelta[widthCount];
    kenban[i].x_u_start = x_u_start;
    kenban[i].x_u_end = x_u_end;
    if(widthCount==12) widthCount=0;
  }

  //MouseDown event in canvas
  canvas.onmousedown = (function(e) {
    mouseDown = true;
    var rect = e.target.getBoundingClientRect();
    var keyInfo = keyFinder(e, rect);
    if(typeof keyInfo.key == 'undefined') return;
    keyInfo.key = keyInfo.key;
    canvasNoteOn(keyInfo, nowKeyOn);
  });
  canvas.onmousemove = (function(e) {
    if( mouseDown == true ) {
      var rect = e.target.getBoundingClientRect();
      var keyInfo = keyFinder(e, rect);
      if(keyInfo.key == false) {
        canvasNoteOff(nowKeyOn);
      } else 
        if( keyInfo.key != nowKeyOn[0].key) {
        canvasNoteOff(nowKeyOn);
        canvasNoteOn(keyInfo, nowKeyOn);
      }
    }
  });
  canvas.onmouseup = (function(e) {
    mouseDown = false;
    canvasNoteOff();
  });

  function canvasNoteOn(keyInfo) {
    if(typeof keyInfo.key == 'undefined') return; 
    nowKeyOn[nowKeyOn.length]=keyInfo;
    noteOnCallback(parseInt(keyInfo.key));
    drawKeyOn(keyInfo);
  }

  function canvasNoteOff() {
    for( var i in nowKeyOn ) {
      if(nowKeyOn[i].key > 0) {
        noteOffCallback(nowKeyOn[i].key);
        drawKeyOff(nowKeyOn[i]);
      }
    }
    nowKeyOn = new Array();    
  }

  function drawKeyOn(keyInfo){
    var y = 65;
    if( keyInfo.color == 'white' ) y = 100;
    context.beginPath();
    context.strokeStyle = context.fillStyle = 'red';
    context.arc(keyInfo.x, y, 3.4, 0, Math.PI * 2.0, true);
    context.fill();
    context.stroke();
    context.restore();
  }

  function drawKeyOff(keyInfo) {
    var y = 65;
    if( keyInfo.color == 'white' ) y = 100;
    context.beginPath();
    context.strokeStyle = context.fillStyle = keyInfo.color;
    context.arc(keyInfo.x, y, 4.5, 0, Math.PI * 2.0, true);
    context.fill();
    context.stroke();
  }

  function keyFinder(e, rect) {
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;

    // the click in active area of Y??
    if( my<10 || my>120 ) return false;
    var yArea = null;
    if( my>10 && my<80 ) {
      yArea ='up';
    } else {
      yArea ='down';
    }

    switch(yArea) {
     case 'up':
      for(var i in kenban) {
        
        if( kenban[i].x_u_start <= mx && kenban[i].x_u_end > mx ){
          var key = i;
          var color = kenban[i].color;
          var keyLight_x = 0.5 * ( kenban[i].x_u_start + kenban[i].x_u_end );
        }
      }
      break;
     case 'down':
      for(var i in kenban) {
        if( kenban[i].x_d_start <= mx && kenban[i].x_d_end > mx ){
          var key = i;
          var color = kenban[i].color;
          var keyLight_x = 0.5 * ( kenban[i].x_u_start + kenban[i].x_u_end );
        }
      }
      break;
    }
    return { 'key': key, 'x': keyLight_x, 'color': color};
  }

  window.onmouseup = (function(e){
    mouseDown = false;
    canvasNoteOff();
  });
}

