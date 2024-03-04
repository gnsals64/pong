import * as pongmember from './PongMember.js';

pongmember.ctx.font = '45px sans-serif';
pongmember.ctx.fillStyle = 'white';
pongmember.ctx.textAlign = 'center';
pongmember.ctx.fillText('Press start button', 1280 / 2, 720 / 2);

let interval;
const startbutton = document.getElementById('start');

startbutton.addEventListener('click', () => {
  pongmember.ctx.clearRect(0, 0, pongmember.canvas.width, pongmember.canvas.height);
  interval = setInterval(draw, 10);
  startbutton.disabled = true;
  console.log('hi');
});

//key event
document.addEventListener('keydown', user1_keyDownHandler, false);
document.addEventListener('keyup', user1_keyUpHandler, false);
document.addEventListener('keydown', user2_keyDownHandler, false);
document.addEventListener('keyup', user2_keyUpHandler, false);

function user1_keyDownHandler(e) {
  //console.log(pongmember.user1.skill);
  if (e.keyCode == 83) {
    pongmember.user1.upPressed = true;
  } else if (e.keyCode == 87) {
    pongmember.user1.downPressed = true;
  } else if (e.keyCode == 32) {
    pongmember.user1.skill = true;
  }
}

function user1_keyUpHandler(e) {
  if (e.keyCode == 83) {
    pongmember.user1.upPressed = false;
  } else if (e.keyCode == 87) {
    pongmember.user1.downPressed = false;
  } else if (e.keyCode == 32) {
    pongmember.user1.skill = false;
    pongmember.user1.skillpower = 0;
  }
}

function user2_keyDownHandler(e) {
  if (e.keyCode == 40) {
    pongmember.user2.upPressed = true;
  } else if (e.keyCode == 38) {
    pongmember.user2.downPressed = true;
  } else if (e.keyCode == 13) {
    pongmember.user2.skill = true;
  }
}

function user2_keyUpHandler(e) {
  if (e.keyCode == 40) {
    pongmember.user2.upPressed = false;
  } else if (e.keyCode == 38) {
    pongmember.user2.downPressed = false;
  } else if (e.keyCode == 13) {
    pongmember.user2.skill = false;
    pongmember.user2.skillpower = 0;
  }
}

function drawCenterbar() {
  pongmember.ctx.beginPath();
  while (pongmember.centerbar.dy < 720) {
    pongmember.ctx.rect(
      (pongmember.canvas.width - pongmember.centerbar.width) / 2,
      pongmember.centerbar.dy,
      pongmember.centerbar.width,
      pongmember.centerbar.height
    );
    pongmember.ctx.fillStyle = 'white';
    pongmember.ctx.fill();
    pongmember.centerbar.dy += 40;
  }
  pongmember.centerbar.dy = 0;
  pongmember.ctx.closePath();
}

function drawBall() {
  pongmember.ctx.beginPath();
  pongmember.ctx.arc(pongmember.ball.x, pongmember.ball.y, pongmember.ball.radius, 0, Math.PI * 2);
  pongmember.ctx.fillStyle = 'white';
  pongmember.ctx.fill();
  pongmember.ctx.closePath();
}

function User1_drawPaddle() {
  pongmember.ctx.beginPath();
  pongmember.ctx.rect(
    pongmember.paddle.width + 50,
    pongmember.user1.posY,
    pongmember.paddle.width,
    pongmember.paddle.height
  );
  if (pongmember.user1.skill == true) {
    pongmember.user1.skillpower++;
  }
  if (pongmember.user1.skillpower > 50) {
    pongmember.ctx.fillStyle = 'red';
  } else {
    pongmember.ctx.fillStyle = 'white';
  }
  pongmember.ctx.fill();
  pongmember.ctx.closePath();
  if (pongmember.user1.upPressed && pongmember.user1.posY < pongmember.canvas.height - pongmember.paddle.height) {
    pongmember.user1.posY += 7;
  } else if (pongmember.user1.downPressed && pongmember.user1.posY > 0) {
    pongmember.user1.posY -= 7;
  }
}

function User2_drawPaddle() {
  pongmember.ctx.beginPath();
  pongmember.ctx.rect(
    pongmember.canvas.width - pongmember.paddle.width - 50,
    pongmember.user2.posY,
    pongmember.paddle.width,
    pongmember.paddle.height
  );
  if (pongmember.user2.skill == true) {
    pongmember.user2.skillpower++;
  }
  if (pongmember.user2.skillpower > 50) {
    pongmember.ctx.fillStyle = 'red';
  } else {
    pongmember.ctx.fillStyle = 'white';
  }
  pongmember.ctx.fill();
  pongmember.ctx.closePath();
  if (pongmember.user2.upPressed && pongmember.user2.posY < pongmember.canvas.height - pongmember.paddle.height) {
    pongmember.user2.posY += 7;
  } else if (pongmember.user2.downPressed && pongmember.user2.posY > 0) {
    pongmember.user2.posY -= 7;
  }
}

function User1_gameover() {
  if (pongmember.ball.x + pongmember.ball.dx < pongmember.ball.radius) {
    pongmember.user2.score++;
    if (pongmember.user2.score >= 5) {
      clearInterval(interval);
      pongmember.ctx.clearRect(0, 0, pongmember.canvas.width, pongmember.canvas.height);
      pongmember.ctx.fillText('User2 win', 1280 / 2, 720 / 2);
      setTimeout(function () {
        document.location.reload();
      }, 5000);
    } else {
      clearInterval(interval);
      setTimeout(function () {
        Ballposreset();
        pongmember.ball.dx = -3;
        pongmember.ball.dy = -pongmember.ball.dy;
      }, 1000);
    }

    //document.location.reload();
  } else if (pongmember.ball.x + pongmember.ball.dx > pongmember.canvas.width - pongmember.ball.radius - 50) {
    if (
      pongmember.ball.y > pongmember.user2.posY &&
      pongmember.ball.y < pongmember.user2.posY + pongmember.paddle.height &&
      pongmember.ball.x < pongmember.canvas.width - 50 &&
      pongmember.user2.skill == true
    ) {
      pongmember.ball.dx = -7;
    } else if (
      pongmember.ball.y > pongmember.user2.posY &&
      pongmember.ball.y < pongmember.user2.posY + pongmember.paddle.height &&
      pongmember.ball.x < pongmember.canvas.width - 50
    ) {
      pongmember.ball.dx = -3;
    }
  }
}
function User2_gameover() {
  if (pongmember.ball.x + pongmember.ball.dx > pongmember.canvas.width - pongmember.ball.radius) {
    pongmember.user1.score++;
    if (pongmember.user1.score >= 5) {
      clearInterval(interval);
      pongmember.ctx.clearRect(0, 0, pongmember.canvas.width, pongmember.canvas.height);
      pongmember.ctx.fillText('User1 win', 1280 / 2, 720 / 2);
      setTimeout(function () {
        document.location.reload();
      }, 5000);
    } else {
      clearInterval(interval);
      setTimeout(function () {
        Ballposreset();
        pongmember.ball.dx = 3;
        pongmember.ball.dy = -pongmember.ball.dy;
      }, 1000);
    }
    //document.location.reload();
  } else if (pongmember.ball.x + pongmember.ball.dx < pongmember.ball.radius + pongmember.paddle.width + 50) {
    if (
      pongmember.ball.y > pongmember.user1.posY &&
      pongmember.ball.y < pongmember.user1.posY + pongmember.paddle.height &&
      pongmember.ball.x > pongmember.ball.radius + 50 &&
      pongmember.user1.skill == true
    ) {
      console.log('go');
      pongmember.ball.dx = 7;
    } else if (
      pongmember.ball.y > pongmember.user1.posY &&
      pongmember.ball.y < pongmember.user1.posY + pongmember.paddle.height &&
      pongmember.ball.x > pongmember.ball.radius + 50
    ) {
      console.log('no');
      pongmember.ball.dx = 3;
    }
  }
}

function ScoreControl() {
  pongmember.ctx.font = '45px sans-serif';
  pongmember.ctx.fillStyle = 'white';
  pongmember.ctx.fillText(pongmember.user1.score, 1280 / 5, 45);
  pongmember.ctx.fillText(pongmember.user2.score, (1280 * 4) / 5, 45);
}

function Ballposreset() {
  pongmember.ball.x = 1280 / 2;
  pongmember.ball.y = rand(10, 700);
  interval = setInterval(draw, 10);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw() {
  pongmember.ctx.clearRect(0, 0, pongmember.canvas.width, pongmember.canvas.height);
  drawBall();
  drawCenterbar();
  User1_drawPaddle();
  User2_drawPaddle();
  pongmember.ball.x += pongmember.ball.dx;
  pongmember.ball.y += pongmember.ball.dy;
  User1_gameover();
  User2_gameover();
  ScoreControl();
  if (
    pongmember.ball.y + pongmember.ball.dy > pongmember.canvas.height - pongmember.ball.radius ||
    pongmember.ball.y + pongmember.ball.dy < pongmember.ball.radius
  ) {
    pongmember.ball.dy = -pongmember.ball.dy;
  }
}
