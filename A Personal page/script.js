// Select all slides and dots
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0; // Track the active slide
let slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds

// Function to change slides manually
function changeSlide(index) {
    clearInterval(slideInterval); // Reset the timer when user manually changes the slide
    updateSlide(index);
    slideInterval = setInterval(nextSlide, 5000); // Restart the timer
}

// Function to update the active slide
function updateSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
}

// Function to go to the next slide automatically
function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
    updateSlide(nextIndex);
}
