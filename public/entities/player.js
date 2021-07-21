class Player extends Entity {
    constructor(properties) {
        super(properties)
    }
    move(dX, dY){
        // change position, refresh render, update engine
        const newX = this.x + dX
        const newY = this.y + dY
        this.tryMove(newX, newY, this.map)
    }
}

const playerTemplate = {
    name: 'player',
    char: "@",
    foreground: "yellow",
    background: "black",
    mixins: [mixinPlayerActor, moveable],
}