const zombieActor = {
    name: 'ZombieActor',
    groupName: 'Actor',
    act() {
        // console.log(this.map);
        const passableCallback=(x, y) => {
            return this.map.isEmptyFloor(x, y)
        }
        const aStar = new ROT.Path.AStar(Game.player.x, Game.player.y, passableCallback)
        const path = []
        function pathCallback(x, y) {
            path.push([x, y])
        }
        aStar.compute(this.x, this.y, pathCallback)
        // shift to remove own position
        path.shift()
        if (path.length === 1) {
            this.attack(Game.player)
            return
        }
        // move towards player
    }
}