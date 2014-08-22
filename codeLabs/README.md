#Code Labs
ここにはWeb Audio API、Web MIDI APIを使ったアプリケーションの簡単なチュートリアル集です。  

#Web Audio API
 - [Web Audio API用の教材](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebAudioAPI)

この教材は、[@g200kg](https://twitter.com/g200kg)さんのWebサイト[g200kg Music & Software](http://www.g200kg.com/)の[Web Audio API解説](http://www.g200kg.com/jp/docs/webaudio/)に掲載されているコードの利用許可を @g200kgさん からいただき重要な箇所を虫食いにしたものを教材としています。  
ファイルの命名則は以下のようになっています。

 - **[数字1].html**  
 [数字1]はチャプタ番号を示しています。
 例えば **「12.アナライザーの使い方」** の教材は **[12.html](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebAudioAPI/12.html)** という具合です。

 - **[数字1]-[数字2].html**  
 [数字1]はチャプタ番号を示し、[数字2]はそのチャプタ内で説明されているサンプルコードの何番目かを示しています。
 例えば **「13.アナライザーの使い方」** の *ピンポンディレイへの応用* ですと、このチャプタの中で2つ目サンプルですので教材は **[13-02.html](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebAudioAPI/13-02.html)** という具体です。

 - **comp.[数字1].html、またはcomp.[数字1]-[数字2].html**  
 ファイル名の頭に付いている *comp* は **complete** の略です。虫食い箇所に正しい文字を入れて完成させたファイルです。
 例えば、**「12.アナライザーの使い方」** の教材 **[12.html](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebAudioAPI/12.html)** の完成ファイルは **[comp.12.html](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebAudioAPI/comp.12.html)** という具合です。  

途中でどう書き進めたらよいか分からなくなった場合、作業中のファイル名の最初に _comp._ がついたファイルを参照するようにしてください。

#Web MIDI API
- [Web MIDI API用の教材](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebMIDIAPI)

この教材は、外部MIDI機器、またはアプリケーションで生成されたMIDI入力を、外部MIDI機器に出力をするサンプルの重要な箇所を虫食いにして作成ものを教材としています。  
ファイルの構成は以下のようになっています。

 - **assets/** ：[Bootstrap](http://getbootstrap.com/)の本体のディレクトリ
 - **images/**：画像ディレクトリ
 - **[js/](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebMIDIAPI/js)**
   - *WebMIDIAPI.js*：[Web MIDI APIのPolyfill](https://github.com/cwilso/WebMIDIAPIShim)
   - *WebMIDIAPIWrapper.js*：[Web MIDI API Wrapper](https://github.com/ryoyakawai/WebMIDIAPIWrapper)
   - *[app.js](https://github.com/ryoyakawai/WebMusicDevelopersJP/tree/master/codeLabs/WebMIDIAPI/js/app.js)*：**虫食いにしたファイル。これに手を加えてアプリケーションを完成させてください。**
   - *app.native.js*：Web MIDI API のみを使って *app.js* を完成させたファイルです。
   - *app.wmaw.js*：Web MIDI API Wrapper を使って *app.js* を完成させたファイルです。
   - *flatKeyboard.js*：完成画面に埋め込んでいるキーボードのスクリプト
   - *voiceList.js*：GM音源をリスト化したスクリプト

作業を開始する前に [Web MIDI API Wrapper](https://github.com/ryoyakawai/WebMIDIAPIWrapper) を利用するか・しないかを選択してから開始してください。途中でどう書き進めたらよいか分からなくなった場合、Web MIDI API Wrapperを利用している場合は **[app.wmaw.js](https://github.com/ryoyakawai/WebMusicDevelopersJP/blob/master/codeLabs/WebMIDIAPI/js/app.wmaw.js)** を利用していない場合は **[app.native.js](https://github.com/ryoyakawai/WebMusicDevelopersJP/blob/master/codeLabs/WebMIDIAPI/js/app.native.js)** を参照して進めてください。



