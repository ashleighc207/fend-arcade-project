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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

Player.prototype.update = function(dt) {

};

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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(200,370,50);
var xPoint = [-100, -80, -20, -10];
var yPoint = [60, 140, 220];
var randX = xPoint[Math.floor(Math.random(), xPoint.length)];
var randY = yPoint[Math.floor(Math.random() * yPoint.length)];
var randSpeed = Math.floor(Math.random() * (200 + 100));

var enemy = new Enemy(randX, randY, randSpeed);
allEnemies.push(enemy);


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
