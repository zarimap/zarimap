// 1. 最初に見せる場所（緯度, 経度, ズームレベル）
// [35.6895, 139.6917] を自分の好きな場所の数字に書き換えてください！
const map = L.map('map').setView([35.6895, 139.6917], 15); 

// 2. 言語によって地図の「背景（タイル）」を切り替える
let tileUrl;
let attribution;

if (currentLang === 'ja') {
    // 日本語版：国土地理院の淡色地図（日本語でシンプル！）
    tileUrl = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
    attribution = '© 国土地理院';
} else {
    // 英語版：CartoDBのシンプルな地図（英語表記）
    tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    attribution = '© OpenStreetMap contributors © CARTO';
}

L.tileLayer(tileUrl, { attribution: attribution }).addTo(map);
