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
        // most initialization done here instead of game init so game can be restarted from game over screen
        console.log('Entered the play screen')
        Game.player = new Player(playerTemplate)
        Game.enemies = 0
        this.hpPos = 1
        this.hpBarPos = 2
        this.enemiesPos = 4
        const builder = new Builder(Game.mapWidth, Game.mapHeight, Game.mapDepth)
        const tiles = builder.tiles
        const maps = []

        // generate the world according to given depth
        for (let i = 0; i < Game.mapDepth; i++) {
            if (i === 0) {
                maps.push(new Map(tiles[i], Game.player))
                maps[i].createDownStairs(3)
                continue
            }
            if (i === Game.mapDepth - 1) {
                maps.push(new Map(tiles[i]))
                maps[i].createUpStairs(3)
                continue
            }
            maps.push(new Map(tiles[i]))
            maps[i].createUpStairs(3)
            maps[i].createDownStairs(3)
        }
        Game.mapId = 0
        Game.map = maps[Game.mapId]
        Game.maps = maps
        Game.map.engine.start()
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
        topLeftX = Math.min(topLeftX, Game.map.width - screenWidth)

        let topLeftY = Math.max(0, Game.player.y - screenHeight / 2)
        topLeftY = Math.min(topLeftY, Game.map.height - screenHeight)

        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
                const tile = Game.map.getTile(x, y)
                display.draw(
                    x - topLeftX,
                    y - topLeftY,
                    tile.char,
                    tile.foreground,
                    tile.background
                )
            }
        }
        const entities = Game.map.entities
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
        display.draw(
            screenWidth + 2,
            this.hpPos,
            'Hp:',
            'yellow',
        )
        display.draw(
            screenWidth + 7,
            this.hpPos,
            `${Game.player.hp}/${Game.player.maxHp}`,
            'yellow'
        )
        const hpBarNum = Math.round(Game.player.hp / Game.player.maxHp * 10)
        for(let i = 0; i <= hpBarNum; i++){
            if(i === 0){
                display.drawText(
                    screenWidth + 2,
                    this.hpBarPos,
                    '%c{red}%b{red}.'
                )
                continue
            }
            display.drawText(
                screenWidth + i,
                this.hpBarPos,
                '%c{red}%b{red}.'
            )
        }
        for(let i = 10; i > hpBarNum; i--){
            display.drawText(
                screenWidth + i,
                this.hpBarPos,
                '%c{#808080}%b{#808080}.'
            )
        }
        display.drawText(
            screenWidth + 1,
            this.enemiesPos,
            `Enemies Remaining: ${Game.enemies}`
        )
    },
    handleInput: gameInput,
}

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

const loseScreen = {
    enter() {
        console.log('Entered the lose screen')
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