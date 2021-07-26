function gameInput(inputType, inputData) {
    if (inputType === 'keydown') {
        switch (inputData.keyCode) {
            case ROT.KEYS.VK_NUMPAD1:
                Game.player.move(-1, 1)
                break
            case ROT.KEYS.VK_NUMPAD2:
            case ROT.KEYS.VK_DOWN:
                Game.player.move(0, 1)
                break
            case ROT.KEYS.VK_NUMPAD3:
                Game.player.move(1, 1)
                break
            case ROT.KEYS.VK_NUMPAD4:
            case ROT.KEYS.VK_LEFT:
                Game.player.move(-1, 0)
                break
            case ROT.KEYS.VK_NUMPAD6:
            case ROT.KEYS.VK_RIGHT:
                Game.player.move(1, 0)
                break
            case ROT.KEYS.VK_NUMPAD7:
                Game.player.move(-1, -1)
                break
            case ROT.KEYS.VK_NUMPAD8:
            case ROT.KEYS.VK_UP:
                Game.player.move(0, -1)
                break
            case ROT.KEYS.VK_NUMPAD9:
                Game.player.move(1, -1)
                break
            default:
                // game should not unlock if no valid key
                return
        }
        Game.map.engine.unlock()
        return
    }
    if (inputType === 'keypress') {
        switch (inputData.keyCode){
            case ROT.KEYS.VK_LESS_THAN:
                Game.player.goUp()
                break
            case ROT.KEYS.VK_GREATER_THAN:
                Game.player.goDown()
                break
            default:
                return
        }
    }
}