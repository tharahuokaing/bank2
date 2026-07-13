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

/**
 * Executes a secure transfer between two accounts in the registry.
 */
function handleTransfer() {
    const fromUser = document.getElementById("fromAcc").value.trim().toLowerCase();
    const toUser = document.getElementById("toAcc").value.trim().toLowerCase();
    const amount = parseFloat(document.getElementById("amount").value);

    // 1. Validation
    if (!bankingAccounts[fromUser] || !bankingAccounts[toUser]) {
        alert("Error: One or both accounts not found.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Error: Please enter a valid transfer amount.");
        return;
    }

    if (bankingAccounts[fromUser].balance < amount) {
        alert("Error: Insufficient funds.");
        return;
    }

    // 2. Perform Transaction
    bankingAccounts[fromUser].balance -= amount;
    bankingAccounts[toUser].balance += amount;

    // 3. Record History
    const timestamp = new Date().toISOString();
    bankingAccounts[fromUser].transactions.push({
        type: "DEBIT",
        amount: -amount,
        timestamp: timestamp,
        description: `Transfer to ${toUser}`
    });

    bankingAccounts[toUser].transactions.push({
        type: "CREDIT",
        amount: amount,
        timestamp: timestamp,
        description: `Transfer from ${fromUser}`
    });

    // 4. Feedback
    console.log(`Transfer successful: $${amount} from ${fromUser} to ${toUser}`);
    alert(`Transfer of $${amount} successful!`);

    // Optional: Refresh the dashboard stats if needed
    updateDashboardUI();
}

/**
 * Utility to refresh the dashboard display
 */
function updateDashboardUI() {
    // This updates the visual display if the values change
    const depositTotal = document.getElementById("depositTotal");
    if(depositTotal) {
        // Logic to recalculate total deposits would go here
    }
}
