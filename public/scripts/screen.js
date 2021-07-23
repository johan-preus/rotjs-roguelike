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
        const builder = new Builder(Game.mapWidth, Game.mapHeight, Game.mapDepth)
        const tiles = builder.tiles
        const maps = []

        // generate the world according to given depth
        for (let i = 0; i < Game.mapDepth; i++) {
            if (i === 0) {
                maps.push(new Map(tiles[i], Game.player))

                // code to make down stairs

                continue
            }
            if(i === Game.mapDepth - 1){
                // code to make up stairs
                continue
            }
            // code to make up and down stairs

            maps.push(new Map(tiles[i]))
        }
        this.map = maps[0]
        Game.maps.push(maps)
        this.map.engine.start()
    },
    exit() {
        console.log('Exited the play screen')
    },
    render(display) {
        const screenWidth = Game.screenWidth
        const screenHeight = Game.screenHeight

        // Make sure the x-axis doesn't go to the left of the left bound
        let topLeftX = Math.max(0, Game.player.x - screenWidth / 2)
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this.map.width - screenWidth)

        let topLeftY = Math.max(0, Game.player.y - screenHeight / 2)
        topLeftY = Math.min(topLeftY, this.map.height - screenHeight)

        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
                const tile = this.map.getTile(x, y)
                display.draw(
                    x - topLeftX,
                    y - topLeftY,
                    tile.char,
                    tile.foreground,
                    tile.background
                )
            }
        }
        const entities = this.map.entities
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i]
            if (
                entity.x >= topLeftX &&
                entity.y >= topLeftY &&
                entity.x < topLeftX + screenWidth &&
                entity.y < topLeftY + screenHeight
            ) {
                display.draw(
                    entity.x - topLeftX,
                    entity.y - topLeftY,
                    entity.char,
                    entity.foreground,
                    entity.background
                )
            }
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
        console.log('victory screen input not being handled yet');
    }
}