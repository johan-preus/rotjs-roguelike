class Zombie extends Entity {
    constructor(properties) {
        super(properties)
    }
}

const zombieTemplate = {
    name: 'Zombie',
    foreground: 'red',
    background: 'black',
    char: 'Z',
    attackValue: 5,
    mixins: [zombieActor, destructible, attacker],
}