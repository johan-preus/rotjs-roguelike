const destructible = {
    name: "Destructible",
    init(destructibleObj, template) {
        this.maxHp = template.maxHp || 10
        this.hp = template.hp || this.maxHp
    },
    takeDamage(attacker, damage) {
        this.hp -= damage
        if (this.hp <= 0) {
            this.map.removeEntity(this)
        }
    }
}