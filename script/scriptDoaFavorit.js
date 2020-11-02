const judulDoa = document.querySelector('.judul-doa');
const arabDoa   = document.querySelector('.arab-doa img');
const artiDoa   = document.querySelector('.arti-doa');
const sanadDoa  = document.querySelector('.sanad-doa');

let indexDoa = 0;
let suara    = new Audio();
suara.loop   = false;

suara.pause();
suara.src          = '../suara/' + objFavorit[indexDoa].mp3;
judulDoa.innerHTML = objFavorit[indexDoa].judul;
arabDoa.src        = '../arab/' + objFavorit[indexDoa].arab;
artiDoa.innerHTML  = objFavorit[indexDoa].arti;
sanadDoa.innerHTML = objFavorit[indexDoa].sanad;

function infoDoa(index){
    suara.src          = '../suara/' + objFavorit[index].mp3;
    judulDoa.innerHTML = objFavorit[index].judul;
    arabDoa.src        = '../arab/' + objFavorit[index].arab;
    artiDoa.innerHTML  = objFavorit[index].arti;
    sanadDoa.innerHTML = objFavorit[index].sanad;
    pP();
    suara.play();
}

suara.onended = function(){
  tanpaPengulangan();
};

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
    if(detikDurasi<10){detikDurasi     = "0"+detikDurasi}

    waktuSekarang.innerHTML = menitSekarang + ":" + detikSekarang;
    durasi.innerHTML        = menitDurasi + ":" + detikDurasi;
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
        indexDoa = objFavorit.length - 1;
    };
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
});

btnNext.addEventListener('click', function(){
    let indexLama = indexDoa
    indexDoa++;
    if(indexDoa > objFavorit.length - 1){
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
    document.querySelector('#doa-'+indexBaru).classList.add("mainkan");
    playToPause(indexBaru)
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
    if(indexDoa >= objFavorit.length - 1){
        indexDoa = 0;
    } else{
        indexDoa++;
    }
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
}

function tanpaPengulangan(){
    let indexLama = indexDoa;
    if(indexDoa == objFavorit.length - 1){
        btnPause.style.display = 'none';
        btnPlay.style.display  = 'block';
    }
    indexDoa++;
    updateStylePlaylist(indexLama, indexDoa)
    infoDoa(indexDoa);
}

function itemPlaylist(index, judul, pdf, latex){
    const track = document.createElement('div');
    track.setAttribute('class','track');
    track.setAttribute('id', 'doa-' + index)
    document.querySelector('.playlist-favorit').appendChild(track);

    const btnPlayPause = document.createElement('button');
    btnPlayPause.setAttribute('class', 'pp pp-play');
    btnPlayPause.setAttribute('id', 'pp-' + index);
    btnPlayPause.setAttribute('data-index', index);
    document.querySelector('#doa-' + index).appendChild(btnPlayPause);

    const judulTrack = document.createElement('span');
    judulTrack.innerHTML = judul;
    document.querySelector('#doa-' + index).appendChild(judulTrack);

    const btnMore = document.createElement('button');
    btnMore.setAttribute('class', 'btn-more');
    btnMore.setAttribute('id', 'btn-more-' + index);
    document.querySelector('#doa-' + index).appendChild(btnMore);

    const div = document.createElement('div');
    div.setAttribute('class', 'more');
    div.setAttribute('id', 'more-' + index);
    document.querySelector('#btn-more-' + index).appendChild(div)

    const hapusTrack = document.createElement('button');
    hapusTrack.setAttribute('class', 'hapus');
    hapusTrack.setAttribute('data-index', index);
    hapusTrack.innerHTML = 'Hapus Doa';
    document.querySelector('#more-' + index).appendChild(hapusTrack); 

    const btnPdf = document.createElement('button');
    btnPdf.setAttribute('class', 'pdf');
    btnPdf.setAttribute('data-index', index);
    btnPdf.innerHTML = 'File Pdf';
    btnPdf.src = '../pdf/' + pdf;
    document.querySelector('#more-' + index).appendChild(btnPdf);

    const btnLatex = document.createElement('button');
    btnLatex.setAttribute('class', 'latex');
    btnLatex.setAttribute('data-index', index);
    btnLatex.innerHTML = 'Kode Latex';
    btnLatex.src = '../latex/' + latex;
    document.querySelector('#more-' + index).appendChild(btnLatex);
}

for(let i = 0; i < objFavorit.length; i++){
   itemPlaylist(i, objFavorit[i].judul), objFavorit[i].pdf, objFavorit[i].latex;
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

const lihatPdf = document.querySelectorAll('.pdf');

for(let i = 0; i < lihatPdf.length; i++){
    lihatPdf[i].addEventListener('click', function(){
        window.open('../pdf/'+objFavorit[i].pdf);
    });
}

const lihatLatex = document.querySelectorAll('.latex');

for(let i = 0; i < lihatLatex.length; i++){
    lihatLatex[i].addEventListener('click', function(){
        window.open('../latex/'+objFavorit[i].latex);
    });
}

const listTrackBaru = document.querySelector('.playlist-favorit');

listTrackBaru.addEventListener('click', function(e){
    let data      = localStorage.getItem('objHarian');
    let objHarian = JSON.parse(data);

    let objFavorit = JSON.parse(localStorage.getItem('objFavorit'));
    
    let targetDoa = e.target;

    if(targetDoa.classList[0] === 'hapus'){
        let idTarget = targetDoa.getAttribute('data-index');
        for(keys in objFavorit[idTarget]){
            if(keys == 'favorit' && objFavorit[idTarget][keys] == true){
                let cek = objHarian.find((item) => item.id === objFavorit[idTarget].id);
                if (cek){
                    let hapus = confirm('Kamu yakin ingin menghapus doa ini?');
                    if(hapus === true){
                        cek.favorit = false;
                        objFavorit.splice(idTarget, 1);
                        targetDoa.parentElement.style.display = 'none';
                        location.reload()
                    }
                } 
            }
        }
    localStorage.setItem('objFavorit', JSON.stringify(objFavorit));
    localStorage.setItem('objHarian', JSON.stringify(objHarian));
    }
})

function cari() { 
    let input = document.querySelector('.cari').value 
    input = input.toLowerCase(); 
    let x = document.getElementsByClassName('track'); 
      
    for (i = 0; i < x.length; i++) {  
        if (!x[i].innerHTML.toLowerCase().includes(input)) { 
            x[i].style.display="none"; 
        } 
        else { 
            x[i].style.display="flex";                  
        } 
    } 
}