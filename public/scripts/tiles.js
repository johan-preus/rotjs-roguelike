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
})
const stairsUpTile = new Tile({
    char: '<',
    foreground: 'white',
    isWalkable: true,
})
const stairsDownTile = new Tile({
    char: '>',
    foreground: 'white',
    isWalkable: true,
})