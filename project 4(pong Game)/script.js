const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Game objects
const paddleWidth = 10, paddleHeight = 100;
let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
};
let rightPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 5
};
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4
};

// Draw functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
    }
}

function drawScore(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(text, x, y);
}

// Movement controls
document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "w":
            leftPaddle.y -= leftPaddle.dy;
            break;
        case "s":
            leftPaddle.y += leftPaddle.dy;
            break;
        case "ArrowUp":
            rightPaddle.y -= rightPaddle.dy;
            break;
        case "ArrowDown":
            rightPaddle.y += rightPaddle.dy;
            break;
    }
});

// Collision detection
function collision(b, p) {
    return (
        b.x - b.radius < p.x + p.width &&
        b.x + b.radius > p.x &&
        b.y - b.radius < p.y + p.height &&
        b.y + b.radius > p.y
    );
}

// Update game state
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top/bottom)
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    let paddle = (ball.x < canvas.width / 2) ? leftPaddle : rightPaddle;

    if (collision(ball, paddle)) {
        let angle = (ball.y - (paddle.y + paddle.height / 2)) * Math.PI / 4 / (paddle.height / 2);
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.dx = direction * ball.speed * Math.cos(angle);
        ball.dy = ball.speed * Math.sin(angle);
    }

    // Score
    if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = -ball.dx;
    }
}

// Draw everything
function render() {
    drawRect(0, 0, canvas.width, canvas.height, "black"); // Clear
    drawNet();
    drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "white");
    drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "white");
    drawCircle(ball.x, ball.y, ball.radius, "white");
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();
