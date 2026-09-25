const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.querySelector("#score");
const timeText = document.querySelector("#time");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
const message = document.querySelector("#message");

let score = 0;
let time = 20;
let gameRunning = false;
let timer;


// 目标的位置和大小
let target = {
    x: 300,
    y: 200,
    size: 30
};


// 画目标
function drawTarget() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    ctx.arc(
        target.x,
        target.y,
        target.size,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// 随机改变目标位置
function moveTarget() {

    target.x =
        Math.random() *
        (canvas.width - target.size * 2)
        + target.size;

    target.y =
        Math.random() *
        (canvas.height - target.size * 2)
        + target.size;

    drawTarget();
}


// 点击目标
canvas.addEventListener("click", function(event) {

    if (!gameRunning) {
        return;
    }


    const rect = canvas.getBoundingClientRect();

    const mouseX =
        event.clientX - rect.left;

    const mouseY =
        event.clientY - rect.top;


    const distance = Math.sqrt(
        (mouseX - target.x) ** 2 +
        (mouseY - target.y) ** 2
    );


    if (distance <= target.size) {

        score++;

        scoreText.textContent = score;

        moveTarget();
    }

});


// 开始游戏
startButton.addEventListener("click", function() {

    score = 0;
    time = 20;

    scoreText.textContent = score;
    timeText.textContent = time;

    gameRunning = true;

    startButton.hidden = true;
    restartButton.hidden = true;

    message.textContent = "목표를 클릭하세요!";

    moveTarget();


    timer = setInterval(function() {

        time--;

        timeText.textContent = time;


        if (time <= 0) {

            clearInterval(timer);

            gameRunning = false;

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            message.textContent =
                "게임 종료! 최종 점수: " + score;

            restartButton.hidden = false;
        }

    }, 1000);

});


// 다시 시작
restartButton.addEventListener("click", function() {

    startButton.click();

});