const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 600,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        currentLife: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 600),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result + ".");
        state.values.currentLife--;
        state.view.lives.textContent = "x" + state.values.currentLife;
        restartGame();
    }

    if(state.values.currentLife < 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.values.currentLife = 3;
        state.view.lives.textContent = "x" + state.values.currentLife;
        alert("Obrigada por jogar!")
    }
} 

function restartGame() {
    // Redefine os valores para os padrões
    state.values.currentTime = 30; // Tempo inicial
    state.values.result = 0;       // Pontuação inicial
    state.values.hitPosition = 0;  // Posição inicial do alvo

    // Atualiza a interface
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;

    // Reinicia os timers
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function playSound(audioName){
    let audio = new Audio(`./scr/audios/${audioName}.mp3`);
    audio.play();
    audio.volume = 0.2;
 }

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");})

    let randomNumber = Math.floor(Math.random() *9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitbox(){
    state.view.squares.forEach((square) => {  
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    })
}

function init(){
    addListenerHitbox();
}

init();
