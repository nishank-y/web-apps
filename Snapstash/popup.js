document.addEventListener("DOMContentLoaded", function () {
    displayItems(); // Load saved items when extension opens

    document.getElementById("save-item").addEventListener("click", saveItem);
    document.getElementById("shopping-list").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            removeItem(event.target.dataset.category, event.target.dataset.url);
        }
    });
});

// Function to save the item to Chrome Storage
function saveItem() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (!tabs.length) return;

        const currentTab = tabs[0];
        const selectedCategory = document.getElementById("category").value;

        if (!selectedCategory || !currentTab.url) return; // Ensure category and URL are valid

        const newItem = { url: currentTab.url, title: currentTab.title.substring(0, 50) };

        chrome.storage.local.get({ shoppingItems: {} }, function (data) {
            let shoppingItems = data.shoppingItems;

            // Initialize category if not present
            if (!shoppingItems[selectedCategory]) {
                shoppingItems[selectedCategory] = [];
            }

            // Prevent duplicate entries
            const exists = shoppingItems[selectedCategory].some(item => item.url === newItem.url);
            if (!exists) {
                shoppingItems[selectedCategory].push(newItem);
            }

            // Save updated data
            chrome.storage.local.set({ shoppingItems }, function () {
                displayItems(); // Refresh the UI
            });
        });
    });
}

// Function to display stored items in categories
function displayItems() {
    chrome.storage.local.get({ shoppingItems: {} }, function (data) {
        const shoppingItems = data.shoppingItems;
        const shoppingListDiv = document.getElementById("shopping-list");

        // Clear previous list
        shoppingListDiv.innerHTML = "";

        let hasItems = false;

        for (const [category, items] of Object.entries(shoppingItems)) {
            if (items.length === 0) continue; // Skip empty categories

            hasItems = true;

            // Create category section
            const categoryContainer = document.createElement("div");
            categoryContainer.classList.add("category-container");

            const categoryHeading = document.createElement("h3");
            categoryHeading.textContent = category.charAt(0).toUpperCase() + category.slice(1);

            const categoryList = document.createElement("ul");
            categoryList.classList.add("category-list");

            items.forEach(item => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <a href="${item.url}" target="_blank">${item.title}</a> 
                    <button class="delete" data-category="${category}" data-url="${item.url}">❌</button>
                `;
                categoryList.appendChild(listItem);
            });

            categoryContainer.appendChild(categoryHeading);
            categoryContainer.appendChild(categoryList);
            shoppingListDiv.appendChild(categoryContainer);
        }

        shoppingListDiv.style.display = hasItems ? "block" : "none";
    });
}

// Function to remove an item from storage
function removeItem(category, url) {
    chrome.storage.local.get({ shoppingItems: {} }, function (data) {
        let shoppingItems = data.shoppingItems;

        if (shoppingItems[category]) {
            shoppingItems[category] = shoppingItems[category].filter(item => item.url !== url);

            // If category is empty, delete it
            if (shoppingItems[category].length === 0) {
                delete shoppingItems[category];
            }
        }

        chrome.storage.local.set({ shoppingItems }, function () {
            displayItems(); // Refresh UI
        });
    });
}
