const Game = {
    screenWidth: 60,
    screenHeight: 30,
    currentScreen: null,
    display: null,
    init() {
        this.display = new ROT.Display({
            width: this.screenWidth,
            height: this.screenHeight
        })
        const bindEventToScreen = event => {
            window.addEventListener(event, e => {
                if(this.currentScreen !== null){
                    this.currentScreen.handleInput(event, e)
                }
            })
        }
        bindEventToScreen("keydown")
        bindEventToScreen("keyup")
        bindEventToScreen("keypress")
        document.body.appendChild(this.display.getContainer())
        // this.map = new Map(this.width, this.height, this.depth)
        // this.player = new Player()
        this.switchScreen(startScreen)
    },
    switchScreen(screen){
        if(this.currentScreen !== null){
            this.currentScreen.exit()
        }
        this.display.clear()
        this.currentScreen = screen
        if(this.currentScreen !== null){
            this.currentScreen.enter()
            this.refresh()
        }
    },
    refresh(){
        this.display.clear()
        this.currentScreen.render(this.display)
    }

}

window.onload = () => Game.init()