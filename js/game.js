let gameOver = false;
let platforms = [];
let xOffset = 0;
let updateTimer = null;
let cycleTimer = null;
let stageState = DAY; // Current time of the stage
let opacity = 0;
let worldSize = 9000;
let gameWon = false;

const draw = () => {
    gameCanvas.fillStyle = "#D6E9FF";
    gameCanvas.fillRect(0, 0, WIDTH, HEIGHT);
    if(stageState !== DAY){
        gameCanvas.globalAlpha = opacity;
        gameCanvas.fillStyle = "#064287";
        gameCanvas.fillRect(0, 0, WIDTH, HEIGHT);
    }
    gameCanvas.globalAlpha = 1;
    gameCanvas.drawImage(sprites[player.image], player.x - xOffset, player.y, sprites[player.image].width, sprites[player.image].height);
    platforms.forEach((element) => {
        drawPlatform(element);
    });
};

const drawPlatform = (platform) => {
    if(platform.type === DAY){
        if(stageState !== DAY){
            if(stageState === NIGHT){
                gameCanvas.drawImage(sprites[platform.image + "night"], platform.x - xOffset, platform.y, platform.width, platform.height);
            }
            else if(stageState === TO_DAY){
                gameCanvas.drawImage(sprites[platform.image], platform.x - xOffset, platform.y, platform.width, platform.height);
                gameCanvas.globalAlpha = opacity;
                gameCanvas.drawImage(sprites[platform.image+ "night"], platform.x - xOffset, platform.y, platform.width, platform.height);
                gameCanvas.globalAlpha = 1;
            }
            else {
                gameCanvas.drawImage(sprites[platform.image], platform.x - xOffset, platform.y, platform.width, platform.height);
                gameCanvas.globalAlpha = opacity;
                gameCanvas.drawImage(sprites[platform.image + "night"], platform.x - xOffset, platform.y, platform.width, platform.height);
                gameCanvas.globalAlpha = 1;
            }
        }
        else {
            gameCanvas.drawImage(sprites[platform.image], platform.x - xOffset, platform.y, platform.width, platform.height);    
        }
    }
    else {
        if(stageState !== DAY){
            if(stageState === NIGHT){
                gameCanvas.drawImage(sprites[platform.image], platform.x - xOffset, platform.y, platform.width, platform.height);
            }
            else if(stageState === TO_DAY){
                gameCanvas.globalAlpha = opacity;
                gameCanvas.drawImage(sprites[platform.image], platform.x - xOffset, platform.y, platform.width, platform.height);
                gameCanvas.globalAlpha = 1;
            }
            else {
                gameCanvas.globalAlpha = opacity;
                gameCanvas.drawImage(sprites[platform.image], platform.x - xOffset, platform.y, platform.width, platform.height);
                gameCanvas.globalAlpha = 1;
            }
        }
    }
}

const checkPlatformCollision = (platform) => {
    if(platform.type === NIGHT && stageState === DAY){
        return false;
    }
    if(platform.x < player.x + player.width && platform.x + platform.width > player.x){
        if(platform.y > player.y + player.height + player.fallSpeed){
            return false;
        }
        else if(platform.y + platform.height < player.y + player.height){
            return false;
        }
        else {
            return true;
        }
    }
    return false;
}

const gameUpdate = () => {
    if (player.touching === false){ // Fall acceleration calculation and platform collision detection
        if(player.fallSpeed > 0){
            let checkTouch = false;
            platforms.forEach((element, index) => {
                let check = checkPlatformCollision(element);
                if(check !== false){
                    checkTouch = index;
                }
            });
            if(checkTouch !== false){ // Player is detected touching a platform, saved index in CheckTouch
                player.touching = checkTouch;
                player.fallSpeed = 0;
                player.y = platforms[checkTouch].y - player.height;
            }
            else { // Player has not touched a platform, add fall speed and increment acceleration.
                player.y += player.fallSpeed;
                player.fallSpeed += player.fallAccel;
            }
        }
        else {
            player.y += player.fallSpeed;
            player.fallSpeed += player.fallAccel;
        }
    }
    if(player.move !== false){
        if(player.move === LEFT){
            player.x -= player.moveSpeed;
        }
        else if(player.move === RIGHT){
            player.x += player.moveSpeed;
        }
        if(player.touching !== false){
            let checkCollision = checkPlatformCollision(platforms[player.touching]);
            if(checkCollision === false){
                player.touching = false;
            }
        }
    }
    if(player.touching === 13){
        gameWin();
        player.touching = 0;
    }

    if(player.x - xOffset > OFFSET && player.x + xOffset < worldSize){
        xOffset = player.x - OFFSET;
        
    }
    else if(player.x - xOffset < OFFSET && xOffset > 0){
        xOffset = player.x - OFFSET;
    }
    else if(player.x < OFFSET){
        xOffset = 0;
    }

    checkGameOver();
    if(!gameOver){
        updateTimer = setTimeout(gameUpdate, 17);
    }
};

const playerJump = () => {
    if(player.touching !== false){
        player.fallSpeed = FALL_SPEED;
        player.touching = false;
    }
}

const handleMousePlay = () => {
    if(gameOver){
        Game.state = MENU;
    }
};

const changeCycle = () => {
    if(gameOver){
        return;
    }
    switch(stageState){
        case DAY:
            stageState = TO_NIGHT;
            transitionCycle();
            cycleTimer = setTimeout(changeCycle, CHANGE_CYCLE);
            break;
        case TO_NIGHT:
            stageState = NIGHT;
            cycleTimer = setTimeout(changeCycle, NIGHT_CYCLE);
            break;
        case NIGHT:
            stageState = TO_DAY;
            transitionCycle();
            cycleTimer = setTimeout(changeCycle, CHANGE_CYCLE);
            break;
        case TO_DAY:
            stageState = DAY;
            cycleTimer = setTimeout(changeCycle, DAY_CYCLE);
            break;
    }
}

const transitionCycle = () => {
    if(stageState === TO_NIGHT){
        opacity += OPACITY;
        if(opacity < 1){
            setTimeout(transitionCycle, 17);
        }
    }
    else if (stageState === TO_DAY){
        opacity -= OPACITY;
        if(opacity > 0){
            setTimeout(transitionCycle, 17);
        }
    }
}

const checkGameOver = () => {
    if(player.y > HEIGHT){
        gameOver = true;
        sounds.stageIntro.pause();
        sounds.stageIntro.currentTime = 0;
        let temp = Math.floor(Math.random() * 4) + 1;
        sounds["death" + temp].play();
        clearTimeout(cycleTimer);
    }
}

const gameWin = () => {
    gameWon = true;
    player.move = false;
    clearTimeout(cycleTimer);
    clearTimeout(updateTimer);
    setTimeout(win, 13000);
    sounds.win.play();
}

const win = () => {
    player.touching = 0;
    sounds.win.pause();
    sounds.win.currentTime = 0;
    Game.state = MENU;
    gameWon = false;
}

const startGame = () => {
    platforms = platformAtlas;
    player = new Player();
    gameOver = false;
    gameUpdate();
    Game.state = PLAY;
    stageState = DAY;
    opacity = 0;
    xOffset = 0;
    cycleTimer = setTimeout(changeCycle, DAY_CYCLE);
}