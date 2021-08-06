class Tile extends Glyph {
    constructor(properties = {}) {
        super(properties)
        this.isWalkable = properties.isWalkable || false
    }
    static getNeighborPostitions() {
        // get neighbor positions in an array
        // return arr.randomize()
    }
}

const nullTile = new Tile({})
const floorTile = new Tile({
    char: '.',
    isWalkable: true,
})
const wallTile = new Tile({
    char: '#',
    foreground: '#A67B5B'
})

class stairsUpTile extends Tile {
    constructor(num){
        super({
            char: '<',
            foreground: '#999999',
            isWalkable: true,
        })
        this.stairId = num
        this.isUpStair = true
    }
}
class stairsDownTile extends Tile {
    constructor(num){
        super({
            char: '>',
            foreground: '#999999',
            isWalkable: true,
        })
        this.stairId = num
        this.isDownStair = true
    }
}