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
                Game.switchScreen(playScreen)
            }
        }
    }
}

const playScreen = {
    enter() {
        console.log('Entered the play screen')
        const map = []
        const builder = new Builder(Game.mapWidth, Game.mapHeight, Game.mapDepth)
        const tiles = builder.tiles

        // should this be in Game obj instead? may make more sense than screen obj
        this.map = new Map(tiles[0], Game.player)
        this.map.engine.start()
    },
    exit() {
        console.log('Exited the play screen')
    },
    render(display) {
        const screenWidth = Game.screenWidth
        const screenHeight = Game.screenHeight
        for (let x = 0; x < Game.mapWidth; x++) {
            for (let y = 0; y < Game.mapHeight; y++) {
                const tile = this.map.getTile(x, y)
                display.draw(x, y, tile.char, tile.foreground, tile.background)
            }
        }
        const entities = this.map.entities
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            display.draw(entity.x, entity.y, entity.char, entity.foreground, entity.background)
        }
    },
    handleInput(inputType, inputData) {
        if (inputType === 'keydown') {
            switch (inputData.keyCode) {
                case ROT.KEYS.VK_RETURN:
                    Game.switchScreen(victoryScreen)
                    break
                case ROT.KEYS.VK_NUMPAD1:
                    Game.player.move(-1, 1)
                    break
                case ROT.KEYS.VK_NUMPAD2:
                case ROT.KEYS.VK_DOWN:
                    Game.player.move(0, 1)
                    break
                case ROT.KEYS.VK_NUMPAD3:
                    Game.player.move(1, 1)
                    break
                case ROT.KEYS.VK_NUMPAD4:
                case ROT.KEYS.VK_LEFT:
                    Game.player.move(-1, 0)
                    break
                case ROT.KEYS.VK_NUMPAD6:
                case ROT.KEYS.VK_RIGHT:
                    Game.player.move(1, 0)
                    break
                case ROT.KEYS.VK_NUMPAD7:
                    Game.player.move(-1, -1)
                    break
                case ROT.KEYS.VK_NUMPAD8:
                case ROT.KEYS.VK_UP:
                    Game.player.move(0, -1)
                    break
                case ROT.KEYS.VK_NUMPAD9:
                    Game.player.move(1, -1)
                    break
                default:
                    break
            }
            this.map.engine.unlock()
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
    handleInput(inputType, inputData) {
        console.log('input not being handled yet');
    }
}