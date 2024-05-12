export default class Overworld {
    constructor() { }
    // Getters
    static get width() { return Overworld._width; }
    static get height() { return Overworld._height; }
    static get container() { return Overworld._container; }
    static get canvas() { return Overworld._canvas; }
    static get ctx() { return Overworld._ctx; }
    // Initialize the game
    static initialize(container, width, height) {
        this._width = width;
        this._height = height;
        this._container = container;
        this._canvas = container.querySelector(".center-canvas canvas");
        this._ctx = this._canvas.getContext("2d");
        this._canvas.width = width;
        this._canvas.height = height;
        // Your drawing code here
        const ctx = this._canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this._width, this._height);
    }
}
//# sourceMappingURL=Overworld.js.map