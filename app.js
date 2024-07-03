canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ballX = 100;
let ballSpeedX = 15;
let ballY = 100;
let ballSpeedY = 15;

let paddle1Y = 100;
let paddle2Y = 100;
const PADDLE_WIDTH = 20;
let paddle1_height = 150;
let paddle2_height = 150;
let paddlemowe = 15;


let p1score = 0;
let p2score = 0;
const winScore = 3;
let winScreen = false;
let startscreen = true
let startinput = null
let zormu = 2
let bosbosduran = true




window.onload = function () {


    canvas.width = window.innerWidth - 0.000001
    canvas.height = window.innerHeight - 1

    document.getElementById("submit").addEventListener("click", function () {
        document.querySelector(".seviye").style.display = "none"
        switch (zormu) {
            case "1":
                paddle1_height = 300
                paddle2_height = 50
                paddlemowe = 50;

                break;
            case "2":
                paddle1_height = 225
                paddle2_height = 125

                break;
            case "3":
                paddle1_height = 175
                paddle2_height = 150

                break;
            case "4":
                paddle1_height = 110
                paddle2_height = 230


                break;
            case "5":
                paddle1_height = 80
                paddle2_height = 300


                break;
            default:

                break;
        }
        bosbosduran = false


    })



    setInterval(
        function () {
            hepsiniCiz();
            hareket();
        }
        , 1000 / 30);

    addEventListener("mousemove", function (evt) {
        let mouse = mousePosHesapla(evt);
        paddle1Y = mouse.y - (paddle1_height / 2);
    })
    canvas.addEventListener("click", function (evt) {

        if (winScreen) {
            p1score = 0
            p2score = 0
            winScreen = false
        }

    })
}



function eylencesizzamanlar() {
    startinput = document.getElementById("vol")
    zormu = startinput.value
    console.log(zormu)
    const degis = document.getElementById("degis")
    switch (zormu) {
        case "1":
            degis.innerText = "kolay"

            break;
        case "2":
            degis.innerText = "orta"
            break;
        case "3":
            degis.innerText = "zor"

            break;
        case "4":
            degis.innerText = "çok zor"

            break;
        case "5":
            degis.innerText = "hardcore"

            break;
        default:
            break;
    }
}


function hepsiniCiz() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    if (winScreen) {
        ctx.fillStyle = "white";
        ctx.font = "20px Georgia";
        ctx.fillText("oyun bitti", canvas.width / 2 - 20, 100);
        ctx.fillText("Tekrar başlatmak için tıklayın", canvas.width / 2 - 100, 200);

        return
    }
    if (bosbosduran) {
        return
    }

    drawNet()
    drawRect(0, paddle1Y, PADDLE_WIDTH, paddle1_height, "white");
    drawRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, paddle2_height, "white");

    ctx.font = "20px Georgia";
    ctx.fillText(p1score, 100, 100);
    ctx.fillText(p2score, canvas.width - 100, 100);

    drawCircle(ballX, ballY, 20, "blue");
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

function drawNet() {
    //düz çizgi
    /*
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width/2, 0, 2, canvas.height);
     */

    for (let i = 10; i < canvas.height; i += 40) {
        drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');

    }
}

function mousePosHesapla(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    }
}

function hareket() {
    if (winScreen || bosbosduran) {
        return
    }


    autoMove()
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    //sağ duvara temas
    if (ballX >= canvas.width - 20) {

        if (ballY > paddle2Y && ballY < (paddle2Y + paddle2_height)) {
            //top paddle'a çarpıyor. yönünü ters çevir
            ballSpeedX = -ballSpeedX
            let aralik = ballY - (paddle2Y + paddle2_height / 2)
            ballSpeedY = aralik * 0.5
        } else {
            //top duvara çarpıyor. topu resetle
            p1score++;

            ballReset()

        }
    }

    //sol duvara temas
    if (ballX <= 20) {

        if (ballY > paddle1Y && ballY < (paddle1Y + paddle1_height)) {
            //top paddle'a çarpıyor. yönünü ters çevir
            ballSpeedX = -ballSpeedX
            let aralik = ballY - (paddle1Y + paddle1_height / 2)
            ballSpeedY = aralik * 0.5
        } else {
            //top duvara çarpıyor. topu resetle
            p2score++;
            ballReset()
        }

    }

    //alt duvar
    if (ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    //üst duvar
    if (ballY <= 20) {
        ballSpeedY = -ballSpeedY;
    }

}

function ballReset() {

    let sayi = Math.random()

    if (sayi > 0.5) { ballSpeedY = 15 } else { ballSpeedY = -15 }
    let sayi2 = Math.random()

    if (sayi2 > 0.5) { ballSpeedX = 15 } else { ballSpeedX = -15 }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;


    if (p1score >= winScore || p2score >= winScore) {
        winScreen = true
    }
}


function autoMove() {
    let padCenter = paddle2Y + (paddle2_height / 2);

    if (ballY > padCenter + 45) {
        paddle2Y += paddlemowe
    } else if (ballY < padCenter - 45) {
        paddle2Y -= paddlemowe
    }
}
