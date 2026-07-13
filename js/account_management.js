// =====================================================
// ACCOUNT MANAGEMENT SYSTEM
// =====================================================

// InMemory data store for accounts
const bankingAccounts = {};

/**
 * Adds a new user account with a default initial balance.
 * @param {string} username - The unique identifier for the account holder.
 * @param {number} initialBalance - Starting balance (defaults to 10000).
 */
function addAccount(username, initialBalance = 10000) {
    // Clean up input
    const normalizedUser = username.trim().toLowerCase();

    if (!normalizedUser) {
        console.error("Account creation failed: Username cannot be empty.");
        return false;
    }

    // Check if account already exists
    if (bankingAccounts[normalizedUser]) {
        console.warn(`Account already exists for user: ${username}`);
        return false;
    }

    // Create the account structure
    bankingAccounts[normalizedUser] = {
        displayName: username.trim(),
        balance: initialBalance,
        createdAt: new Date().toISOString(),
        transactions: [
            {
                type: "INITIAL_DEPOSIT",
                amount: initialBalance,
                timestamp: new Date().toISOString(),
                description: "Account opened with promotional balance."
            }
        ]
    };

    console.log(`Successfully created account for ${username} with $${initialBalance}`);
    return true;
}

/**
 * Retrieves account details.
 * @param {string} username 
 */
function getAccountDetails(username) {
    const normalizedUser = username.trim().toLowerCase();
    return bankingAccounts[normalizedUser] || null;
}

// =====================================================
// EXAMPLE USAGE
// =====================================================

// Adding individual accounts
addAccount("Alice");
addAccount("Bob");

// Bulk adding users from an array
const newUsers = ["Charlie", "Diana", "Evan"];
newUsers.forEach(user => addAccount(user, 10000));

// Check data in console
console.log("Current Banking Registry:", bankingAccounts);
