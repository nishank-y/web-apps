// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function () {

    // Get elements from the DOM
    const nameInput = document.getElementById("participantName");
    const addParticipantBtn = document.getElementById("addParticipant");
    const participantList = document.getElementById("participantList");
    const drawWinnerBtn = document.getElementById("drawWinner");
    const resetRaffleBtn = document.getElementById("resetRaffle");
    const winnerText = document.getElementById("winnerText");
    const container = document.querySelector(".container");

    const confettiBackground = document.createElement("div");
    confettiBackground.classList.add("confetti-background");
    document.body.prepend(confettiBackground);

    // Array to store participant names
    let participants = [];

    // Function to add a participant to the list
    addParticipantBtn.addEventListener("click", function () {
        const name = nameInput.value.trim(); // Get and trim input

        if (name === "") {
            alert("Please enter a name!"); // Prevent empty names
            return;
        }

        if (participants.includes(name)) {
            alert("This name has already been entered!"); // Prevent duplicates
            return;
        }

        // Add the name to the participants array
        participants.push(name);

        // Create a new list item for the participant
        const listItem = document.createElement("li");
        listItem.textContent = name;
        participantList.appendChild(listItem);

        // Clear input field after submission
        nameInput.value = "";
    });

    // Function to randomly pick a winner
    drawWinnerBtn.addEventListener("click", function () {
        if (participants.length === 0) {
            alert("No participants yet! Add names first.");
            return;
        }

        // Select a random participant
        const randomIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[randomIndex];

        // Display the winner with cake and party emojis 🎂🎉
        winnerText.textContent = `🎉 Winner: ${winner} 🎂`;
        confettiBackground.style.opacity = "1";
        container.classList.add("faded");
        setTimeout(() => {
            confettiBackground.style.opacity = "0"; // Hide confetti
            container.classList.remove("faded"); // Restore full opacity
        }, 2000);
    });
    // Function to reset the raffle
    resetRaffleBtn.addEventListener("click", function () {
        // Clear the participants array
        participants = [];

        // Clear the participant list in the UI
        participantList.innerHTML = "";

        // Reset the winner text
        winnerText.textContent = "Winner: ???";
    });
});
