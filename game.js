var gamePiece;
var obstacles = [];
var score;
var gameHeight = 200;
var stop = false;
var running = false;

function loadGame() {
    gamePiece = new component(40, 40, "red", 10, gameHeight - 40, "img");
    gamePiece.gravity = 0.07;
    score = new component("30px", "Consolas", "black", gameHeight, 40, "text");
    game.load();
}

function startGame() {
    if(!running) {
        running = true;
        game.start();
    }
}

var game = {
    canvas : document.createElement("canvas"),
    load : function() {
        this.canvas.width = 480;
        this.canvas.height = gameHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
    },
    start : function() {
        this.interval = setInterval(updateGame, 5);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    },
    stop : function() {
        clearInterval(this.interval);
        var audio = new Audio("http://www.soundjay.com/button/sounds/button-4.mp3");
        audio.play();
        stop = true;
        running = false;
        //TODO: reload
    }
}

function updateGame() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < obstacles.length; i += 1) {
        if (gamePiece.crashWith(obstacles[i])) {
            game.stop();
            return;
        } 
    }
    game.clear();
    game.frameNo += 1;
    if (game.frameNo == 1 || everyinterval(200)) {
        x = game.canvas.width;
        minHeight = 10;
        maxHeight = 35;
        height = Math.floor(Math.random()*(maxHeight - minHeight) + minHeight);
        obstacles.push(new component(10, height, "green", x, gameHeight - height));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    score.text="SCORE: " + game.frameNo;
    score.update();
    gamePiece.newPos();
    gamePiece.update();
}

function everyinterval(n) {
    if ((game.frameNo / n) % 1 == 0) {return true;}
    return false;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32 && !stop){
        var audio = new Audio("http://www.soundjay.com/button/sounds/button-3.mp3");
        audio.play();
        gamePiece.speedY = -3.5;
    }
}
