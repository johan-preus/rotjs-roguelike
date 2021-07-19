class Map {
    constructor(tiles, player) {
        this.tiles = tiles
        this.width = tiles.length
        this.height = tiles[0].length
        this.player = player
        this.scheduler = new ROT.Scheduler.Simple()
        this.engine = new ROT.Engine(this.scheduler)
    }
    getTile(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return nullTile
        return this.tiles[x][y] || nullTile
    }
}