// Function to play sound and animate buttons
function playSound(buttonId, audioId) {
    const button = document.getElementById(buttonId);
    const sound = document.getElementById(audioId);

    if (sound) {
        sound.currentTime = 0; // Reset the audio
        sound.play(); // Play the drum sound
    }

    // Add glow effect when clicked
    button.classList.add("glow");
    
    // Remove glow effect after 0.2s
    setTimeout(() => {
        button.classList.remove("glow");
    }, 200);
}

// Event listeners for button clicks
document.getElementById("kickButton").addEventListener("click", () => playSound("kickButton", "kickSound"));
document.getElementById("rideButton").addEventListener("click", () => playSound("rideButton", "rideSound"));
document.getElementById("snareButton").addEventListener("click", () => playSound("snareButton", "snareSound"));
document.getElementById("tomButton").addEventListener("click", () => playSound("tomButton", "tomSound"));
document.getElementById("hihatButton").addEventListener("click", () => playSound("hihatButton", "hihatSound"));

// Event listeners for keyboard keys
document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case "a": playSound("kickButton", "kickSound"); break;
        case "s": playSound("rideButton", "rideSound"); break;
        case "d": playSound("snareButton", "snareSound"); break;
        case "f": playSound("tomButton", "tomSound"); break;
        case "g": playSound("hihatButton", "hihatSound"); break;
    }
});
