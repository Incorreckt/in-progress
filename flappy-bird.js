const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bird properties
let birdX = 50;
let birdY = canvas.height / 2;
let birdRadius = 20;
let birdVelocityY = 0;
const gravity = 0.5;
const jumpForce = -10;

// Pipe properties
let pipes = [];
const pipeWidth = 50;
const pipeGap = 150;
const pipeDistance = 300;
let pipeTimer = 0;

// Game control
let isGameOver = false;
let score = 0;

// Cloud properties
const cloudImage = new Image();
cloudImage.src = 'cloud.png'; // Replace 'cloud.png' with the path to your cloud image
const clouds = [];

// Event listener for jumping
document.addEventListener("keydown", jump);

function jump(event) {
    if (event.code === "Space" && !isGameOver) {
        birdVelocityY = jumpForce;
    }
}

function drawBird() {
    ctx.beginPath();
    ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF5733"; // Orange bird
    ctx.fill();
    ctx.closePath();
}

function drawPipe(x, height) {
    ctx.fillStyle = "#2E8B57"; // Dark green pipes
    ctx.fillRect(x, 0, pipeWidth, height);
    ctx.fillRect(x, height + pipeGap, pipeWidth, canvas.height - height - pipeGap);
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawClouds() {
    clouds.forEach(cloud => {
        ctx.drawImage(cloudImage, cloud.x, cloud.y, 80, 50); // Adjust width and height as needed
    });
}

function drawBackground() {
    // Draw sky-blue background
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    // Draw background
    drawBackground();

    // Draw clouds
    drawClouds();

    // Draw bird
    drawBird();

    // Draw pipes
    pipes.forEach(pipe => {
        drawPipe(pipe.x, pipe.height);
    });

    // Draw score
    drawScore();

    // Bird movement
    birdVelocityY += gravity;
    birdY += birdVelocityY;

    // Pipe movement and collision detection
    pipes.forEach(pipe => {
        pipe.x -= 2; // Move pipe to the left

        // Check collision with bird
        if (
            birdX + birdRadius > pipe.x && birdX - birdRadius < pipe.x + pipeWidth &&
            (birdY - birdRadius < pipe.height || birdY + birdRadius > pipe.height + pipeGap)
        ) {
            isGameOver = true;
        }

        // Increment score if bird passes through pipe
        if (birdX > pipe.x + pipeWidth && !pipe.passed) {
            score++;
            pipe.passed = true;
        }
    });

    // Remove off-screen pipes
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

    // Generate new pipes
    pipeTimer++;
    if (pipeTimer === pipeDistance) {
        const pipeHeight = Math.random() * (canvas.height - pipeGap);
        pipes.push({ x: canvas.width, height: pipeHeight, passed: false });
        pipeTimer = 0;
    }

    // Check if bird hits ground
    if (birdY + birdRadius > canvas.height) {
        isGameOver = true;
    }

    // Game over
    if (isGameOver) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "#FF0000"; // Red game over text
        ctx.fillText("Game Over", canvas.width / 2 - 120, canvas.height / 2);
        return;
    }

    requestAnimationFrame(draw);
}

// Generate clouds
for (let i = 0; i < 5; i++) {
    const cloudX = Math.random() * canvas.width;
    const cloudY = Math.random() * (canvas.height / 2);
    clouds.push({ x: cloudX, y: cloudY });
}

draw();
