let canvas;
let world;
let character;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
let background_sound = new Audio('audio/backgroundSound.mp3');


function init() {
    canvas = document.getElementById("canvas");

    if (!document.getElementById("startScreen").classList.contains("d-none")) {
        document.querySelector('.hud').style.display = 'none';
    }

    document.getElementById("startGame").addEventListener("click", function () {
        document.getElementById("startScreen").classList.add("d-none");
        document.getElementById("canvas").classList.remove("d-none");
        background_sound.play();
        initLevel();
        gameStarted = true;

        world = new World(canvas, keyboard);
        document.querySelector('.hud').style.display = 'flex';
    });

    setStoppableInterval();
    closeInfoBox();
    mobileAlert();
}


function openInfoBox() {
    let infoBox = document.getElementById("infoBox");
    infoBox.style.display = "block";
}


function closeInfoBox() {
    document.addEventListener('click', function (event) {
        let infoBox = document.getElementById('infoBox');
        let infoIcon = document.querySelector('.fa-circle-info');

        if (event.target !== infoBox && event.target !== infoIcon && !infoBox.contains(event.target)) {
            infoBox.style.display = 'none';
        }
    });
}


/**
 * Sets a stoppable interval for a function.
 * @param {Function} fn - The function to be executed.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


/**
 * Displays a mobile alert if the screen width is below 700px.
 */
function mobileAlert() {
    let mobileAlert = document.getElementById('mobileAlert');
    let startScreen = document.getElementById('startScreen');

    if (window.matchMedia('(max-width: 665px)').matches) {
        mobileAlert.classList.remove('d-none');
        startScreen.classList.add('d-none');
        document.querySelector('h1').classList.add('d-none');
        document.querySelector('.hud').classList.add('d-none');
    } else {
        mobileAlert.classList.add('d-none');
        startScreen.classList.remove('d-none');
        document.querySelector('h1').classList.remove('d-none');
        document.querySelector('.hud').classList.remove('d-none');
    }
}

window.addEventListener('load', mobileAlert); // Beim Laden der Seite überprüfen
window.addEventListener('resize', mobileAlert); // Bei Änderungen der Bildschirmgröße überprüfen




/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}


/**
 * Event listener for keydown events to handle keyboard inputs.
 * @param {Event} e - The keydown event object.
 */
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


/**
 * Event listener for keyup events to handle keyboard inputs.
 * @param {Event} e - The keyup event object.
 */
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


/**
 * Event listener for touchstart events to handle touch inputs.
 * @param {Event} e - The touchstart event object.
 */
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


/**
 * Event listener for touchend events to handle touch inputs.
 * @param {Event} e - The touchend event object.
 */
window.addEventListener("touchend", (e) => {
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.LEFT = false;
    keyboard.D = false;
});