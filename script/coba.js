const judulDoa = document.querySelector('.judul-doa');
const arabDoa   = document.querySelector('.arab-doa img');
const artiDoa   = document.querySelector('.arti-doa');
const sanadDoa  = document.querySelector('.sanad-doa');

let indexDoa = 0;
let suara    = new Audio();
suara.src    = '../suara/' + objHarian[indexDoa].mp3;
suara.loop   = false;
suara.pause();

suara.onended = function(){
  tanpaPengulangan();
};

judulDoa.innerHTML = objHarian[indexDoa].judul;
arabDoa.src        = '../arab/' + objHarian[indexDoa].arab;
artiDoa.innerHTML  = objHarian[indexDoa].arti;
sanadDoa.innerHTML = objHarian[indexDoa].sanad;

const slider = document.querySelector('.slider');
let geser    = true;

slider.addEventListener('mouseup', function(e){
    setPosisiSuara(e);
});

function setPosisiSuara(e){
    if(geser){
        let posisiSuara   = suara.duration * (slider.value/100);
        suara.currentTime = posisiSuara;
    }
}

const waktuSekarang = document.querySelector('.waktu');
const durasi        = document.querySelector('.durasi');

suara.addEventListener('timeupdate', function(){
    updateWaktu();
});

function updateWaktu(){
    let waktuBaru = suara.currentTime * (100 / suara.duration);
    slider.value  = waktuBaru;

    let menitSekarang = Math.floor(suara.currentTime/60);
    let detikSekarang = Math.floor(suara.currentTime - menitSekarang * 60);
    let menitDurasi   = Math.floor(suara.duration/60);
    let detikDurasi   = Math.floor(suara.duration - menitDurasi * 60);

    if(menitSekarang<10){menitSekarang = "0"+menitSekarang}
    if(detikSekarang<10){detikSekarang = "0"+detikSekarang}
    if(menitDurasi<10){menitDurasi     = "0"+menitDurasi}
    if(detikSekarang<10){detikSekarang = "0"+detikSekarang}

    waktuSekarang.innerHTML = menitSekarang + ":" + detikSekarang;
    durasi.innerHTML        = menitDurasi + ":" + detikDurasi;
}

function infoDoa(index){
    suara.src          = '../suara/' + objHarian[index].mp3;
    judulDoa.innerHTML = objHarian[index].judul;
    arabDoa.src        = '../arab/' + objHarian[index].arab;
    artiDoa.innerHTML  = objHarian[index].arti;
    sanadDoa.innerHTML = objHarian[index].sanad;

    pP();
    suara.play();
}

const btnPrevious  = document.querySelector('.previous');
const playPause    = document.querySelector('.play-pause');
const btnPlay      = document.querySelector('.play');
const btnPause     = document.querySelector('.pause');
const btnNext      = document.querySelector('.next');

btnPrevious.addEventListener('click', function(){
    let indexLama = indexDoa;
    indexDoa--;
    if(indexDoa < 0 ){
        indexDoa = objHarian.length - 1;
    };
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
});

btnNext.addEventListener('click', function(){
    let indexLama = indexDoa
    indexDoa++;
    if(indexDoa > objHarian.length - 1){
        indexDoa = 0;
    };
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
});

playPause.addEventListener('click', pP);

function pP(){
    if(suara.paused){
        suara.play();
        btnPause.style.display = 'block';
        btnPlay.style.display  = 'none';
        document.querySelector('#doa-'+indexDoa).classList.add("mainkan");
        playToPause(indexDoa)
    }else{
        suara.pause();
        btnPause.style.display = 'none';
        btnPlay.style.display  = 'block';
        pauseToPlay(indexDoa)
    }
}

function updateStylePlaylist(indexLama, indexBaru){
    document.querySelector('#doa-'+indexLama).classList.remove("mainkan");
    pauseToPlay(indexLama);
    document.querySelector('#doa-'+indexBaru).classList.remove("mainkan");
    playToPause(indexBaru);
}

function playToPause(indexDoa){
    let ele = document.querySelector('#pp-'+indexDoa)
    ele.classList.remove("pp-play");
    ele.classList.add("pp-pause");
}

function pauseToPlay(indexDoa){
    let ele = document.querySelector('#pp-'+indexDoa)
    ele.classList.remove("pp-pause");
    ele.classList.add("pp-play");
}

const pengulangan = document.querySelector('.repeating');
const btnTanpa    = document.querySelector('.none');
const btnSatu     = document.querySelector('.one');
const btnSemua    = document.querySelector('.all');

btnTanpa.addEventListener('click', function(){
  btnTanpa.style.display = 'none';
  btnSatu.style.display  = 'block';
  btnSemua.style.display = 'none';

  suara.loop = true;
});

btnSatu.addEventListener('click', function(){
  btnTanpa.style.display = 'none';
  btnSatu.style.display  = 'none';
  btnSemua.style.display = 'block';

  suara.loop  = false;
  suara.onended = function(){
      ulangiSemua();
  }
});

btnSemua.addEventListener('click', function(){
  btnTanpa.style.display = 'block';
  btnSatu.style.display  = 'none';
  btnSemua.style.display = 'none';

  suara.loop    = false;
  suara.onended = function(){
      tanpaPengulangan();
  }
});

function ulangiSemua(){
    let indexLama = indexDoa;
    if(indexDoa >= objHarian.length - 1){
        indexDoa = 0;
    } else{
        indexDoa++;
    }
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
}

function tanpaPengulangan(){
    let indexLama = indexDoa;
    if(indexDoa == objHarian.length - 1){
        btnPause.style.display = 'none';
        btnPlay.style.display  = 'block';
    }
    indexDoa++;
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
}

function itemPlaylist(index, judul){
    const track = document.createElement('div');
    track.setAttribute('class','track');
    track.setAttribute('id', 'doa-' + index)
    document.querySelector('.playlist-harian').appendChild(track);

    const btnPlayPause = document.createElement('button');
    btnPlayPause.setAttribute('class', 'pp pp-play');
    btnPlayPause.setAttribute('id', 'pp-' + index);
    btnPlayPause.setAttribute('data-index', index);
    document.querySelector('#doa-' + index).appendChild(btnPlayPause);

    const judulTrack = document.createElement('span');
    judulTrack.innerHTML = judul;
    document.querySelector('#doa-' + index).appendChild(judulTrack);

    const favoritTrack = document.createElement('button');
    favoritTrack.setAttribute('class', 'favorit');
    favoritTrack.setAttribute('data-index', index);
    document.querySelector('#doa-' + index).appendChild(favoritTrack); 
}

for(let i = 0; i < objHarian.length; i++){
   itemPlaylist(i, objHarian[i].judul);
}

const tTrack = document.querySelectorAll('.pp')

for(let i = 0; i < tTrack.length; i++){
    tTrack[i].addEventListener('click', gantiTrack.bind(this));
}

function gantiTrack(event){
  for(let i = 0; i < tTrack.length; i++){
      if(tTrack[i] == event.target){
          let indexTrack = event.target.getAttribute('data-index');
          if(indexTrack == indexDoa){
              pP();
          } else{ 
            indexDoa = parseInt(indexTrack);
            infoDoa(indexDoa);
          }
      } else{
        tTrack[i].classList.remove('pp-pause');
        tTrack[i].classList.add('pp-play');
        tTrack[i].parentElement.classList.remove('mainkan');
      }
  }
}

const listTrack = document.querySelector('.playlist-harian');

listTrack.addEventListener('click', function(e){
  let data      = localStorage.getItem('objHarian');
  let objHarian = JSON.parse(data);

  let targetDoa = e.target;

  if(targetDoa.classList[0] === 'favorit'){
  let idTarget = targetDoa.getAttribute('data-index');
      for(keys in objHarian[idTarget]){
          if(keys == 'favorit' && objHarian[idTarget][keys] == true){
              alert('Sudah ditambahkan!!')
          } else if(keys == 'favorit' && objHarian[idTarget][keys] == false){
              alert('Data berhasil ditambahkan !!')
              objHarian[idTarget].favorit = true;
              targetDoa.style.backgroundImage = 'url(../icon/favorite.png)';

              let dataBaru = objHarian[idTarget];

              if(localStorage.getItem('objFavorit') == null){
                  localStorage.setItem('objFavorit','[]')
              }

              let objFavorit = JSON.parse(localStorage.getItem('objFavorit'));
              objFavorit.unshift(dataBaru);

              localStorage.setItem('objFavorit', JSON.stringify(objFavorit))
          }
      }
  localStorage.setItem('objHarian', JSON.stringify(objHarian));
  }
});

