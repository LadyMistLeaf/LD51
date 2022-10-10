const drawMenu = () => {
    gameCanvas.drawImage(sprites["menu"], 0, 0, 800, 600);
};

const handleMouseMenu = () => {
    startGame();
    sounds.intro.pause();
    sounds.intro.currentTime = 0;
    sounds.stageIntro.play();
};