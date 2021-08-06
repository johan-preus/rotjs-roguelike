class Builder {
    constructor(width, height, depth){
        this.width = width
        this.height = height
        this.depth = depth
        this.tiles = new Array(depth)

        for(let z = 0; z < depth; z++){
            this.tiles[z] = this.generateLevel()
        }
    }
    generateLevel(){
        const map = new Array(this.width)
        for(let w = 0; w < this.width; w++){
            map[w] = new Array(this.height)
        }
        const generator = new ROT.Map.Cellular(this.width, this.height)
        generator.randomize(0.5)
        const totalIterations = 3
        for(let i = 0; i < totalIterations; i++){
            generator.create()
        }
        generator.create(function(x, y, v){
            if(v === 1){
                map[x][y] = floorTile
            } else {
                map[x][y] = wallTile
            }
        })
        return map
    }
}