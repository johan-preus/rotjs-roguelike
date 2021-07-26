class Map {
    constructor(tiles, player) {
        this.tiles = tiles
        this.width = tiles.length
        this.height = tiles[0].length
        this.entities = []
        this.scheduler = new ROT.Scheduler.Simple()
        this.engine = new ROT.Engine(this.scheduler)
        if (player) {
            this.addEntityAtRandomPosition(player)
        }
        this.addEntityAtRandomPosition(new Zombie(zombieTemplate))
    }
    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return nullTile
        return this.tiles[x][y] || nullTile
    }
    getRandomFloorPosition() {
        let x, y
        do {
            x = Math.floor(Math.random() * this.width)
            y = Math.floor(Math.random() * this.height)
        } while (!this.isEmptyFloor(x, y))
        return {
            x,
            y
        }
    }
    isFloor(x, y){
        return this.getTile(x, y) === floorTile
    }
    isEmptyFloor(x, y) {
        return this.getTile(x, y) === floorTile && !this.getEntityAt(x, y)
    }
    addEntityAtRandomPosition(entity) {
        const position = this.getRandomFloorPosition()
        entity.setX(position.x)
        entity.setY(position.y)
        this.addEntity(entity)
    }
    addEntity(entity) {
        if (
            entity.x < 0 ||
            entity.x >= this._width ||
            entity.y < 0 ||
            entity.y >= this._height
        ) {
            throw new Error("Adding entity out of bounds")
        }
        entity.map = this
        this.entities.push(entity)

        if (entity.hasMixin("Actor")) {
            this.scheduler.add(entity, true)
        }
        if(entity.hasMixin('Enemy')){
            Game.enemies++
        }
    }
    removeEntity(entity) {
        for (let i = 0; i < this.entities.length; i++) {
            if (this.entities[i] === entity) {
                this.entities.splice(i, 1)
                break
            }
        }
        if (entity.hasMixin("Actor")) {
            this.scheduler.remove(entity)
        }
        if(entity.hasMixin('Enemy')){
            Game.enemies--
            if(Game.enemies === 0){
                Game.switchScreen(victoryScreen)
            }
        }
    }
    getEntityAt(x, y) {
        let entity = null
        for (let i = 0; i < this.entities.length; i++) {
            if (
                this.entities[i].x === x &&
                this.entities[i].y === y
            ) {
                entity = this.entities[i]
            }
        }
        if (!entity) return false
        return entity
    }
    createDownStairs(num) {
        for (let i = 0; i < num; i++) {
            const {
                x,
                y
            } = this.getRandomFloorPosition()
            this.tiles[x][y] = new stairsDownTile(i)
        }
    }
    createUpStairs(num) {
        for (let i = 0; i < num; i++) {
            const {
                x,
                y
            } = this.getRandomFloorPosition()
            this.tiles[x][y] = new stairsUpTile(i)
        }
    }
    findUpStair(id) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.tiles[x][y].isUpStair && this.tiles[x][y].stairId === id) {
                    return {
                        x,
                        y
                    }
                }
            }
        }
    }
    findDownStair(id) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.tiles[x][y].isDownStair && this.tiles[x][y].stairId === id) {
                    return {
                        x,
                        y
                    }
                }
            }
        }
    }
}