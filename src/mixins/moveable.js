const moveable = {
    name: "Moveable",
    tryMove(x, y, map) {
        const tile = map.getTile(x, y)
        const target = map.getEntityAt(x, y)
        if (target) {
            if (this.hasMixin("Attacker")) {
                this.attack(target)
                return true
            }
            return false
        }
        if (tile.isWalkable) {
            this.x = x
            this.y = y
            return true
        }
        return false
    },
}