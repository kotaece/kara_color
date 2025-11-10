// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    /* --- ランダム化処理 --- */
    // 1. モデルのリスト
    const models = [
      {
            src: 'assets/kara_color.glb',      // Android用
            iosSrc: 'assets/kara_color.usdz', // iPhone用
            alt: 'カラー',
            poster: 'assets/color_texture.png'
        },
        {
            src: 'assets/kara_white.glb',
            iosSrc: 'assets/kara_white.usdz',
            alt: '白',
            poster: 'assets/white_texture.png'
        }
    ];
    // 2. リストからランダムに1つ選ぶ
    const randomIndex = Math.floor(Math.random() * models.length);
    const selectedModel = models[randomIndex];

    // 3. model-viewer 要素を取得
    const modelViewer = document.getElementById('random-model');

    // 4. 取得した要素の属性を書き換える (ios-src を追加)
    modelViewer.src = selectedModel.src;
    modelViewer.alt = selectedModel.alt;
  
    // ios-src が定義されていれば設定する
    if (selectedModel.iosSrc) {
        modelViewer.setAttribute('ios-src', selectedModel.iosSrc);
    }
    // poster属性も設定する場合
    if (selectedModel.poster) {
        modelViewer.poster = selectedModel.poster;
    }
    /* --- ランダム化処理ここまで --- */


    /* --- 
        ここからBGM処理を追記 
    --- */

    // 1. HTMLから audio 要素を取得
    const bgm = document.getElementById('bgm');
    
    // (任意) 音量を少し下げる (0.0 〜 1.0)
    bgm.volume = 1.0; 

    // 2. model-viewer のAR状態を監視する
    modelViewer.addEventListener('ar-status', (event) => {
        
        // ARセッションが開始されたかチェック
        if (event.detail.status === 'session-started') {
            
            // ARが始まったら音楽を再生
            console.log('AR開始: BGMを再生します');
            // .play() は Promise を返すので、エラーをキャッチするのが安全
            bgm.play().catch(error => {
                console.error("BGMの再生に失敗しました:", error);
            });

        } else if (event.detail.status === 'session-ended') {
            
            // ARが終了したら音楽を一時停止
            console.log('AR終了: BGMを停止します');
            bgm.pause();
            
            // (任意) 音楽を最初まで巻き戻す
            bgm.currentTime = 0; 
        }
    });

});
