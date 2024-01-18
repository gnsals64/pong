const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;
let dx = 3;
let dy = -3;
const ballRadius = 10;
let paddleHeight = 100;
let paddleWidth = 15;
let paddleY = (canvas.height - paddleHeight) / 2;
let upPressed = false;
let downPressed = false;
let centerbarWidth = 5;
let centerbarHeight = 25;
let centerBardy = 0;

function drawCenterbar() {
	ctx.beginPath();
	while (centerBardy < 720) {
		ctx.rect((canvas.width - centerbarWidth) / 2, centerBardy, centerbarWidth, centerbarHeight);
		ctx.fillStyle = "white";
		ctx.fill();
		centerBardy += 40
	}
	centerBardy = 0;
	ctx.closePath();
}

function drawPaddleUser2() {
	ctx.beginPath();
	ctx.rect(canvas.width - paddleWidth - 100, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
	if (upPressed && paddleY < canvas.height - paddleHeight) {
		paddleY += 7;
	} else if (downPressed && paddleY > 0) {
		paddleY -= 7;
	}
}

function drawPaddleUser1() {
	ctx.beginPath();
	ctx.rect(paddleWidth + 100, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
	// if (upPressed && paddleY < canvas.height - paddleHeight) {
	// 	paddleY += 7;
	// } else if (downPressed && paddleY > 0) {
	// 	paddleY -= 7;
	// }
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddleUser1();
	drawPaddleUser2();
	drawCenterbar();
	x += dx;
	y += dy;
	if (x + dx < ballRadius)
	 	dx = -dx;
	else if (x + dx > canvas.width - ballRadius) {
		alert("GAME OVER");
		clearInterval(interval);
		document.location.reload();
	} 
	else if (x + dx > canvas.width - ballRadius - 100) {
		if (y > paddleY && y < paddleY + paddleHeight && x < canvas.width - ballRadius - 100)
			dx = -dx;
	}
	
	if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
}

function keyDownHandler(e) {
	if (e.keyCode == 40) {
		upPressed = true;
	} else if (e.keyCode == 38) {
		downPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 40) {
		upPressed = false;
	} else if (e.keyCode == 38) {
		downPressed = false;
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
let interval = setInterval(draw, 10);