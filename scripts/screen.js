const startScreen = {
    enter() {
        console.log('Entered the start screen')
    },
    exit() {
        console.log('Exited the start screen')
    },
    render(display) {
        display.drawText(1, 1, '%c{yellow}Welcome to rot.js roguelike!')
        display.drawText(1, 2, 'Press enter to start!')
    },
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                Game.switchScreen(victoryScreen)
            }
        }
    }
}

const victoryScreen = {
    enter() {
        console.log('Entered the win screen')
    },
    exit() {
        console.log('Exited the win screen')
    },
    render(display) {
        display.drawText(1, 2, 'You win!')
    },
    handleInput(inputType, inputData) {}
}