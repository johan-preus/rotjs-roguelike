const mixinPlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act() {
        Game.refresh()
        this.map.engine.lock()
    }
}