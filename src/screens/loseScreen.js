const loseScreen = {
    enter() {
        console.log('Entered the lose screen')
        Game.inProgress = false
    },
    exit() {
        console.log('Exited the lose screen')
    },
    render(display) {
        display.drawText(1, 2, '%c{red}You lose!')
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