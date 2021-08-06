const victoryScreen = {
    enter() {
        console.log('Entered the win screen')
    },
    exit() {
        console.log('Exited the win screen')
    },
    render(display) {
        display.drawText(1, 2, '%c{yellow}You win!')
        display.drawText(1, 3, 'Press enter to play again.')
    },
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                Game.switchScreen(playScreen)
            }
        }
    }
}