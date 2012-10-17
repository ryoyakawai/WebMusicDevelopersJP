# Oscillatorのサンプルコード

## サンプルの説明
js/webAudio.js に WebAudioAPIに 関するコードを書きました。
 * audioContext を作成
 * Oscillato(osc) を作成
 * Oscillator のタイプ(osc.type)を設定（0:正弦波, 1:矩形波, 2:ノコギリ波, 3:三角波, 4:カスタム）
 * 周波数を設定(osc.frequency.value)：この数値を変更すると音程が変わります
 * destination へ接続
 * 発声(osc.noteOn)

    var audioContext = new webkitAudioContext();
    var osc = audioContext.createOscillator();
    osc.type = 0;
    osc.frequency.value = 441;
    osc.connect( audioContext.destination );
    osc.noteOn();

## 気づいた点
周波数(osc.frequency.value)を変更する度に、audioContext.createOscillator()をする必要がある。
これを行わないとポルタメントがかかった音になるので注意してください。