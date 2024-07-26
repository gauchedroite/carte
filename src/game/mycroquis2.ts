const body_style = getComputedStyle(document.body);
const canvas_width = body_style.getPropertyValue('--canvas-width').replace("px", "");
const canvas_height = body_style.getPropertyValue('--canvas-height').replace("px", "");


export class MyCroquis {
    public canvasID = "drawing_canvas";
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;

    isDrawing = false;
    lastPoint = { x: 0, y: 0 };
    currentPoint = { x: 0, y: 0 };

    public use(filename: string) {
        this.canvas = document.getElementById(this.canvasID)! as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        this.loadImage(`${filename}?${new Date().getTime()}`);

        this.canvas.addEventListener("touchstart", this.touch_start)
        this.canvas.addEventListener("touchmove", this.touch_move)
        this.canvas.addEventListener("touchend", this.touch_end)
    }

    touch_start(e: TouchEvent) {
        if (e.touches.length > 0) {
            this.isDrawing = true;
            const touch = e.touches[0];
            this.lastPoint = { x: touch.clientX, y: touch.clientY };
        }
    }

    touch_move(e: TouchEvent) {
        if (!this.isDrawing) return;
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            this.currentPoint = { x: touch.clientX, y: touch.clientY };
            this.drawSmoothLine(this.lastPoint, this.currentPoint);
            this.lastPoint = this.currentPoint;
        }
        e.preventDefault();
    }

    touch_end() {
        this.isDrawing = false;
    }

    drawSmoothLine(start: any, end: any) {
        const midPoint = {
            x: (start.x + end.x) / 2,
            y: (start.y + end.y) / 2
        };

        const ctx = this.ctx;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.quadraticCurveTo(start.x, start.y, midPoint.x, midPoint.y);
        ctx.quadraticCurveTo(midPoint.x, midPoint.y, end.x, end.y);
        ctx.stroke();
    }

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
