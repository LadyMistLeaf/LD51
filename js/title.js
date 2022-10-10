const gameCanvas = document.getElementById("game").getContext("2d");

gameCanvas.canvas.width = WIDTH;
gameCanvas.canvas.height = HEIGHT;

const Game = {};

Game.state = TITLE;

const drawTitle = () => {
    gameCanvas.drawImage(sprites["title"], 0, 0, 800, 600);
};

const handleMouseTitle = (mouseX, mouseY) => {
    Game.state = MENU;
    sounds.intro.play();
};

const step = () => {
    gameCanvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    switch (Game.state) {
        case MENU: 
            drawMenu();
            break;
        case PLAY:
            draw();
            break;
        case TITLE:
            drawTitle();
            break;
    }
    requestAnimationFrame(step);
};

const mouseDown = (event) => {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    switch (Game.state) {
        case MENU: 
            handleMouseMenu(mouseX, mouseY);
            break;
        case PLAY:
            handleMousePlay(mouseX, mouseY);
            break;
        case TITLE:
            handleMouseTitle(mouseX, mouseY);
            break;
    }

}



gameCanvas.canvas.addEventListener('mousedown', mouseDown);

class Player {
    constructor(){
        this.x = 125;
        this.y = 400;
        this.image = "penguin"; // Nonsensical value
        this.width = 45; // Nonsensical value
        this.height = 78; // Nonsensical value
        this.touching = false; // Whether or not he is standing on a platform, false if no, platform ID if yes
        this.fallSpeed = 0;
        this.fallAccel = FALL_ACCEL;
        this.move = false;
        this.moveSpeed = 5;
    }
}

step();

window.addEventListener('keydown', function (e) { // key detection
    if(Game.state === PLAY && !gameWon){
        switch(e.key){
            case " ":
                playerJump();
                break;
            case "ArrowLeft":
                player.move = LEFT;
                break;
            case "ArrowRight":
                player.move = RIGHT;
                break;
            default:
                console.log(e.key);
        }
    }
  }, false);

  window.addEventListener('keyup', function (e) { // key detection
    if(Game.state === PLAY){
        switch(e.key){
            case "ArrowLeft":
                if(player.move == LEFT){
                    player.move = null;
                }
                break;
            case "ArrowRight":
                if(player.move == RIGHT){
                    player.move = null;
                }
                break;
        }
    }
  }, false);