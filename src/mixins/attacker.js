const attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    init(attackerObj, template) {
        this.attackValue = template.attackValue || 1
        this.detectionRadius = template.detectionRadius || 0
    },
    attack(target) {
        if (target.hasMixin('Destructible')) {
            target.takeDamage(this, this.attackValue)
        }
    }
}