
var myGamePiece;
var myObstacles = [];
var myScore;
var gameHeight = 200;
var stop = false;

function startGame() {
    myGamePiece = new component(40, 40, "red", 10, gameHeight - 40, "img");
    myGamePiece.gravity = 0.07;
    myScore = new component("30px", "Consolas", "black", gameHeight, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = gameHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    },
    stop : function() {
        clearInterval(this.interval);
        var audio = new Audio("http://www.soundjay.com/button/sounds/button-4.mp3");
        audio.play();
        stop = true;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(180)) {
        x = myGameArea.canvas.width;
        minHeight = 10;
        maxHeight = 35;
        height = Math.floor(Math.random()*(maxHeight - minHeight) + minHeight);
        myObstacles.push(new component(10, height, "green", x, gameHeight - height));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32 && !stop){
        var audio = new Audio("http://www.soundjay.com/button/sounds/button-3.mp3");
        audio.play();
        myGamePiece.speedY = -3.5;
    }
}
