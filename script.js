function createTrackItem(index, name, duration){
    var trackItem = document.createElement('div');
    trackItem.setAttribute("class", "playlist-track-doa");
    trackItem.setAttribute("id", "ptd-" + index);
    trackItem.setAttribute("data-index", index);
    document.querySelector(".playlist-doa").appendChild(trackItem);

    var playBtnItem = document.createElement('div');
    playBtnItem.setAttribute("class", "playlist-btn-play");
    playBtnItem.setAttribute("id", "pbp-" + index);
    document.querySelector("#ptd-"+index).appendChild(playBtnItem);

    var btnImg = document.createElement('i');
    btnImg.setAttribute("class", "fas fa-play");
    btnImg.setAttribute("height", "50");
    btnImg.setAttribute("width", "50");
    btnImg.setAttribute("id", "p-img-"+index);
    document.querySelector("#pbp-"+index).appendChild(btnImg);

    var trackInfoItem = document.createElement('div');
    trackInfoItem.setAttribute("class", "playlist-info-track");
    trackInfoItem.innerHTML = name
    document.querySelector("#ptd-"+index).appendChild(trackInfoItem);

    var trackDurationItem = document.createElement('div');
    trackDurationItem.setAttribute("class", "playlist-duration");
    trackDurationItem.innerHTML = duration
    document.querySelector("#ptd-"+index).appendChild(trackDurationItem);
  }

  for (var i = 0; i < listAudio.length; i++) {
      createTrackItem(i, listAudio[i].name, listAudio[i].duration);
  }

  var indexAudio = 0;

  function loadNewTrack(index){
    var player = document.querySelector('#source-audio')
    player.src = listAudio[index].file
    var skrip  = document.querySelector('#skrip')
    skrip.src  = listAudio[index].skrip
    var arab   = document.querySelector('#gbr')
    arab.src   = listAudio[index].arab
    document.querySelector('.arti').innerHTML  = listAudio[index].arti
    document.querySelector('.title').innerHTML = "- "+listAudio[index].name.toUpperCase()+" -"
    document.querySelector('.sanad').innerHTML = listAudio[index].sanad
    this.currentAudio = document.getElementById("myAudio");
    this.currentAudio.load()
    this.toggleAudio()
    this.updateStylePlaylist(this.indexAudio,index)
    this.indexAudio = index;
    // currentAudio.addEventListener('ended', function(){
    //   return loadNewTrack(index);
    // })
  }

  function skripLatex() {
    window.open(skrip.src);
  }

  var playListItems = document.querySelectorAll(".playlist-track-doa");

  for (let i = 0; i < playListItems.length; i++){
    playListItems[i].addEventListener("click", getClickedElement.bind(this));
  }

  function getClickedElement(event) {
    for (let i = 0; i < playListItems.length; i++){
      if(playListItems[i] == event.target){
        var clickedIndex = event.target.getAttribute("data-index")
        if (clickedIndex == this.indexAudio ) { //alert('Same audio');
            this.toggleAudio()
        }else{
            loadNewTrack(clickedIndex);
        }
      }
    }
  }

  document.querySelector('#source-audio').src = listAudio[indexAudio].file
  document.querySelector('#gbr').src          = listAudio[indexAudio].arab
  document.querySelector('.title').innerHTML  = "- "+listAudio[indexAudio].name.toUpperCase()+" -"
  document.querySelector('.arti').innerHTML   = listAudio[indexAudio].arti
  document.querySelector('.sanad').innerHTML  = listAudio[indexAudio].sanad
  document.querySelector('#skrip').src        = listAudio[indexAudio].skrip

  var currentAudio = document.getElementById("myAudio");
  // currentAudio.loop = true

  currentAudio.load()
  
  currentAudio.onloadedmetadata = function() {
     document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration)
  }.bind(this);

  var interval1;

  function toggleAudio() {
    if (this.currentAudio.paused) {
      document.querySelector('#icon-play').style.display = 'none';
      document.querySelector('#icon-pause').style.display = 'block';
      document.querySelector('#ptd-'+this.indexAudio).classList.add("active-track");
      this.playToPause(this.indexAudio)
      this.currentAudio.play();
    }else{
      document.querySelector('#icon-play').style.display = 'block';
      document.querySelector('#icon-pause').style.display = 'none';
      this.pauseToPlay(this.indexAudio)
      this.currentAudio.pause();
    }
  }

  function pauseAudio() {
    this.currentAudio.pause();
    clearInterval(interval1);
  }

  var timer       = document.getElementsByClassName('timer')[0]
  var barProgress = document.getElementById("myBar");
  var width       = 0;

  function onTimeUpdate() {
    var t = this.currentAudio.currentTime
    timer.innerHTML = this.getMinutes(t);
    this.setBarProgress();
    if (this.currentAudio.ended) {
      document.querySelector('#icon-play').style.display = 'block';
      document.querySelector('#icon-pause').style.display = 'none';
      this.pauseToPlay(this.indexAudio)
      if (this.indexAudio < listAudio.length-1) {
          var index = parseInt(this.indexAudio)+1
          this.loadNewTrack(index)
      }
    }
  }

  function setBarProgress(){
    var progress = (this.currentAudio.currentTime/this.currentAudio.duration)*100;
    document.getElementById("myBar").style.width = progress + "%";
  }

  function getMinutes(t){
    var min = parseInt(parseInt(t)/60);
    var sec = parseInt(t%60);
    if (sec < 10) {
      sec = "0"+sec
    }
    if (min < 10) {
      min = "0"+min
    }
    return min+":"+sec
  }

  var progressbar = document.querySelector('#myProgress')
  progressbar.addEventListener("click", seek.bind(this));

  function seek(event) {
    var percent = event.offsetX / progressbar.offsetWidth;
    this.currentAudio.currentTime = percent * this.currentAudio.duration;
    barProgress.style.width = percent*100 + "%";
  }

  function forward(){
    this.currentAudio.currentTime = this.currentAudio.currentTime + 5
    this.setBarProgress();
  }

  function rewind(){
    this.currentAudio.currentTime = this.currentAudio.currentTime - 5
    this.setBarProgress();
  }

  function next(){
    if (this.indexAudio < listAudio.length-1) {
        var oldIndex = this.indexAudio
        this.indexAudio++;
        updateStylePlaylist(oldIndex,this.indexAudio)
        this.loadNewTrack(this.indexAudio);
    }
  }

  function previous(){
    if (this.indexAudio>0) {
        var oldIndex = this.indexAudio
        this.indexAudio--;
        updateStylePlaylist(oldIndex,this.indexAudio)
        this.loadNewTrack(this.indexAudio);
    }
  }

  function updateStylePlaylist(oldIndex,newIndex){
    document.querySelector('#ptd-'+oldIndex).classList.remove("active-track");
    this.pauseToPlay(oldIndex);
    document.querySelector('#ptd-'+newIndex).classList.add("active-track");
    this.playToPause(newIndex)
  }

  function playToPause(index){
    var ele = document.querySelector('#p-img-'+index)
    ele.classList.remove("fa-play");
    ele.classList.add("fa-pause");
  }

  function pauseToPlay(index){
    var ele = document.querySelector('#p-img-'+index)
    ele.classList.remove("fa-pause");
    ele.classList.add("fa-play");
  }

  function toggleMute(){
    var btnMute = document.querySelector('#toggleMute');
    var volUp = document.querySelector('#icon-vol-up');
    var volMute = document.querySelector('#icon-vol-mute');
    if (this.currentAudio.muted == false) {
       this.currentAudio.muted = true
       volUp.style.display = "none"
       volMute.style.display = "block"
    }else{
      this.currentAudio.muted = false
      volMute.style.display = "none"
      volUp.style.display = "block"
    }
  }

  function semuaDoa() {
    var x = document.getElementById("playlist");
    var y = document.getElementById("info");
    var z = document.getElementById("optionRepeat");
    var a = document.getElementById("tentang");
    var b = document.getElementById("beranda");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
    } else {
      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
    }
  }

  function repeat(){
    var x = document.getElementById("optionRepeat");
    var y = document.getElementById("info");
    var z = document.getElementById("playlist");
    var a = document.getElementById("tentang");
    var b = document.getElementById("beranda");
    if(x.style.display === "none"){
      x.style.display = "block";
      y.style.display = "none";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
    } else{
      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
    }
  }

  function tentang(){
    var x = document.getElementById("optionRepeat");
    var y = document.getElementById("info");
    var z = document.getElementById("playlist");
    var a = document.getElementById("tentang");
    var b = document.getElementById("beranda");
    if(a.style.display === "none"){
      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "none";
      a.style.display = "block";
      b.style.display = "none";
    } else{
      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
    }
  }

  function beranda(){
    var x = document.getElementById("optionRepeat");
    var y = document.getElementById("info");
    var z = document.getElementById("playlist");
    var a = document.getElementById("tentang");
    var b = document.getElementById("beranda");
    if(b.style.display === "none"){
      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "block";
    } else{
      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
      a.style.display = "none";
      b.style.display = "none";
    }
  }

  $('#doa-search').keyup(function(){
    var searchField = $(this).val();
    if(searchField === '')  {
        $('#filter-records').html('');
        return;
    }
    
    var regex = new RegExp(searchField, "i");
    var output = '<div class="playlist-doa">';
        $.each(listAudio, function(key, val){
          if ((val.name.search(regex) != -1)) {
              output += '<p>' + val.name + '</p>';
          }
        });
        output += '</div>';
        $('#filter-records').html(output);
});