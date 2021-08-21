const Game = {
    mapWidth: 80,
    mapHeight: 40,
    mapDepth: 3,
    screenWidth: 30,
    screenHeight: 15,
    currentScreen: null,
    display: null,
    maps: null,
    map: null,
    mapId: null,
    inProgress: false,
    init() {
        this.display = new ROT.Display({
            width: this.screenWidth + 12,
            height: this.screenHeight,
            forceSquareRatio: true,
        })
        const bindEventToScreen = event => {
            window.addEventListener(event, e => {
                if (this.currentScreen !== null) {
                    this.currentScreen.handleInput(event, e)
                }
            })
        }
        bindEventToScreen("keydown")
        bindEventToScreen("keyup")
        bindEventToScreen("keypress")
        document.body.appendChild(this.display.getContainer())
        this.switchScreen(startScreen)
    },
    startGame(){
        this.inProgress = true
        this.player = new Player(playerTemplate)
        this.enemies = 0
        const builder = new Builder(this.mapWidth, this.mapHeight, this.mapDepth)
        const tiles = builder.tiles
        const maps = []

        // generate the world according to given depth
        for (let i = 0; i < this.mapDepth; i++) {
            if (i === 0) {
                maps.push(new Map(tiles[i], this.player))
                maps[i].createDownStairs(3)
                continue
            }
            if (i === this.mapDepth - 1) {
                maps.push(new Map(tiles[i]))
                maps[i].createUpStairs(3)
                continue
            }
            maps.push(new Map(tiles[i]))
            maps[i].createUpStairs(3)
            maps[i].createDownStairs(3)
        }
        this.mapId = 0
        this.map = maps[this.mapId]
        this.maps = maps
        this.map.engine.start()
    },
    switchScreen(screen) {
        if (this.currentScreen !== null) {
            this.currentScreen.exit()
        }
        this.display.clear()
        this.currentScreen = screen
        if (this.currentScreen !== null) {
            this.currentScreen.enter()
            this.refresh()
        }
    },
    refresh() {
        this.display.clear()
        this.currentScreen.render(this.display)
    }

}

window.onload = () => Game.init()