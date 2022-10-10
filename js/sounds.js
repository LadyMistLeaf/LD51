const sounds = {};

sounds.addSound = (name, mp3src) => {
    sounds[name] = document.createElement('audio');
    sounds[name].setAttribute('src', mp3src);
}

sounds.addSound('intro', './assets/sound/LD51Intro.mp3');
sounds.addSound('stageIntro', './assets/sound/LD51stageIntro.mp3');
sounds.addSound('win', './assets/sound/LD51win.mp3');
sounds.addSound('death1', './assets/sound/LD51death1.mp3');
sounds.addSound('death2', './assets/sound/LD51death2.mp3');
sounds.addSound('death3', './assets/sound/LD51death3.mp3');
sounds.addSound('death4', './assets/sound/LD51death4.mp3');