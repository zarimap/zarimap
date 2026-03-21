// assets/js/map-logic.js

// ① 地図の土台を作る（緯度, 経度, ズームレベル）
const map = L.map('map').setView([35.6895, 139.6917], 13);

// ② 背景の「絵（タイル）」をOpenStreetMapから持ってくる（これが必要！）
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// ③ この後に fetch(...) などの処理を書く
