document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const timerText = timerDisplay.parentElement; // This is the full "Time Left: Xs" paragraph
    const finalMessage = document.getElementById("final-message");
    const faces = document.querySelectorAll(".hole img");

    const bompSound = document.getElementById("bomp-sound");
    const endSound = document.getElementById("end-sound");

    let score = 0;
    let timeLeft = 30;
    let gameActive = false;
    let timerInterval;
    let faceInterval;

    // Function to start the game
    function startGame() {
        if (gameActive) return;

        gameActive = true;
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
    

        // Reset UI
        finalMessage.textContent = "";
        finalMessage.style.display = "none"; // Hide final message
        timerText.style.display = "block"; // Show timer text
        timerDisplay.textContent = timeLeft; // Reset timer display

        startButton.textContent = "Playing...";
        startButton.disabled = true;

        // Start game mechanics
        timerInterval = setInterval(updateTimer, 1000);
        faceInterval = setInterval(showRandomFace, 1000);
    
    }

    // Function to update the timer
    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            clearInterval(faceInterval);
            endGame();
           
        }
    }

    // Function to show a random face
    function showRandomFace() {
        if (!gameActive) return;

        const randomFace = faces[Math.floor(Math.random() * faces.length)];
        if (randomFace.classList.contains("show")) return;

        randomFace.classList.add("show");
        setTimeout(() => randomFace.classList.remove("show"), 800);
    }

    // Function to handle face clicks
    function hitFace(event) {
        if (!gameActive) return;

        score++;
        scoreDisplay.textContent = score;
        bompSound.currentTime = 0;
        bompSound.play();
        // Add red border effect
        event.target.classList.add("clicked");

        // Remove border after 200ms
        setTimeout(() => {
            event.target.classList.remove("clicked");
        }, 200);
    }

    function endGame() {
        gameActive = false;
        clearInterval(timerInterval);
        clearInterval(faceInterval);
    
        startButton.textContent = "Start Game";
        startButton.disabled = false;
    
        timerText.style.display = "none"; // Hide timer
    
        let message;
        
        if (score >= 15) {
            message = "Amazing! You're a FaceBomp Master!";
            
        } else if (score >= 10) {
            message = "Great job! But you can do even better!";
        } else {
            message = "Good try! But those faces got the best of you!";
        }
    
        finalMessage.textContent = message;
        finalMessage.style.display = "block";
        endSound.currentTime = 0;
        endSound.play();
    }
    

    // Attach event listeners to faces
    faces.forEach(face => {
        face.addEventListener("click", hitFace);
    });

    // Start button event listener
    startButton.addEventListener("click", startGame);
});
