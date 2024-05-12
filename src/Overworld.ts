

export default class Overworld {

    private static _container: HTMLElement
    private static _canvas: HTMLCanvasElement
    private static _ctx: CanvasRenderingContext2D;
    private static _width: number
    private static _height: number
    
    private constructor() {/* Make this constructor unavailable */}

    // Getters
    public static get width(): number { return Overworld._width; }
    public static get height(): number { return Overworld._height; }
    public static get container(): HTMLElement { return Overworld._container; }
    public static get canvas(): HTMLCanvasElement { return Overworld._canvas; }
    public static get ctx(): CanvasRenderingContext2D { return Overworld._ctx; }


    // Initialize the game
    public static initialize(container: HTMLElement, width: number, height: number): void {

        this._width = width
        this._height = height
        this._container = container
        this._canvas = container.querySelector(".center-canvas canvas")!
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;

        this._canvas.width = width;
        this._canvas.height = height;
    }
}
