class Player extends Entity {
    constructor(properties) {
        super(properties)
    }
}

const playerTemplate = {
    name: 'player',
    char: "@",
    foreground: "yellow",
    background: "black",
    mixins: [mixinPlayerActor],
}