(function() {
    // --- 1. 介面樣式優化 ---
    const style = document.createElement('style');
    style.innerHTML = `
        #kitchen-mod-ui {
            position: fixed; bottom: 20px; left: 20px; z-index: 9999;
            background: rgba(25, 25, 25, 0.95); color: #00ff41;
            padding: 15px; border-radius: 10px; border: 1px solid #00ff41;
            font-family: 'Courier New', monospace; box-shadow: 0 0 15px rgba(0,255,65,0.3);
            width: 220px;
        }
        .mod-btn {
            width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #00ff41;
            background: transparent; color: #00ff41; cursor: pointer;
            transition: 0.3s; border-radius: 4px; font-weight: bold;
        }
        .mod-btn:hover { background: #00ff41; color: #000; }
        .mod-active { background: #00ff41; color: #000; box-shadow: 0 0 10px #00ff41; }
        #mod-log { font-size: 10px; color: #aaa; margin-top: 10px; max-height: 40px; overflow: hidden; }
    `;
    document.head.appendChild(style);

    // --- 2. 建立功能面板 ---
    const ui = document.createElement('div');
    ui.id = 'kitchen-mod-ui';
    ui.innerHTML = `
        <div style="text-align:center; margin-bottom:10px;">🧪 KITCHEN OS v2.0</div>
        <button id="btn-spawn" class="mod-btn">📦 自動拉取食材</button>
        <button id="btn-mix" class="mod-btn">🔥 啟動瘋狂融合</button>
        <button id="btn-nuke" class="mod-btn" style="border-color:#ff4141; color:#ff4141;">☢️ 一鍵清空桌面</button>
        <div id="mod-log">系統準備就緒...</div>
    `;
    document.body.appendChild(ui);

    // --- 3. 核心功能邏輯 ---
    let mixInterval = null;
    let spawnInterval = null;

    // A. 自動從清單中拉取隨機食材到桌面
    function autoSpawn() {
        const pantryItems = document.querySelectorAll('.pantry-item');
        if (pantryItems.length > 0) {
            const randomItem = pantryItems[Math.floor(Math.random() * pantryItems.length)];
            randomItem.click(); // 遊戲原生邏輯：點擊清單項目即可生成到桌面
            updateLog("拉取新食材...");
        }
    }

    // B. 自動隨機融合桌面物件
    function autoMix() {
        const items = document.querySelectorAll('.item');
        if (items.length >= 2) {
            const i1 = items[Math.floor(Math.random() * items.length)];
            const i2 = items[Math.floor(Math.random() * items.length)];
            if (i1 !== i2) {
                i1.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
                i2.dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));
                i2.dispatchEvent(new MouseEvent('mouseup', {bubbles: true}));
                updateLog("嘗試融合中...");
            }
        }
    }

    function updateLog(msg) {
        document.getElementById('mod-log').innerText = "> " + msg;
    }

    // --- 4. 綁定按鈕事件 ---

    // 自動拉取開關
    document.getElementById('btn-spawn').onclick = function() {
        if (spawnInterval) {
            clearInterval(spawnInterval);
            spawnInterval = null;
            this.classList.remove('mod-active');
            updateLog("停止拉取");
        } else {
            spawnInterval = setInterval(autoSpawn, 1000);
            this.classList.add('mod-active');
            updateLog("開始持續供貨");
        }
    };

    // 瘋狂融合開關
    document.getElementById('btn-mix').onclick = function() {
        if (mixInterval) {
            clearInterval(mixInterval);
            mixInterval = null;
            this.classList.remove('mod-active');
            updateLog("融合已暫停");
        } else {
            mixInterval = setInterval(autoMix, 300); // 0.3秒融合一次，速度極快
            this.classList.add('mod-active');
            updateLog("科研模式啟動！");
        }
    };

    // 一鍵清理
    document.getElementById('btn-nuke').onclick = function() {
        const items = document.querySelectorAll('.item');
        items.forEach(item => item.remove());
        updateLog("桌面已淨化");
    };

    console.log("R74N 無限廚房模組加載成功！");
})();
