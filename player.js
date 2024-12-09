// let play;
// play = document.getElementById('play');


let song_name = ['onotoke', 'kickback'];
let song_index = 0;
let artist = ['CREEPY NUTS', '米津玄師'];


// 時間軸計時器
let songTimer; 

function startSongTimer(){
    // if(songTimer){
    //     clearInterval(songTimer);
    // }

    songTimer = setInterval(handleProgress, 1000);
}

function stopSongTimer(){
    if(songTimer){
        clearInterval(songTimer);
        songTimer = null;
    }
}


// play()、pause()是DOM元素，不是 jQuery 的 function，要用 jQuery 取得DOM元素
let state = 0;
function musicplay(){
    let audio = document.getElementById('Myaudio');

    if (state == 0){
        audio.play();
        state = 1;
        startSongTimer();
        // console.log(state);
    }else{
        audio.pause();
        state = 0
        stopSongTimer();
        // console.log(state);
    }
}

// 下一首修改音樂，歌名，歌手，圖片
function loadsong(song){
    $('#song_title').text(song);
    $('#artist_name').text(artist[song_index])

    $('#Myaudio').attr('src', `./song/${song}.m4a`);
    $('.album').attr('src', `./image/${song}.jpg`);

    
    $('#slider').attr('value', 0);
}

function nextsong(){
    if(song_index < song_name.length - 1){
        song_index++;
    }else{
        song_index = 0;
    }
    loadsong(song_name[song_index]);
}

function prevsong(){
    if(song_index > 0){
        song_index--;
    }else{
        song_index = song_name.length - 1;
    }
    loadsong(song_name[song_index]);
}

function handleProgress(){
    // duration：音源的時間(用get方式取得)
    let duration = $('#Myaudio').get(0).duration;
    // console.log(duration);
    let currentTime = $('#Myaudio')[0].currentTime;
    console.log(currentTime);

    let slider = $('#slider');
    let sliderPercent = (currentTime / duration) * 100;

    slider.attr('value', sliderPercent);
}

// function clickSlider(e){
//     const slider = document.getElementById('slider')
//     const width = $('#slider').width();
//     var elm = $(this);
//     var xpos = e.pageX - elm.offset().left;
//     console.log(xpos);
// }


// let state = 0
// play.addEventListener('click', musicPlay)

// 問題 : id:play抓不到  DOM Button Object
// 解決: run code until DOMContentLoaded has completed:
window.addEventListener("DOMContentLoaded", (event) => {
    const play = document.getElementById('play');
    if (play) {
        play.addEventListener('click', musicplay);
    }
})

// 下一首按鈕執行 nextsong()
window.addEventListener("DOMContentLoaded", (event) => {
    const next = document.getElementById('next')
    if (next) {
        next.addEventListener('click', nextsong);
    }
})

// 上一首執行 prevsong()
window.addEventListener("DOMContentLoaded", (event) => {
    const prev = document.getElementById('prev')
    if (prev) {
        prev.addEventListener('click', prevsong);
    }
})

window.addEventListener("DOMContentLoaded", (event) => {
    const slider = document.getElementById('slider')
    if (slider) {
        $('#slider').click(function clickSlider(e){
            
            const width = $('#slider').width();
            var elm = $(this);
            var xpos = e.pageX - elm.offset().left;
            // console.log(xpos);

            let duration = $('#Myaudio').get(0).duration;
            var theTime = (xpos / width) * duration;

            $('#Myaudio')[0].currentTime = theTime;
        });
    }
})



