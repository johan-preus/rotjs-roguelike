const Game = {
    init() {
        this.display = new ROT.Display({
            width: 60,
            height: 30
        })
        document.body.appendChild(this.display.getContainer())
    }

}

window.onload = () => Game.init()