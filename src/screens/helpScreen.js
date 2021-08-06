const helpScreen = {
    enter(){
        console.log('Entered help screen');
    },
    exit(){
        console.log('Exited help screen');
    },
    render(display){
        display.drawText(1, 2, '%c{yellow}How to play:')
        display.drawText(1, 3, 'Move with numpad or arrow keys')
        display.drawText(1, 4, 'Move into enemy to attack')
        display.drawText(1, 5, 'Climb stairs with > and <')
        display.drawText(1, 6, 'Defeat all enemies to win!')
        display.drawText(1, 8, 'Press [enter] to close')
    },
    handleInput(inputType, inputData){
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                Game.switchScreen(playScreen)
            }
        }
    }
}