let temperature = 78; // Initial temperature
let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    "🎵 'I Lost My Socks Again'",
    "🎵 'Dancing With My Cat'",
    "🎵 'Banana Peels & Broken Heels'",
    "🎵 'Oops, I Forgot the Lyrics'",
    "🎵 'Funky Chicken Remix'"
];

function updateTemperatureDisplay() {
    document.getElementById("tempValue").innerText = temperature + "°F";
}

function increaseTemperature() {
    temperature++;
    updateTemperatureDisplay();
}

function decreaseTemperature() {
    temperature--;
    updateTemperatureDisplay();
}

function controlLighting() {
    let lightSwitch = document.getElementById("lightSwitch");
    console.log(lightSwitch.checked ? "Lights turned ON" : "Lights turned OFF");
}

function togglePlayPause() {
    if (!isPlaying) {
        isPlaying = true;
        document.getElementById("songName").innerText = songs[currentSongIndex];
        console.log("Playing:", songs[currentSongIndex]);
    } else {
        isPlaying = false;
        console.log("Music Paused");
    }
}

function stopMusic() {
    isPlaying = false;
    document.getElementById("songName").innerText = "Click Play to Start";
    console.log("Music Stopped");
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    document.getElementById("songName").innerText = songs[currentSongIndex];
    console.log("Now Playing:", songs[currentSongIndex]);
}
