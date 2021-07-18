class Map {
    constructor(width, height, depth){
        this.levels = []
        for(let i = 0; i < depth; i++){
            this.levels.push(this.createLevel(width, height, i + 1))
        }
    }
    createLevel(width, height, z){
        // make a level array
    }
}