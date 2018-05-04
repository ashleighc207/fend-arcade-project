
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
};

// reset the enemies once they hit the "wall" by assigning
// random values for x coord, y coord, and speed
Enemy.prototype.reset = function() {
    this.wall = 400;
    if(this. x > this.wall){
        this.x = xPoint[Math.floor(Math.random(), xPoint.length)];
        this.y = yPoint[Math.floor(Math.random() * yPoint.length)];
        this.speed = Math.random() *  300 + 100;
    }
}

// resets the enemy and is called when a new game starts
// due to winning or losing
Enemy.prototype.delete = function() {
    this.x = -100;
    this.y = yPoint[Math.floor(Math.random() * yPoint.length)];
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// found a collison detection MDN article, hasCollided() function
// is based off the technique given in that article
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

Enemy.prototype.hasCollided = function() {
    var p = {x: player.x, y: player.y, height: 50, width: 50};
    var e = {x: this.x, y: this.y, height: 50, width: 50};
    if (p.x < e.x + e.width && 
        p.y < e.y + e.height && 
        p.x + p.width > e.x &&
        p.y + p.height > e.y){
        player.reset();
        lives--;
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

Player.prototype.update = function() {

};

// Checks to see if a user made it to the top without colliding
// and adds one to the score if so
Player.prototype.earnPoint = function(){
    if(this.y == -30){
        score += 20;
        this.y = 370;
    }    
}


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the player on the screen, required method for game
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 370;
};


// Allow the user to move the player via key press
Player.prototype.handleInput = function(key) {
    var minX = 0;
    var maxX = 400;
    var minY = -30;
    var maxY = 370;

    if (key == 'left'){
        if(this.x > minX) {
            this.x -= 100;
        } else {
            this.x += 0;
        }
    } 
    if (key == 'up'){
        if(this.y > minY){
            this.y -= 80;
        } else {
            this.y += 0;
        }
    }
    if (key == 'right'){
        if(this.x < maxX) {
            this.x += 100;
        } else {
            this.x += 0;
        }
    }
    if (key == 'down'){
        if(this.y < maxY){
            this.y += 80;
        } else {
            this.y += 0;
        }
    }
    this.earnPoint();
};

// reset function that applies to both winning and losing to 
// start with a fresh game board
function resetGame(){
    player.reset();
    allEnemies = []; 
    fred.delete();
    jill.delete();
}


// function popupModal(){
//     left = left - (modal.width() / 2);
//     left = left - (canvas.width / 2);
//     modal.css('left', left + 'px');
//     modal.css('top', top + px);
// }

// if user reaches max score, present the modal alerting them they
// won and offer them a way to start a new game
function wonGame(){
    allEnemies = [];
    modal.innerHTML = `
    <h1 class="heading-one">Congrats! You won!</h1>
    <p class="text">Your score is ${score} and you finished with ${lives} lives!</p>
    <p class="new-game">Would you like to play again?</p>
    <i class="fas fa-redo-alt restart" onclick="newGame()"></i>
    `;
    modal.classList.remove('display-none');
}

function lostGame(){
    allEnemies = [];
    modal.innerHTML = `
    <h1 class="heading-one">Oh no!</h1>
    <h1 class="heading-one">The bugs got you!</h1>
    <p class="text">Your score is ${score}.</p>
    <p class="new-game">Would you like to try again?</p>
    <i class="fas fa-redo-alt restart" onclick="newGame()"></i>
    `;
    modal.classList.remove('display-none');
}
// start a new game
function newGame() {
    resetGame();
    modal.classList.add('display-none');
    modal.innerHTML = `<i class="fas fa-redo-alt restart"></i>`;
    lives = 3;
    score = 0;
    gameStatus();
    allEnemies.push(fred, jill);
}

function gameStatus() {
    var statusCheck = setInterval(function(){
        fred.reset();
        jill.reset();
    if (score == 500){
        clearInterval(statusCheck);
        wonGame();
        resetGame();
    }
    if (lives == 0) {
        clearInterval(statusCheck);
        lostGame();
        resetGame();
    }
}, 200);
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
var canvas = document.getElementsByTagName('canvas');
var fred = new Enemy(
    xPoint[Math.floor(Math.random(), xPoint.length)], 
    yPoint[Math.floor(Math.random() * yPoint.length)], 
    Math.random() * 300 + 100);
var jill = new Enemy(
    xPoint[Math.floor(Math.random(), xPoint.length)], 
    yPoint[Math.floor(Math.random() * yPoint.length)], 
    Math.random() * 300 + 100);


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

// call new game function
newGame();







