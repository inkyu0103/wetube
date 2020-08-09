const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () =>{
  const videoId= window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`,{
    method:"POST"
  });
}


/* function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }else{

        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
}
*/


const handlePlayClick = () =>{
  if (videoPlayer.paused){
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }else{
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
  }
}

const goFullScreen = () =>{
  videoPlayer.requestFullscreen();
}


function handleVolumeClick() {
    if (videoPlayer.muted) {
      videoPlayer.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      volumeRange.value = videoPlayer.volume;
    } else {
      volumeRange.value =0;
      videoPlayer.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  }

  function handleEnded(){
    registerView();
    videoPlayer.currentTime = 0;
  }

  function handleDrag(event){
    const {
      target : {value}
    } = event;
    videoPlayer.volume = value;

    if (value >0.7){
      volumeBtn.innerHTML ='<i class="fas fa-volume-up"></i>';
    }else if( value >= 0.2){
      volumeBtn.innerHTML ='<i class="fas fa-volume-down"></i>';
    } else{
      volumeBtn.innerHTML ='<i class="fas fa-volume-off"></i>';
      
    }
  }


  function init(){
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click",handlePlayClick);
    volumeBtn.addEventListener("click",handleVolumeClick);
    fullScrnBtn.addEventListener("click",goFullScreen);
    videoPlayer.addEventListener("loadedmetadata",setTotalTime);
    videoPlayer.addEventListener("ended",handleEnded);
    volumeRange.addEventListener("input",handleDrag);
}

// 이벤트 리스너를 init에 추가하는 이유는 이 페이지에 있다는 것을 체크하기 위해서이다.

if(videoContainer){
    init();
}



const formatDate = seconds =>{
  const secondsNumber = parseInt(seconds,10);
  let hours = Math.floor(secondsNumber/3600);
  let minutes = Math.floor((secondsNumber-hours *3600)/60);
  let totalSeconds =secondsNumber -hours*3600 -minutes *60;

  if (hours < 10) {
      hours = `0${hours}`;
  }

  if (minutes<10){
    minutes = `0${minutes}`;
  }

  if (seconds < 10){
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;

};

function getCurrentTime(){
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

/*const setTotalTime = () => {
  console.log(videoPlayer.duration);
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;

}
*/
function setTotalTime () {
    const totalTimeString = formatDate(videoPlayer.duration);
    setInterval(getCurrentTime,1000);
    totalTime.innerHTML = totalTimeString;
}