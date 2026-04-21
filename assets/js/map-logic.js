/**
 * Zarimap - Map Logic
 * 2026 Zarimap Project
 */

// 1. 地図の初期設定
// [緯度, 経度] は、最初に表示したい中心地点に合わせて調整してください
const map = L.map('map').setView([35.6895, 139.6917], 15);

// 2. 背景タイルの設定（国土地理院・淡色地図）
// ※CSSのフィルターで水色を強調する設定にしています
const tileUrl = 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png';
const attribution = '© 国土地理院';

L.tileLayer(tileUrl, { 
    attribution: attribution,
    maxZoom: 18
}).addTo(map);

// --- データの管理 ---
let allLocations = []; // CSVから読み込んだ全データを保存する配列

/**
 * 右側のパネルを「生息地一覧」に書き換える関数
 */
function showDefaultList() {
    const infoContent = document.getElementById('info-content');
    const listTitle = (currentLang === 'ja') ? '生息地一覧' : 'Habitat List';
    
    let html = `<h3>${listTitle}</h3><ul id="location-list">`;
    
    // 読み込んだデータからリストを生成
    allLocations.forEach((loc, index) => {
        const name = (currentLang === 'ja') ? loc.name_ja : loc.name_en;
        html += `<li onclick="focusMarker(${index})">${name}</li>`;
    });
    
    html += `</ul>`;
    infoContent.innerHTML = html;
}

/**
 * リストをクリックした時にその場所へジャンプする関数
 */
window.focusMarker = function(index) {
    const loc = allLocations[index];
    map.flyTo([loc.lat, loc.lng], 16);
    showDetails(loc);
};

/**
 * 右側のパネルに「詳細情報」を表示する関数
 */
function showDetails(loc) {
    const infoContent = document.getElementById('info-content');
    const name = (currentLang === 'ja') ? loc.name_ja : loc.name_en;
    const desc = (currentLang === 'ja') ? loc.desc_ja : loc.desc_en;
    const btnLabel = (currentLang === 'ja') ? '詳細サイトへ移動' : 'Visit Detail Site';

    let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <span style="background:#e67e22; color:white; padding:2px 8px; border-radius:4px; font-size:0.8rem;">Data Card</span>
            <button onclick="showDefaultList()" style="cursor:pointer; font-size:28px; border:none; background:none; color:#999;">&times;</button>
        </div>
        <h4>${name}</h4>
        <p style="white-space: pre-wrap;">${desc}</p>
    `;

    // URLがある場合のみボタンを表示
    if (loc.url && loc.url !== "") {
        html += `
            <a href="${loc.url}" target="_blank" rel="noopener noreferrer" 
               style="display:block; background:#e67e22; color:white; text-align:center; padding:12px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:20px;">
               ${btnLabel}
            </a>
        `;
    }

    infoContent.innerHTML = html;
}
// 3. CSVファイルを読み込んで処理する
// パスは index.html から見た相対パス（../../assets/data/zarigani.csv）
fetch('../../assets/data/zarigani.csv')
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.trim().split('\n');
        for (let i = 1; i < rows.length; i++) {
            const columns = rows[i].split(',');
            if (columns.length < 6) continue;

            const locData = {
                name_ja: columns[0].trim(),
                name_en: columns[1].trim(),
                lat: parseFloat(columns[2]),
                lng: parseFloat(columns[3]),
                desc_ja: columns[4].trim(),
                desc_en: columns[5].trim(),
                url: columns[6] ? columns[6].trim() : "" // 7番目の列（URL）を取得
            };

            allLocations.push(locData);

            const marker = L.marker([locData.lat, locData.lng]).addTo(map);

            // --- 変更点2: 吹き出し（ポップアップ）にリンクを追加 ---
            const popupLabel = (currentLang === 'ja') ? '詳細を見る' : 'Read More';
            let popupHtml = `<b>${(currentLang === 'ja' ? locData.name_ja : locData.name_en)}</b><br>`;
            if (locData.url) {
                popupHtml += `<a href="${locData.url}" target="_blank" rel="noopener noreferrer">${popupLabel}</a>`;
            }
            marker.bindPopup(popupHtml);

            marker.on('click', () => {
                showDetails(locData);
            });
        }
        showDefaultList();
    });
