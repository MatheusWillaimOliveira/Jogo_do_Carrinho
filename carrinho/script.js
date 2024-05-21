document.addEventListener('DOMContentLoaded', (event) => {
    const gameArea = document.getElementById('gameArea');
    const playerCar = document.getElementById('playerCar');
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;
    const carWidth = playerCar.offsetWidth;
    const carHeight = playerCar.offsetHeight;
    let carPositionX = (gameAreaWidth / 2) - (carWidth / 2);
    let carSpeed = 10;

    // Controles do jogador
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && carPositionX > 0) {
            carPositionX -= carSpeed;
        } else if (e.key === 'ArrowRight' && carPositionX < (gameAreaWidth - carWidth)) {
            carPositionX += carSpeed;
        }
        playerCar.style.left = carPositionX + 'px';
    });

    // Função para criar obstáculos
    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.style.width = '50px';
        obstacle.style.height = '100px';
        obstacle.style.backgroundColor = 'blue';
        obstacle.style.position = 'absolute';
        obstacle.style.left = Math.floor(Math.random() * (gameAreaWidth - 80)) + 'px';
        obstacle.style.top = '0px';
        gameArea.appendChild(obstacle);

        moveObstacle(obstacle);
    }

    // Função para mover obstáculos
    function moveObstacle(obstacle) {
        let obstaclePositionY = 0;
        const obstacleSpeed = 20;

        function move() {
            obstaclePositionY += obstacleSpeed;
            obstacle.style.top = obstaclePositionY + 'px';

            // Verificar colisão
            if (detectCollision(playerCar, obstacle)) {
                alert('Game Over!');
                window.location.reload();
            }

            // Remover o obstáculo se sair da tela
            if (obstaclePositionY > gameAreaHeight) {
                obstacle.remove();
            } else {
                requestAnimationFrame(move);
            }
        }

        move();
    }

    // Função para detectar colisão
    function detectCollision(car, obstacle) {
        const carRect = car.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return !(
            carRect.top > obstacleRect.bottom ||
            carRect.bottom < obstacleRect.top ||
            carRect.right < obstacleRect.left ||
            carRect.left > obstacleRect.right
        );
    }

    // Gerar obstáculos periodicamente
    setInterval(createObstacle, 2000);
});
