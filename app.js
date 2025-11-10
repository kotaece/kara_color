// HTMLの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    /* --- ランダム化処理 --- */
    // 1. モデルのリスト
    const models = [
      {
            src: 'assets/models/Astronaut.glb',      // Android用
            iosSrc: 'assetss/models/Astronaut.usdz', // iPhone用
            alt: '宇宙飛行士の3Dモデル',
            poster: 'assets/posters/Astronaut.png'
        },
        {
            src: 'assets/models/Horse.glb',
            iosSrc: 'assets/models/Horse.usdz',
            alt: '馬の3Dモデル',
            poster: 'assets/posters/Horse.png'
        },
        {
            src: 'assets/models/Robot.glb',
            iosSrc: 'assets/models/Robot.usdz',
            alt: 'ロボットの3Dモデル',
            poster: 'assets/posters/Robot.png'
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
    bgm.volume = 0.5; 

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
