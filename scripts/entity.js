class Entity {
    constructor(properties) {
        this.name = properties.name
        this.isActor = properties.isActor
        this.x = properties.x
        this.y = properties.y
        this.z = properties.z
        this.attachedMixins = {}
        const mixins = properties.mixins || []

        for (let i = 0; i < mixins.length; i++) {
            // if a mixin has an init function, execute it with properties as param
            if (mixins[i].init) {
                mixins[i].init(this, properties)
            }
            for (let key in mixins[i]) {
                if (key !== 'init' && key !== 'name'){
                    this[key] = mixins[i][key]
                }
            }
            // allow searching for a mixins name or group name using attachedMixins
            this.attachedMixins[mixins[i].name] = true
            if(mixins[i].groupName){
                this.attachedMixins[mixins[i].groupName] = true
            }
        }
    }
}