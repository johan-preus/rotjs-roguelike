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
        const mapHeight = 60
        const mapWidth = 30
        const mapDepth = 3
        const builder = new Builder(mapWidth, mapHeight, mapDepth)
        const tiles = builder.tiles

        // should this be in Game obj instead? may make more sense than screen obj
        this.player = new Player(playerTemplate)
        // player is null for now
        // get random empty position and pass it as player position
        this.map = new Map(tiles[0], this.player)
        // this.player.map = this.map
        this.map.engine.start()
    },
    exit() {
        console.log('Exited the play screen')
    },
    render(display) {
        const mapHeight = 60
        const mapWidth = 30
        const screenWidth = Game.screenWidth
        const screenHeight = Game.screenHeight
        for (let x = 0; x < mapWidth; x++) {
            for (let y = 0; y < mapHeight; y++) {
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