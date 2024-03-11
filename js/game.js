let canvas;
let world;
let character;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
let background_sound;



function init() {
    canvas = document.getElementById("canvas");

    document.getElementById("startGame").addEventListener("click", function () {
        document.getElementById("startScreen").classList.add("d-none");
        document.getElementById("canvas").classList.remove("d-none");
        background_sound.play();
        initLevel(); 
        gameStarted = true; 

        world = new World(canvas, keyboard);
    });

    setStoppableInterval();

    background_sound = new Audio('audio/backgroundSound.mp3');
}



function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})


window.addEventListener("touchstart", (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');
    const btnThrow = document.getElementById('btnThrow');

    const rectLeft = btnLeft.getBoundingClientRect();
    const rectRight = btnRight.getBoundingClientRect();
    const rectJump = btnJump.getBoundingClientRect();
    const rectThrow = btnThrow.getBoundingClientRect();

    if (touchX >= rectRight.left && touchX <= rectRight.right && 
        touchY >= rectRight.top && touchY <= rectRight.bottom) {
        e.preventDefault();
        keyboard.RIGHT = true;
    }

    if (touchX >= rectJump.left && touchX <= rectJump.right && 
        touchY >= rectJump.top && touchY <= rectJump.bottom) {
        e.preventDefault();
        keyboard.UP = true;
    }

    if (touchX >= rectLeft.left && touchX <= rectLeft.right && 
        touchY >= rectLeft.top && touchY <= rectLeft.bottom) {
        e.preventDefault();
        keyboard.LEFT = true;
    }

    if (touchX >= rectThrow.left && touchX <= rectThrow.right && 
        touchY >= rectThrow.top && touchY <= rectThrow.bottom) {
        e.preventDefault();
        keyboard.D = true;
    }
}, { passive: false });


window.addEventListener("touchend", (e) => {
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.LEFT = false;
    keyboard.D = false;
});