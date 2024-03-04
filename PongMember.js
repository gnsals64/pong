const canvas = document.getElementById('myCanvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');

const start = false;

//ball position
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 5,
  dx: 3,
  dy: -3,
};

//centerbar info
const centerbar = {
  width: 5,
  height: 25,
  dy: 0,
};

//paddle info
const paddle = {
  height: 100,
  width: 10,
};

//user1 info
const user1 = {
  posY: (canvas.height - paddle.height) / 2,
  dx: 3,
  dy: -3,
  score: 0,
  upPressed: false,
  downPressed: false,
  skill: false,
  skillpower: 0,
};

//user2 info
const user2 = {
  posY: (canvas.height - paddle.height) / 2,
  dx: 3,
  dy: -3,
  score: 0,
  upPressed: false,
  skill: false,
  skillpower: 0,
};

export { canvas, ctx, ball, centerbar, paddle, user1, user2, start };
