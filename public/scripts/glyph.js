class Glyph {
    constructor(properties = {}) {
        this.char = properties.char || ""
        this.foreground = properties.foreground || "white"
        this.background = properties.background || "black"
    }
}