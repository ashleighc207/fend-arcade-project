// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);
    this.hasCollided();
    this.reset();
};

Enemy.prototype.reset = function() {
    this.wall = 400;
    this.resetX = xPoint[Math.floor(Math.random(), xPoint.length)];
    this.resetY = yPoint[Math.floor(Math.random() * yPoint.length)];
    this.resetS = Math.floor(Math.random() * 500);
    if(this. x > this.wall){
        this.x = this.resetX;
        this.y = this.resetY;
        this.speed = this.resetS;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// found a collison detection MDN article, hasCollided() function
// is based off the technique given in that article
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

Enemy.prototype.hasCollided = function() {
    var p = {x: player.x, y: player.y, height: 50, width: 50};
    var e = {x: enemy.x, y: enemy.y, height: 50, width: 50};
    if (p.x < e.x + e.width && 
        p.y < e.y + e.height && 
        p.x + p.width > e.x &&
        p.y + p.height > e.y){
        player.x = 200;
        player.y = 370;
        lives--;
        enemy.render();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-cat-girl.png';
};
// checks if a user has earned points or died
Player.prototype.update = function() {
    this.earnPoint();
    if(lives == 0){
        resetGame();
    }
};

// Checks to see if a user made it to the top without colliding
// and adds one to the score if so
Player.prototype.earnPoint = function(){
    if(player.y == -30){
        score += 20;
        player.y = 370;
    }    
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allow the user to move the player via key press
Player.prototype.handleInput = function(key) {
    var minX = 0;
    var maxX = 400;
    var minY = -30;
    var maxY = 370;

    if (key == 'left'){
        if(player.x > minX) {
            player.x -= 100;
        } else {
            player.x += 0;
        }
    } 
    if (key == 'up'){
        if(player.y > minY){
            player.y -= 80;
        } else {
            player.y += 0;
        }
    }
    if (key == 'right'){
        if(player.x < maxX) {
            player.x += 100;
        } else {
            player.x += 0;
        }
    }
    if (key == 'down'){
        if(player.y < maxY){
            player.y += 80;
        } else {
            player.y += 0;
        }
    }
};

function resetGame(){
    console.log('game reset!');
    player.x = 200;
    player.y = 370;
    enemy.x = -10;
    enemy.y = -10;
    lives = 3;
    score = 0;
    modal.innerHTML = `
    <h1 class="heading-one">Congrats! You won!</h1>
    <p class="text">Your score is ${score} and you finished with ${lives} lives!</p>
    <p class="new-game">Would you like to play again?</p>
    <i class="fas fa-redo-alt restart"></i>
    `;
    modal.classList.remove('display-none');
}

function gameOver(){
    enemy.x = -100;
    enemy.speed = 0;
    player.x = 200;
    player.y = 370;
}
function newGame() {
    modal.classList.add('display-none');
    modal.innertHTML = `<i class="fas fa-redo-alt restart"></i>`;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200,370,50);
var xPoint = [-100, -80, -20, -10];
var yPoint = [60, 140, 220];
var lives = 3;
var score = 0;
var modal = document.querySelector('.game-over-modal');
var restart = document.querySelector('.restart');
var enemy = new Enemy(
    xPoint[Math.floor(Math.random(), xPoint.length)], 
    yPoint[Math.floor(Math.random() * yPoint.length)], 
    Math.floor(Math.random() * 500));
allEnemies.push(enemy);

restart.addEventListener('click', function(){
    newGame();

})


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
