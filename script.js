const playListContainerTag = document.getElementsByClassName("playListContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotalTimeDiv = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgress");

const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];

// madking the arry to keep the musics mp3
const tracks = [
    {trackId : "music/track1.mp3", title : "Myanmar Yoe Yar - Dee Lone"},
    {trackId : "music/track2.mp3", title : "A Phyu Yaung Nya - Sai Sai"},
    {trackId : "music/track3.mp3", title : "Lan Ma Gee Yk AwayDee Lone"},
];

for (let i = 0; i < tracks.length;i++) {
    const trackTag = document.createElement("div");
    trackTag.classList.add("trackItem");
    trackTag.addEventListener("click",() => {
        currentPlayingIndex = i;
        playSong();
        // console.log(audioTag.duration); 
    })
    const title = ( i + 1).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playListContainerTag.append(trackTag);

};

durationText = "00:00" ;
let duration = 0;

audioTag.addEventListener("loadeddata",() => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);
});

const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500/duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}


audioTag.addEventListener("timeupdate",() => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeAndDurationText = currentTimeText  + " / " + durationText;
    currentAndTotalTimeDiv.textContent = currentTimeAndDurationText;
    updateCurrentProgress(currentTime);
});

const createMinuteAndSecondText = (totalseconds) => {
    const minutes = Math.floor(totalseconds /60);
    const sec = totalseconds % 60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secText = sec < 10 ? "0" + sec.toString() : sec;

    return minuteText + ":" + secText;
};

let currentPlayingIndex = 0;

playButtonTag.addEventListener("click",() => {
    const currentTime = Math.floor(audioTag.currentTime);
    if (currentTime === 0) {
        playSong();
    } else {
        audioTag.play();
        updatePlayButton();

    };

    

});

pauseButtonTag.addEventListener("click",() => {
    audioTag.pause();
    updatePauseButton();
});


const updatePlayButton = () => {
    pauseButtonTag.style.display = "inline";
    playButtonTag.style.display = "none";
};

const updatePauseButton = () => {
    pauseButtonTag.style.display = "none";
    playButtonTag.style.display = "inline";
};

previousButtonTag.addEventListener ("click",() => {
    if (currentPlayingIndex === 0) {
        return;
    } else {
        currentPlayingIndex -= 1;
        playSong();
    }
});

nextButtonTag.addEventListener ("click",() => {
    if (currentPlayingIndex === tracks.length -1) {
        return;
    } else {
        currentPlayingIndex += 1;
        playSong();
        }
});

const playSong = () => {
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    updatePlayButton();
}