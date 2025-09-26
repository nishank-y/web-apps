import { db } from "./firebase.js"; 
import { ref, push, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Select elements
const toggleKudosButton = document.getElementById("toggleKudos");
const randomKudosButton = document.getElementById("randomKudos");
const kudosForm = document.getElementById("kudosForm");
const kudosInput = document.getElementById("kudosInput");
const submitKudosButton = document.getElementById("submitKudos");
const kudosDisplay = document.getElementById("kudosDisplay");
const kudosBox = document.getElementById("kudosBox");

// Toggle form visibility
toggleKudosButton.addEventListener("click", () => {
    kudosForm.classList.toggle("hidden");
});

// Submit new kudos
submitKudosButton.addEventListener("click", () => {
    const kudosText = kudosInput.value.trim();
    if (kudosText) {
        push(ref(db, "kudos"), { text: kudosText }).then(() => {
            kudosInput.value = "";
            alert("Kudos added successfully!");
        }).catch(error => console.error("Error adding kudos:", error));
    } else {
        alert("Please enter a kudos message.");
    }
});

// Generate a random kudos
randomKudosButton.addEventListener("click", () => {
    const kudosRef = ref(db, "kudos");

    get(kudosRef).then(snapshot => {
        if (snapshot.exists()) {
            const kudosArray = Object.values(snapshot.val());
            const randomKudos = kudosArray[Math.floor(Math.random() * kudosArray.length)].text;

            kudosDisplay.innerText = `"${randomKudos}"`;
            kudosBox.classList.remove("hidden");
            kudosDisplay.classList.add("kudos-visible");
        } else {
            kudosDisplay.innerText = "No kudos available yet!";
            kudosBox.classList.remove("hidden");
            kudosDisplay.classList.add("kudos-visible");
        }
    }).catch(error => console.error("Error fetching kudos:", error));
});
document.addEventListener("DOMContentLoaded", () => {
    const toggleKudosBtn = document.getElementById("toggleKudos");
    const kudosForm = document.getElementById("kudosForm");

    toggleKudosBtn.addEventListener("click", () => {
        if (kudosForm.style.display === "none" || kudosForm.style.display === "") {
            kudosForm.style.display = "block";
            toggleKudosBtn.textContent = "Hide Kudos"; // Change text
        } else {
            kudosForm.style.display = "none";
            toggleKudosBtn.textContent = "Add Kudos"; // Reset text
        }
    });
});
