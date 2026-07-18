/* =========================================================
   HUOKAING THARA BANK - AUTHENTICATION & LOGIN CONTROLLER
   ========================================================= */

(function() {
    "use strict";

    // 1. Configuration & User Data
    const CONFIG = { SESSION_KEY: "HT_SESSION", MAX_ATTEMPTS: 5 };
    const USERS = [
        { username: "huokaingthara", password: "huokaingthara", role: "Cybersecurity", requires2FA: false },
        { username: "test", password: "test", role: "Test Customer", requires2FA: false },
        { username: "thorn", password: "thorn", role: "Customer", requires2FA: false },
        { username: "sansopheata", password: "sansopheata", role: "Chief Executive Officer", requires2FA: false },
        { username: "chansamnang", password: "chansamnang", role: "Customer", requires2FA: false },
        { username: "raem", password: "raem", role: "Customer", requires2FA: false },
        { username: "sengviseynea", password: "sengviseynea", role: "Chief Executive Officer", requires2FA: false },
        { username: "somsodavin", password: "somsodavin", role: "Chief Executive Officer", requires2FA: false },
        { username: "svaymetrey", password: "svaymetrey", role: "Chief Executive Officer", requires2FA: false },
        { username: "chornrothanak", password: "chornrothanak", role: "Chief Executive Officer", requires2FA: true },
        { username: "longlain", password: "longlain", role: "Chief Executive Officer", requires2FA: true },
        { username: "chumchanrothanak", password: "chumchanrothanak", role: "Chief Executive Officer", requires2FA: true },
        { username: "phaychanrothana", password: "phaychanrothana", role: "Chief Executive Officer", requires2FA: true },
        { username: "vanneat", password: "vanneat", role: "Customer", requires2FA: true },
        { username: "mengly", password: "mengly", role: "Customer", requires2FA: true },
        { username: "leyu", password: "leyu", role: "Customer", requires2FA: true },
        { username: "huy", password: "huy", role: "Customer", requires2FA: true },
        { username: "sengchhat", password: "sengchhat", role: "VIP Customer", requires2FA: true },
    ];

    // 2. Authentication Logic
    window.handleLogin = async function(username, password) {
        const msg = document.getElementById("loginMessage");
        const user = USERS.find(u => u.username === username && u.password === password);

        if (!user) {
            msg.textContent = "Invalid credentials. Please try again.";
            return;
        }

        // Handle 2FA if required
        if (user.requires2FA) {
            msg.textContent = "2FA Verification required...";
            // Logic for 2FA would be triggered here
            return;
        }

        // Success: Initialize Session
        sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify({
            username: user.username,
            role: user.role,
            token: crypto.randomUUID()
        }));

        renderDashboard(user);
    };

    // 3. Dashboard Transition
    function renderDashboard(user) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("summaryBox").style.display = "block";
        
        // Initialize dashboard components
        updateAIStatus(user);
        initializeDashboardData();
        renderDashboardCards();
    }

    // 4. UI Helpers
    function updateAIStatus(user) {
        const bubble = document.getElementById("aiStatusBubble");
        if (bubble) bubble.textContent = `AI CORE ONLINE • USER: ${user.username}`;
    }

    // 5. Lifecycle Management
    window.logout = function() {
        sessionStorage.removeItem(CONFIG.SESSION_KEY);
        location.reload();
    };

    // Check for existing session on load
    document.addEventListener("DOMContentLoaded", () => {
        const session = sessionStorage.getItem(CONFIG.SESSION_KEY);
        if (session) {
            renderDashboard(JSON.parse(session));
        }
    });
})();

