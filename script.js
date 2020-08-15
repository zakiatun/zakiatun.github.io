const menuToggle = document.querySelector('.menu-toggle input');
const nav        = document.querySelector('nav ul');

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('slide');
});

const btnplaylist      = document.querySelector('.playlist');
const btnPengulangan   = document.querySelector('.settings');
const tutup            = document.querySelector('.close');
const btnMore          = document.querySelector('.more');
const tutupPengulangan = document.querySelector('.pengulangan .close');
const popupPlaylist    = document.querySelector('.popup-doa-harian');
const popupPengulangan = document.querySelector('.popup-pengulangan');
const popupMore        = document.querySelector('.popup-more');


btnplaylist.addEventListener('click', function(){
    popupPlaylist.style.opacity = '1';
    popupPlaylist.style.zIndex = '99999';
});

tutup.addEventListener('click', function(){
    popupPlaylist.style.opacity = '0';
    popupPlaylist.style.zIndex = '-99999';
});

btnPengulangan.addEventListener('click', function(){
    popupPengulangan.style.opacity = '1';
    popupPengulangan.style.zIndex = '99999';
});

tutupPengulangan.addEventListener('click', function(){
    popupPengulangan.style.opacity = '0';
    popupPengulangan.style.zIndex = '-99999';
});

btnMore.addEventListener('click', function(){
    if(popupMore.style.opacity === '0'){
        popupMore.style.opacity = '1';
        popupMore.style.zIndex = '99999';
    }
    else{
        popupMore.style.opacity = '0';
        popupMore.style.zIndex = '-99999';
    }
});

let indexHarian = 0;
let suara       = new Audio();
suara.src       = 'audio-doa/' + playlistHarian[indexHarian].mp3;
suara.loop      = false;
suara.pause();

const judul  = document.querySelector('.judul-doa');
const arab   = document.querySelector('.gambar-doa img');
const arti   = document.querySelector('#arti');
const sanad  = document.querySelector('#sanad');
const latex  = document.querySelector('.latex-doa');
const pdf    = document.querySelector('.pdf-doa');

judul.innerHTML = playlistHarian[indexHarian].judul;
arab.src        = 'img-doa/' + playlistHarian[indexHarian].arab;
arti.innerHTML  = playlistHarian[indexHarian].arti;
sanad.innerHTML = playlistHarian[indexHarian].sanad;
latex.src       = 'latex-doa/' + playlistHarian[indexHarian].latex;
pdf.src         = 'pdf-doa/' + playlistHarian[indexHarian].pdf;

latex.addEventListener('click', function(){
    window.open(latex.src);
})

pdf.addEventListener('click', function(){
    window.open(pdf.src);
})

const btnPlay  = document.querySelector('.play');
const btnPause = document.querySelector('.pause');

const btnPlayPause = document.querySelector('.play-pause');
btnPlayPause.addEventListener('click', function(){
    if(suara.paused){
        suara.play();
        btnPlay.style.display  = 'none';
        btnPause.style.display = 'block';
    } else{
        suara.pause();
        btnPlay.style.display  = 'block';
        btnPause.style.display = 'none';
    }
});

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

const waktuSekarang = document.querySelector('.waktu-sekarang');
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

suara.addEventListener('ended', function(){
    gantiTrack();
});

function gantiTrack(){
    if(indexHarian == playlistHarian.length - 1){
        indexHarian = 0;
    } else{
        indexHarian++;
    }

    suara.src       = 'audio-doa/' + playlistHarian[indexHarian].mp3;
    suara.play();

    judul.innerHTML = playlistHarian[indexHarian].judul;
    arab.src        = 'img-doa/' + playlistHarian[indexHarian].arab;
    arti.innerHTML  = playlistHarian[indexHarian].arti;
    sanad.innerHTML = playlistHarian[indexHarian].sanad;
    latex.src       = 'latex-doa/' + playlistHarian[indexHarian].latex;
    pdf.src         = 'pdf-doa/' + playlistHarian[indexHarian].pdf;

    latex.addEventListener('click', function(){
        window.open(latex.src);
    })

    pdf.addEventListener('click', function(){
        window.open(pdf.src);
    })
}

const next = document.querySelector('.next');
next.addEventListener('click', function(){
    indexHarian++;
    if(indexHarian > playlistHarian.length - 1){
        indexHarian = 0;
    };

    btnPlay.style.display  = 'none';
    btnPause.style.display = 'block';

    suara.src       = 'audio-doa/' + playlistHarian[indexHarian].mp3;
    suara.play();

    judul.innerHTML = playlistHarian[indexHarian].judul;
    arab.src        = 'img-doa/' + playlistHarian[indexHarian].arab;
    arti.innerHTML  = playlistHarian[indexHarian].arti;
    sanad.innerHTML = playlistHarian[indexHarian].sanad;
    latex.src       = 'latex-doa/' + playlistHarian[indexHarian].latex;
    pdf.src         = 'pdf-doa/' + playlistHarian[indexHarian].pdf;

    latex.addEventListener('click', function(){
        window.open(latex.src);
    })

    pdf.addEventListener('click', function(){
        window.open(pdf.src);
    })
});

const previous = document.querySelector('.previous');
previous.addEventListener('click', function(){
    indexHarian--;
    if(indexHarian < 0){
        indexHarian = playlistHarian.length - 1;
    };

    btnPlay.style.display  = 'none';
    btnPause.style.display = 'block';

    suara.src       = 'audio-doa/' + playlistHarian[indexHarian].mp3;
    suara.play();

    judul.innerHTML = playlistHarian[indexHarian].judul;
    arab.src        = 'img-doa/' + playlistHarian[indexHarian].arab;
    arti.innerHTML  = playlistHarian[indexHarian].arti;
    sanad.innerHTML = playlistHarian[indexHarian].sanad;
    latex.src       = 'latex-doa/' + playlistHarian[indexHarian].latex;
    pdf.src         = 'pdf-doa/' + playlistHarian[indexHarian].pdf;

    latex.addEventListener('click', function(){
        window.open(latex.src);
    })

    pdf.addEventListener('click', function(){
        window.open(pdf.src);
    })
})

for(i = 0; i < playlistHarian.length; i++){
    const track = document.createElement('div');
    track.setAttribute('class', 'track');
    document.querySelector('.playlist-harian').appendChild(track);

    track.innerHTML = playlistHarian[i].judul;
}

const tTrack = document.querySelectorAll('.track');
for (let indexHarian = 0; indexHarian < tTrack.length; indexHarian++){
    tTrack[indexHarian].addEventListener('click', function(){
        btnPlay.style.display  = 'none';
        btnPause.style.display = 'block';

        suara.src       = 'audio-doa/' + playlistHarian[indexHarian].mp3;
        suara.play();

        judul.innerHTML = playlistHarian[indexHarian].judul;
        arab.src        = 'img-doa/' + playlistHarian[indexHarian].arab;
        arti.innerHTML  = playlistHarian[indexHarian].arti;
        sanad.innerHTML = playlistHarian[indexHarian].sanad;
        latex.src       = 'latex-doa/' + playlistHarian[indexHarian].latex;
        pdf.src         = 'pdf-doa/' + playlistHarian[indexHarian].pdf;

        latex.addEventListener('click', function(){
            window.open(latex.src);
        });

        pdf.addEventListener('click', function(){
            window.open(pdf.src);
        });
    });
}

const cari = document.querySelector('.cari');
const track = document.querySelectorAll('.track');
cari.addEventListener('keyup', function(){
    Array.prototype.forEach.call(track, function(e){
        if(e.textContent.toLowerCase().indexOf(cari.value) > -1){
            e.style.display = 'block';
        } else {
            e.style.display = 'none';
        }
    });
});