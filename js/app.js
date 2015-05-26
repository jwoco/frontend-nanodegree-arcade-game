// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
    //this.width = ;
    //this.height = ;
    this.speed = 1;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If enemy reaches end of canvas, wrap to beginning.
    if (this.x > 505)
        this.x = 0;
    else
        this.x = (this.x + 1) * this.speed;
    this.y = this.y;
    // If enemy overlaps position with player, log Fail and reset game.
    if (this.collisionCheck() === true) {
        console.log("Fail!");
        alert("Fail!");
        resetGame();
    }
}
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


// Draw the enemy on the screen, required method for game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Check to see if an enemy has collided with the player (their bounding boxes overlap)
Enemy.prototype.collisionCheck = function() {
    // Compare current x, y values of the enemy and player boxes
    //if this.y === player.y. Note: Ideas for this function come from the related forum discussions for FE Feb15.
    if (this.Yoverlaps(player.y, this.y) && this.Xoverlaps(player.x, this.x))
        return true;
}
// Compare current x values of enemy and player see if they overlap (using approximate bounding box).
Enemy.prototype.Xoverlaps = function (x1,x2) {
    if ((x2 > (x1 - 49)) && (x2 < (x1 + 49)))
        return true;
}
// Compare current y values for enemy and player and see if they overlap (using approximate bounding box).
Enemy.prototype.Yoverlaps = function(y1,y2) {
    if ((y2 > (y1 - 60)) && (y2 < (y1 + 60)))
        return true;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.distance = 10;
    this.score = 0;
}

//Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Update the player location
Player.prototype.update = function() {
    player.handleInput();
    // Display Success! message and Reset player if successfully gets to the water
    if (this.y < 4) {
        console.log("Success");
        this.score = this.score + 1;
        console.log(this.score);
        alert("Success!" + "  " + "Score:" + "" + this.score);
        // Reset player to start position and log score.
        resetGame();
     }
 //Bounce if player goes past right end of canvas.
    if (this.x > 425)
        this.x = 400;
// Bounce if player goes past left end of canvas. Checks the position of right edge of player, so that left edge gets close to border.
    if (this.x + 50 < 30)
        this.x = 20;
// Bounce if player hits bottom border of canvas.
    if (this.y > 439)
        this.y = 400;
}


//Function to handle user input from allowed keys (to move the player)
Player.prototype.handleInput = function(keys) {
    if ('left' === keys) {
        this.x = this.x - this.distance; }
    if ('up' === keys) {
        this.y = this.y - this.distance; }
    if ('right' === keys) {
        this.x = this.x + this.distance; }
    if ('down' === keys) {
        this.y = this.y + this.distance; }
};

resetGame = function() {
    player.x = 200;
    player.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiate enemies, assign properties to various enemies to vary speeds and start locations, so they appear random.
var enemy1 = new Enemy;
var enemy2 = new Enemy;
enemy2.speed = 1;
enemy2.x = 160;
var enemy3 = new Enemy;
enemy3.speed = 1;
enemy3.y = 140;
enemy3.x = 220;
var enemy4 = new Enemy;
enemy4.speed = 1;
enemy4.y = 230;
enemy4.x = 460;
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player;


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
