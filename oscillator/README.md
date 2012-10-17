# Oscillatorのサンプルコード

## サンプルの説明
js/webAudio.js に WebAudioAPIに 関するコードを書きました。  
基本的には以下の順序でコードを書くと、オシレター利用した音を出す事が可能です。  
 1. audioContext を作成
 2. Oscillato(osc) を作成
 3. Oscillator のタイプ(osc.type)を設定（0:正弦波, 1:矩形波, 2:ノコギリ波, 3:三角波, 4:カスタム）
 4. 周波数を設定(osc.frequency.value)：この数値を変更すると音程が変わります。(単位はHz, 440:ラ)
 5. destination へ接続
 6. 発声(osc.noteOn(0):引数のゼロは「ゼロ秒後に発声する」という意味)

    var audioContext = new webkitAudioContext();  
    var osc = audioContext.createOscillator();  
    osc.type = 0;  
    osc.frequency.value = 441;  
    osc.connect( audioContext.destination );  
    osc.noteOn(0);  

## 気づいた点
周波数(osc.frequency.value)を変更する度に、audioContext.createOscillator()をする必要がある。  
これを行わないとポルタメントがかかった音になるので注意してください。