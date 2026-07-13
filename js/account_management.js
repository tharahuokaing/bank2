/**
 * REVISED MODULE HANDLER
 * Integrates Transfer Center with QR Generation UI
 */
function showModule(module) {
    const content = document.getElementById("moduleContent");

    switch(module) {
        case "accounts":
            // Display logic for accounts...
            break;

        case "transfers":
            content.innerHTML = `
                <h3>Transfer Center</h3>
                <div class="transfer-form">
                    <input id="fromAcc" type="text" placeholder="From Account (e.g. Alice)">
                    <input id="toAcc" type="text" placeholder="To Account">
                    <input id="amount" type="number" placeholder="Amount">
                    <button onclick="handleTransfer()">Transfer</button>
                    <button onclick="generateBakongQR()" class="secondary-btn">Generate Bakong QR</button>
                </div>
                
                <!-- QR Container (Hidden by default) -->
                <div id="qrContainer" style="margin-top: 20px; display: none; text-align: center;">
                    <p>Scan to Pay via Bakong:</p>
                    <div class="qr-placeholder" id="qrCode"></div>
                    <p id="txStatus" style="color: var(--accent-cyan); font-family: monospace;"></p>
                </div>
            `;
            break;

        case "risk":
            // Risk logic...
            break;
    }
}

/**
 * Triggered by the "Generate Bakong QR" button
 */
function generateBakongQR() {
    const qrContainer = document.getElementById("qrContainer");
    const qrCode = document.getElementById("qrCode");
    const txStatus = document.getElementById("txStatus");

    // 1. Show UI elements
    qrContainer.style.display = "block";
    qrCode.innerHTML = "<em>Connecting to Gateway...</em>";
    txStatus.textContent = "Negotiating secure session...";

    // 2. Simulate Bakong Gateway handshake delay
    setTimeout(() => {
        // 3. Inject simulated QR pattern
        qrCode.innerHTML = `
            <div class="qr-pattern">
                <div class="pixel"></div><div class="pixel"></div>
                <div class="pixel"></div><div class="pixel"></div>
            </div>
        `;
        txStatus.textContent = "TX-HASH: " + Math.random().toString(36).substr(2, 9).toUpperCase();
        console.log("[BAKONG]: Secure QR pattern injected.");
    }, 1200);
}
