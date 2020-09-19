const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');

// Music
const songs = [
    {
        name: 'Self Esteem',
        displayName: 'Self Esteem',
        artist: 'The Offspring',
        albumArt: 'off',
    },
    {
        name: 'The Kids Aren\'t Alright',
        displayName: 'The Kids Aren\'t Alright',
        artist: 'The Offspring',
        albumArt: 'off2',
    },
    {
        name: 'Want You Bad',
        displayName: 'Want You Bad',
        artist: 'The Offspring',
        albumArt: 'off3',
    },
    {
        name: 'Somewhere I Belong',
        displayName: 'Somewhere I Belong',
        artist: 'Linkin Park',
        albumArt: 'Linkin',
    },
    {
        name: 'Numb',
        displayName: 'Numb',
        artist: 'Linkin Park',
        albumArt: 'Linkin2',
    },
    {
        name: 'Crawling',
        displayName: 'Crawling',
        artist: 'Linkin Park',
        albumArt: 'Linkin3',
    },
    {
        name: 'Pushing Me Away',
        displayName: 'Pushing Me Away',
        artist: 'Linkin Park',
        albumArt: 'Linkin4',
    },
];

// Check if playing
let isPlaying = false;

// Shuffle Songs
function shuffleSongs() { 
    isPlaying = true;
    loadSong(songs[Math.floor(Math.random() * songs.length)]);
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
};

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.albumArt}.jpg`;
}

// Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


//Next Song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Stop Song
function stopSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Stop');
    loadSong(songs[songIndex]);
}

// On load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar And Time
function updateProgressBar (e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        console.log(duration, currentTime);
        // Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
    }
}

//Event Listeners
shuffleBtn.addEventListener('click', shuffleSongs);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
stopBtn.addEventListener('click', stopSong);
music.addEventListener('timeupdate', updateProgressBar)
