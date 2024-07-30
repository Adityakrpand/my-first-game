const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const rows = 20;
const cols = 20;

canvas.width = box * cols;
canvas.height = box * rows;

let snake = [];
snake[0] = { x: Math.floor(cols / 2) * box, y: Math.floor(rows / 2) * box };

let food = {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
};

let direction;
let score = 0;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= box;
    if (direction === 'DOWN') snakeY += box;
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'RIGHT') snakeX += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeX >= canvas.width ||
        snakeY < 0 || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'white';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Decrease the snake's speed by increasing the interval time
let game = setInterval(draw, 160); // Changed from 100 to 150
