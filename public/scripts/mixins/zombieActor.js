const zombieActor = {
    name: 'ZombieActor',
    groupName: 'Actor',
    act() {
        const passableCallback = (x, y) => {
            return this.map.isFloor(x, y)
        }
        const aStar = new ROT.Path.AStar(Game.player.x, Game.player.y, passableCallback)
        const path = []

        function pathCallback(x, y) {
            path.push([x, y])
        }
        aStar.compute(this.x, this.y, pathCallback)
        // shift to remove own position
        path.shift()
        if (path.length && path.length <= this.detectionRadius) {
            this.tryMove(path[0][0], path[0][1], this.map)
        }
    }
}