// Runs in the background to listen for changes and handle storage
chrome.runtime.onInstalled.addListener(() => {
    console.log("SnapStash Extension Installed!");
});

// Handles storage changes and updates the shopping list across all sessions
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.shoppingList) {
        console.log("Shopping list updated:", changes.shoppingList.newValue);
    }
});
