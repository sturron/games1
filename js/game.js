const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCountX = 25;
const tileCountY = 25;

canvas.width = gridSize * tileCountX;
canvas.height = gridSize * tileCountY;

// Start with snake length 3
let snake = [
  { x: 12, y: 12 },
  { x: 11, y: 12 },
  { x: 10, y: 12 }
];
let velocity = { x: 1, y: 0 };
let apple = { x: 8, y: 8 };
let score = 0;

function draw() {
  // Move snake
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // Wrap edges
  head.x = (head.x + tileCountX) % tileCountX;
  head.y = (head.y + tileCountY) % tileCountY;

  // Check self-collision
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    alert("Game Over! Score: " + score);
    snake = [
      { x: 12, y: 12 },
      { x: 11, y: 12 },
      { x: 10, y: 12 }
    ];
    velocity = { x: 1, y: 0 };
    score = 0;
    document.getElementById('score').innerText = score;
    apple = { x: Math.floor(Math.random() * tileCountX), y: Math.floor(Math.random() * tileCountY) };
    return;
  }

  snake.unshift(head);

  // Eat apple
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    document.getElementById('score').innerText = score;
    apple = { x: Math.floor(Math.random() * tileCountX), y: Math.floor(Math.random() * tileCountY) };
  } else {
    snake.pop();
  }

  // Draw background
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw apple
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(apple.x * gridSize + gridSize/2, apple.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
  ctx.fill();

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ff99" : "#00cc77";
    ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 1, gridSize - 1);
  }
}

function update() {
  draw();
}

setInterval(update, 100);

window.addEventListener('keydown', e => {
  switch(e.key) {
    case 'ArrowUp': if (velocity.y === 0) velocity = { x: 0, y: -1 }; break;
    case 'ArrowDown': if (velocity.y === 0) velocity = { x: 0, y: 1 }; break;
    case 'ArrowLeft': if (velocity.x === 0) velocity = { x: -1, y: 0 }; break;
    case 'ArrowRight': if (velocity.x === 0) velocity = { x: 1, y: 0 }; break;
  }
});
