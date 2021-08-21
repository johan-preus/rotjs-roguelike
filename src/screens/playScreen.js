const playScreen = {
    enter() {
        // most initialization done here instead of game init so game can be restarted from game over screen
        console.log('Entered the play screen')
        if(!Game.inProgress){
            Game.startGame()
            this.hpPos = 1
            this.hpBarPos = 2
            this.enemiesPos = 4
            this.helpPos = Game.screenHeight - 1
        }
    },
    exit() {
        console.log('Exited the play screen')
    },
    render(display) {
        const screenWidth = Game.screenWidth
        const screenHeight = Game.screenHeight

        // Make sure the x-axis doesn't go to the left of the left bound
        // Math.ceil prevents errors with odd screenWidth
        let topLeftX = Math.max(0, Game.player.x - Math.ceil(screenWidth / 2))
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, Game.map.width - screenWidth)

        let topLeftY = Math.max(0, Game.player.y - Math.ceil(screenHeight / 2))
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
        display.drawText(
            screenWidth + 2, 
            this.helpPos,
            'Help (?)'
        )
    },
    handleInput: gameInput,
}