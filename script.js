// Zoek de canvas element op de html pagina
const canvas = document.getElementById('gameCanvas');
// Zoek de context van de canvas waarmee we kunnen tekenen
const ctx = canvas.getContext('2d');

// De volgende variabelen bepalen de grootte van de game
const gridSize = 20;
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;


// De volgende variabelen bepalen de start positie van de game
let snake = [{ x: 10, y: 10 }]; // De eerste segment is de begin van de snake
let food = { x: 5, y: 5 };     // De eerste food is op de locatie (5, 5)

// De volgende variabelen bepalen de richting van de snake
let dx = 1;
let dy = 0;


// De volgende functie start de game
function gameLoop() {
  update();
  draw();
  //herhaal de gameloop over 100 milliseconden
  setTimeout(gameLoop, 100);
}

function update() {
  // De volgende functie bepaalt de nieuwe positie van de snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Voeg de nieuwe positie toe aan de begin van de snake
  snake.unshift(head);


  // Kijk het voedsel is opgegeten dan vernieuw het voedsel anders blijf het voedsel en wordt het achterste segment verwijderd
  if (head.x === food.x && head.y === food.y) {
    food = { x: Math.floor(Math.random() * gridWidth), y: Math.floor(Math.random() * gridHeight) };
  } else {
    snake.pop();
  }


  // Check of de snake de game over heeft doordat hij buiten de box gaat of een botsing heeft met zichzelf
  if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight || checkCollision(head)) {
    alert("Game Over!");
    location.reload();
  }
}


// De volgende functie checkt of de snake een botsing met zichzelf heeft
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Teken de huidige staat van de game op het canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}


// verander de richting van de snake met de toetsen
document.addEventListener('keydown', (event) => {
  const key = event.key;
  switch (key) {
    case 'ArrowUp':
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case 'ArrowDown':
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
    case 'ArrowLeft':
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
  }
});

// roep de gameloop voor de eerste keer aan
gameLoop();
