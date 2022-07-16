let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext('2d'); // 2d로 그리기 준비
let x = $canvas.width/2;
let y = $canvas.height - 30;
 
// 공 움직임 속도
let dx = 2;
let dy = -2;

// 공 반지름
let ballRadius = 10;

// 패들 변수모음
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = ($canvas.width - paddleWidth)/2; // 패들 화면 가운데 시작 x좌표

// 키보드 변수모음
let rightPressed = false;
let leftPressed = false;
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// 스마트폰 터치 이벤트
document.addEventListener("touchstart", touchstartHandler);
document.addEventListener("touchend", touchendHandler);

function touchstartHandler(e){ // e.~ => 키값, 마우스값, 터치값...
    let touchX = e.changedTouches[0].clientX; // 터치한 x좌표
    let touchY = e.changedTouches[0].clientY; // 터치한 y좌표
    if(touchX >= 0 && touchX <= $canvas.width/2) leftPressed = true;
    else if(touchX > $canvas.width/2 && touchX <= $canvas.width) rightPressed = true;
}

function touchendHandler(e){ // 터치 손을 땠을떄
    rightPressed = false;
    leftPressed = false;
}

function keyDown(e){
    // console.log(e.keyCode);
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUp(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,$canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath(); // 새로운 그림 시작할래
    ctx.arc(x,y,ballRadius,0,Math.PI*2); // (x,y,반지름,시작각도,끝각도)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath(); // 그림 그리기 마칠래
}
 
function draw() {
    ctx.clearRect(0,0,$canvas.width, $canvas.height); // 캔버스 화면 크기로 삭제
    drawBall(); // 공 그리기
    drawPaddle();  // 패들 그리기
    // 점수 출력
    ctx.fillText("Score: ", 20, 30); // .fillText(글자,x,y)
    ctx.fillText(score,100,30);

    // 좌우 벽 공 튕기기
    if(x + dx > $canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx; // 5, -1*5 = -5
    }
     
    
    // 바닥 천장 공 튕기기
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > $canvas.height-ballRadius){ // 공이 바닥부근에서
        if(x > paddleX && x < paddleX + paddleWidth){ // 공이 패들 윗면에 닿으면
            dy = -dy; // 공 반사   
            score++; // 점수 1점 상승         
        }
        else{ // 공이 바닥에 닿으면
            alert("Game Over!");
            clearInterval(set_id); // 0.01초 반복 중지
            document.location.reload();
        }
    }

    
    // 패들 움직이기
    if(rightPressed && paddleX < $canvas.width - paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    
    

    x += dx;
    y += dy;
}

let isStart = confirm("확인 버튼을 누르면 게임이 시작됩니다."); // 확인true, 취소false
let score = 0; // 과제2에 사용할 점수용 변수
let set_id;

if(isStart){
    ctx.font = "bold 20px monospace"; // 점수용 글자 설정
    ctx.fillStyle = "black"; // 점수용 글자 설정
    set_id = setInterval(draw, 10); // 함수를 0.01초마다 실행
}
else{
    alert("안녕히 가십시오.");
}
