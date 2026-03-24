// --- ステップ1：地図の背景を切り替える ---
let tileUrl = (currentLang === 'ja') 
    ? 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png' // 日本語地図
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'; // 英語地図

L.tileLayer(tileUrl, { attribution: '...' }).addTo(map);

// --- ステップ2：CSVを読み込んでピンを立てる ---
fetch('../../assets/data/zarigani.csv')
  .then(response => response.text())
  .then(csvData => {
    // ...（行に分ける処理）...
    
    // --- ステップ3：ピンの中身を切り替える ---
    // ここで currentLang を使って、Excelのどの列を使うか決める
    const title = (currentLang === 'ja') ? row.name_ja : row.name_en;
    const info = (currentLang === 'ja') ? row.desc_ja : row.desc_en;

    // ピンを立てる（座標は世界共通なので変わらない！）
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>${title}</b><br>${info}`);
  });
