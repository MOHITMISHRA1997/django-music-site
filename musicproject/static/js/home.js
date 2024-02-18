// Gettig all the buttons
const player = document.querySelector(".audio-player")
const play = document.getElementById("play")
const image = document.querySelector(".music_img")
const prev = document.getElementById("prev")
const next = document.getElementById("next")

const artist = document.querySelector(".artist")
const title = document.querySelector(".song-title")
const progress = document.querySelector(".progress")
const progress_div = document.querySelector(".progress_div")

const curr_time = document.getElementById("current_time")
const dur_time = document.getElementById("duration")





// Bringing whole music list from the backend
const music_list = JSON.parse(document.getElementById("musics").textContent)
console.log(music_list[0])


//Setting inital music index
var music_index = 0


const SetSRC = () => {
    player.src = `media/${music_list[music_index].song_file}`
    image.src = `media/${music_list[music_index].image}`
    title.textContent = `${music_list[music_index].title}`
    artist.textContent = `${music_list[music_index].artist}`
    console.log('these info will get set after every reload')
}



// Setting player on playorpause

const playorpause = () => {
    if (player.paused) {
        player.play();
        // play.classList.replace('fa-play', 'fa-pause')
        changingTheIcons(music_index,'pause',play,1)
        changingTheIcons(music_index,'play',play)

        //Adding event listner to know that player is ended
        player.addEventListener('ended', function () {
            changingTheIcons(music_index,'pause',play,1)
        })

    } else {
        player.pause();
        console.log('player is paused');
        // play.classList.replace('fa-pause', 'fa-play')
        changingTheIcons(music_index,'pause',play,1)
    }
};


//changing the color of the elements while playing
const changingTheIcons = (index, play_or_pause, play, next = 0) => {
    const element = document.getElementById(index)
    const ele_title = document.getElementById(`title${index}`)
    const ele_artist = document.getElementById(`artist${index}`)

    if (play_or_pause == 'play') {
        element.classList.replace('fa-play', 'fa-pause')
        play.classList.replace('fa-play', 'fa-pause')
        element.style.color = '#ee1805'
        ele_title.style.color = '#fb3726'
        ele_artist.style.color = '#d36359'
    } else {
        element.classList.replace('fa-pause', 'fa-play')
        play.classList.replace('fa-pause', 'fa-play')
    }
    if(next == 1){
        element.style.color = '#fffefe'
        ele_title.style.color = '#fffefe'
        ele_artist.style.color = '#fffefe'
    }

}



//Playing from playlist
const getsong = (event) =>{
    const ele_index = parseInt(event.id)
    changingTheIcons(music_index,'pause',play,1) // i used this to remove the colour of the previous element that was played the music_index was set there at - 1
    changingTheIcons(ele_index,'play',play)
    if(ele_index == music_index){
        if(player.paused){
            player.play() //i didnt set setsrc() because it is already set at the starting
            changingTheIcons(ele_index,'play',play)
            player.addEventListener('ended', function () {
                changingTheIcons(music_index,'pause',play,1)
            })
        }else{
            player.pause()
            changingTheIcons(ele_index,'pause',play,1)
        }
    }
    else{
        music_index = ele_index // 1
        SetSRC()
        player.play()
        changingTheIcons(music_index,'play',play)
    }


}

prev.addEventListener('click',function (){
    const music_list_len = music_list.length
    changingTheIcons(music_index,'pause',play,1) //i set this here to change the previous played element to pause and changed the icon
    k = music_index - 1
    music_index = k
    if (music_index < 0){
        music_index = music_index + 1
        console.log('increased') 
    }
    SetSRC()
    playorpause()

})


next.addEventListener('click',function (){
    const music_list_len = music_list.length
    changingTheIcons(music_index,'pause',play,1)
    music_index =   music_index + 1
    if (music_index == music_list_len){
        music_index = music_list_len -1
        console.log('increased') 
    }
    SetSRC()
    playorpause()

})


player.addEventListener('timeupdate',function (event){
    let currentTime = event.srcElement.currentTime // current time

    let duration = event.srcElement.duration // total time length

    let progress_time = (currentTime/duration)*100
    
    progress.style.width = `${progress_time}%` // setting length of the progress as time goes by
    
    let r1 = Math.floor(duration / 60) // to current in seconds to minute
    let r2 = Math.floor(duration % 60)

    let l1 = Math.floor(currentTime / 60);
    let l2 = Math.floor(currentTime % 60);
    if (duration) {
        if (l2 < 10)
            l2 = '0' + l2;
        if (r2 < 10)
            r2 = '0' + r2;
        curr_time.innerText = l1 + ":" + l2;//this curr_time is the curr  element
        dur_time.innerText = r1 + ":" + r2;//this dur_time is the dur_time element
    }
})

progress_div.addEventListener('click',function (event){
    let move_progress = ((event.offsetX) / (progress_div.clientWidth)) * player.duration;
    player.currentTime = move_progress;
})



//making play button work
play.addEventListener('click', playorpause)

SetSRC()
