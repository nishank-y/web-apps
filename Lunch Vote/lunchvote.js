import { db } from "./firebase.js";
import { ref, set, remove, onValue, update, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const placeInput = document.getElementById("placeInput");
const addPlaceBtn = document.getElementById("addPlace");
const placesList = document.getElementById("placesList");
const deletePollBtn = document.getElementById("deletePoll");
const leadingPlaceText = document.getElementById("leadingPlace");

let userVote = null; // Track user's current vote
let isVoting = false; // Prevent spamming

// Load poll from Firebase
function loadPoll() {
    onValue(ref(db, "places"), (snapshot) => {
        placesList.innerHTML = "";
        const data = snapshot.val();
        let highestVotes = 0;
        let leadingPlaces = [];

        if (data) {
            Object.entries(data).forEach(([id, place]) => {
                addPlaceToUI(id, place.name, place.votes);

                if (place.votes > highestVotes) {
                    highestVotes = place.votes;
                    leadingPlaces = [place.name]; // Reset to the new highest
                } else if (place.votes === highestVotes && highestVotes > 0) {
                    leadingPlaces.push(place.name); // Add to tie
                }
            });

            if (highestVotes === 0) {
                leadingPlaceText.textContent = `🏆 Leading: No votes yet`;
            } else if (leadingPlaces.length === 1) {
                leadingPlaceText.textContent = `🏆 Leading: ${leadingPlaces[0]} (${highestVotes} votes)`;
            } else {
                leadingPlaceText.textContent = `🏆 Leading: Tie between ${leadingPlaces.join(" & ")} (${highestVotes} votes each)`;
            }

            deletePollBtn.style.display = "block"; // Show delete button
        } else {
            leadingPlaceText.textContent = `🏆 Leading: No votes yet`;
            deletePollBtn.style.display = "none";
        }
    });
}

// Add a new place to Firebase
function addPlace() {
    const placeName = placeInput.value.trim();
    if (placeName === "") return;

    const newPlaceRef = ref(db, "places/" + Date.now());
    set(newPlaceRef, { name: placeName, votes: 0 });

    placeInput.value = "";
}

// Add a place to the UI
function addPlaceToUI(id, name, votes) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${name}</span>
        <div>
            <button class="vote-btn" data-id="${id}">👍</button>
            <span class="vote-count">${votes}</span>
            
        </div>
    `;
    placesList.appendChild(listItem);

    // Vote button functionality
    const voteBtn = listItem.querySelector(".vote-btn");
    voteBtn.addEventListener("click", () => voteForPlace(id));

    // Delete button functionality
    //const deleteBtn = listItem.querySelector(".delete-btn");
    //deleteBtn.addEventListener("click", () => remove(ref(db, `places/${id}`)));
}

// Function to handle voting logic
async function voteForPlace(newVoteId) {
    if (isVoting) return; // Prevent multiple votes while updating
    isVoting = true; // Lock voting until Firebase updates

    if (userVote === newVoteId) {
        isVoting = false;
        return; // Ignore if user clicks the same place again
    }

    const newPlaceRef = ref(db, `places/${newVoteId}`);

    if (userVote !== null) {
        const oldPlaceRef = ref(db, `places/${userVote}`);
        const [oldSnapshot, newSnapshot] = await Promise.all([get(oldPlaceRef), get(newPlaceRef)]);

        if (oldSnapshot.exists()) {
            const oldData = oldSnapshot.val();
            await update(oldPlaceRef, { votes: Math.max(oldData.votes - 1, 0) });
        }

        if (newSnapshot.exists()) {
            const newData = newSnapshot.val();
            await update(newPlaceRef, { votes: newData.votes + 1 });
            userVote = newVoteId; // Update user's vote selection
        }
    } else {
        // First-time voting
        const newSnapshot = await get(newPlaceRef);
        if (newSnapshot.exists()) {
            const newData = newSnapshot.val();
            await update(newPlaceRef, { votes: newData.votes + 1 });
            userVote = newVoteId;
        }
    }

    isVoting = false; // Unlock voting after update
}

// Function to delete the entire poll
function deletePoll() {
    remove(ref(db, "places")).then(() => {
        placesList.innerHTML = "";
        leadingPlaceText.textContent = `🏆 Leading: No votes yet`;
        deletePollBtn.style.display = "none";
        userVote = null; // Reset user vote
    });
}

// Event Listeners
addPlaceBtn.addEventListener("click", addPlace);
deletePollBtn.addEventListener("click", deletePoll);
loadPoll(); // Load poll data when page loads
