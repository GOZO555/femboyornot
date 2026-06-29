const answers = [
    "femboy",
    "femboy",
    "woman",
    "femboy",  
    "woman",
];

let order = [];
for (let i = 1; i <= answers.length; i++) {
    order.push(i);
}

// Fisher-Yates shuffle
for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
}

let current = 0;
let score = 0;
let canGuess = false;
let countdown;

const video = document.getElementById("video");
const result = document.getElementById("result");
const music = document.getElementById("music");

music.volume = 0.08;

loadVideo();

function loadVideo() {

    clearInterval(countdown);

    canGuess = false;

    result.innerHTML = "";

    const vid = order[current];

    video.src = `videos/${vid}.mp4`;

    video.load();

    video.play().catch(()=>{});

}

video.onended = function(){

    canGuess = true;

    let time = 7;

    result.innerHTML = "⏳<br>" + time;

    countdown = setInterval(function(){

        time--;

        if(time>0){

            result.innerHTML="⏳<br>"+time;

        }else{

            clearInterval(countdown);

            nextVideo();

        }

    },1000);

};

function guess(choice){

    if(!music.paused){

    }else{

        music.play().catch(()=>{});

    }

    if(!canGuess){

        result.innerHTML="🚫<br>Nuh uh!";

        return;

    }

    clearInterval(countdown);

    const originalVideo = order[current];

    if(choice===answers[originalVideo-1]){

        score++;

    }

    nextVideo();

}

function nextVideo(){

    canGuess=false;

    current++;

    if(current>=order.length){

        document.body.innerHTML=`
        <div class="container">
            <h1>Game Over!</h1>
            <h2>${score}/${order.length}</h2>
            <h2>${Math.round(score/order.length*100)}%</h2>
            <button onclick="location.reload()">Play Again</button>
        </div>
        `;

        return;

    }

    loadVideo();

}
