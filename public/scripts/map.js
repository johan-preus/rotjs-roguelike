class Map {
    constructor(tiles, player) {
        this.tiles = tiles
        this.width = tiles.length
        this.height = tiles[0].length
        this.player = player
        this.entities = []
        this.scheduler = new ROT.Scheduler.Simple()
        this.engine = new ROT.Engine(this.scheduler)

        this.addEntityAtRandomPosition(this.player)
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
    isEmptyFloor(x, y) {
        return this.getTile(x, y) === floorTile // && !this.getEntityAt(x, y)
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
    }
}