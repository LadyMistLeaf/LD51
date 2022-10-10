const sprites = {};

sprites.addImage = (imageName, imageSrc, width, height) => {
    sprites[imageName] = new Image();
    sprites[imageName].src = imageSrc;
    sprites[imageName].width = width;
    sprites[imageName].height = height;
}

sprites.addImage('title', './assets/images/Title.png', 800, 600);
sprites.addImage('menu', './assets/images/Menu.png', 800, 600);


sprites.addImage("plat3day", "./assets/images/plat3day.png", 150, 50);
sprites.addImage("plat3night", "./assets/images/plat3night.png", 150, 50);
sprites.addImage("plat3daynight", "./assets/images/plat3daynight.png", 150, 50);
sprites.addImage("plat4night", "./assets/images/plat4night.png", 200, 50);
sprites.addImage("penguin", "./assets/images/player.png", 45, 78);