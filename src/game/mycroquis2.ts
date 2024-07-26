const body_style = getComputedStyle(document.body);
const canvas_width = body_style.getPropertyValue('--canvas-width').replace("px", "");
const canvas_height = body_style.getPropertyValue('--canvas-height').replace("px", "");

interface XY {
    x: number | null,
    y: number | null
}


export class MyCroquis {
    public canvasID = "drawing_canvas";
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;
    rect!: DOMRect;

    drawing = false;
    moved = false;
    point: XY = {x: null, y: null};

    public use(filename: string) {
        const canvas = this.canvas = document.getElementById(this.canvasID)! as HTMLCanvasElement;
        const ctx = this.ctx = this.canvas.getContext('2d')!;
        const rect = this.rect = this.canvas.getBoundingClientRect();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        this.loadImage(`${filename}?${new Date().getTime()}`);

        const me = this;

        canvas.addEventListener("touchstart", function(e) {
            const touch = e.touches[0];
            me.startDrawing(touch.clientX, touch.clientY)
        });

        canvas.addEventListener("touchmove", function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            me.drawTo(touch.clientX, touch.clientY, touch.force);
        });

        canvas.addEventListener("touchend", function() { me.stopDrawing() });

        canvas.addEventListener("mousedown", function(e) { me.startDrawing(e.clientX, e.clientY) });
        canvas.addEventListener("mousemove", function(e: any) {
            if (e.pointerType === "pen") {
                me.drawTo(e.clientX, e.clientY, e.pressure);
            } else {
                me.drawTo(e.clientX, e.clientY, 1);
            }
        });
        canvas.addEventListener("mouseup", function() { me.stopDrawing() });
        canvas.addEventListener("mouseout", function() { me.stopDrawing() });
    }

    startDrawing (x: number, y: number) {
        this.drawing = true;
        this.moved = false;
        this.point.x = x;
        this.point.y = y;
        this.ctx.beginPath();
        this.ctx.moveTo(x - this.rect.x, y - this.rect.y);
    };

    drawTo (x: number, y: number, pressure: number) {
        if (!this.drawing) return;
        this.ctx.lineWidth = 1; //pressure * 100;
        this.ctx.lineTo(x - this.rect.x, y - this.rect.y);
        this.ctx.stroke();
        this.moved = true;
    };

    stopDrawing () {
        if (!this.moved && this.point.x != null && this.point.y != null)
            this.drawTo(this.point.x + 1, this.point.y + 1, 0.5);
        this.ctx.closePath();
        this.drawing = false;
        this.moved = false;
        this.point.x = null;
        this.point.y = null;
    };

    public brushImagePointerDown(image: HTMLImageElement, isDefaultBrush: boolean) {
        // currentBrush = image;
        // brush.setImage(isDefaultBrush ? null : image)
        // this.updatePointer(isDefaultBrush);
    }

    public updateColor(rgb: string) {
        //brush.setColor(rgb)
    }

    public updateSize(px: number) {
        //brush.setSize(px)
    }

    public updateOpacity(alpha: number) {
        //croquis.setPaintingOpacity(alpha)
    }

    public undo() {
        //croquis.undo()
    }

    public redo() {
        //croquis.redo()
    }

    public eraseSurface() {
        //croquis.clearLayer()
    }

    public loadImage(filename: string) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        };
        img.src = filename;
    }

    public getCanvasDataURL() {
        const canvas = document.getElementById(this.canvasID)! as HTMLCanvasElement;
        return canvas.toDataURL("image/png");
    }
}

export const myCroquis = new MyCroquis();
