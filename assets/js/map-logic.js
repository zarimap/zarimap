// 1. 地図の土台を作る（緯度, 経度, ズームレベル）
// ※ [ ] の中の数字を、自分の表示したい場所の座標に変えてください
const map = L.map('map').setView([35.6895, 139.6917], 15); 

// 2. 背景の「絵（タイル）」を表示する
// 日本語のページなら国土地理院、それ以外なら英語の地図を表示
let tileUrl = (typeof currentLang !== 'undefined' && currentLang === 'ja') 
    ? 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png' 
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

L.tileLayer(tileUrl, {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

console.log("地図の読み込みを開始しました！");
