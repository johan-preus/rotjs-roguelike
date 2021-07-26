class Player extends Entity {
    constructor(properties) {
        super(properties)
    }
    move(dX, dY) {
        // change position, refresh render, update engine
        const newX = this.x + dX
        const newY = this.y + dY
        this.tryMove(newX, newY, this.map)
    }
    goDown() {
        const tile = this.map.tiles[this.x][this.y]
        if (tile.isDownStair) {
            const id = tile.stairId
            Game.map.removeEntity(this)
            Game.mapId++
            Game.map = Game.maps[Game.mapId]
            this.map = Game.map
            const {
                x,
                y
            } = Game.map.findUpStair(id)
            this.x = x
            this.y = y
            Game.map.addEntity(this)
            Game.refresh()
        }
    }
    goUp() {
        const tile = this.map.tiles[this.x][this.y]
        if (tile.isUpStair) {
            const id = tile.stairId
            Game.map.removeEntity(this)
            Game.mapId--
            Game.map = Game.maps[Game.mapId]
            this.map = Game.map
            const {
                x,
                y
            } = Game.map.findDownStair(id)
            this.x = x
            this.y = y
            Game.map.addEntity(this)
            Game.refresh()
        }
    }
}

const playerTemplate = {
    name: 'Player',
    char: "@",
    foreground: "yellow",
    background: "black",
    maxHp: 50,
    mixins: [mixinPlayerActor, moveable, destructible],
}