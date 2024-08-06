import { myCroquis } from "./mycroquis2.js";

const my = myCroquis;


export class Tools {
    initialized = false;

    public initialize() {
        if (this.initialized)
            return;

        const undo = document.getElementById("undo")!;
        undo.addEventListener("click", function () {
            my.undo()
        })

        const redo = document.getElementById("redo")!;
        redo.addEventListener("click", function () {
            my.redo()
        })

        const color_cells = document.querySelector(".color-cells")!;
        const color_divs = color_cells.querySelectorAll("div")!;
        color_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event: Event) {
                const selected = color_cells.querySelector(".selected")
                selected?.classList.remove("selected")
                const cell = event.target as HTMLDivElement
                cell.classList.add("selected")

                my.updateColor(cell.style.backgroundColor)
            })
        })

        const brush_cells = document.querySelector(".brush-cells")!;
        if (brush_cells) {
            const brush_divs = brush_cells.querySelectorAll("div")!;
            brush_divs.forEach(function (element) {
                element.addEventListener("pointerdown", function (event: Event) {
                    const selected = brush_cells.querySelector(".selected")
                    selected?.classList.remove("selected")
                    element.classList.add("selected")

                    const isDefaultBrush = element.id == "cell_round"
                    const target = event.currentTarget as Element
                    const image = target.querySelector("img")!
                    my.brushImagePointerDown(image, isDefaultBrush)
                })
            })
        }

        const size_cells = document.querySelector(".size-cells")!;
        const size_divs = size_cells.querySelectorAll("div")!;
        size_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event: Event) {
                const selected = size_cells.querySelector(".selected")
                selected?.classList.remove("selected")
                element.classList.add("selected")

                const id = element.id
                const px = id == "cell_small" ? 10 : id == "cell_medium" ? 30 : 50
                my.updateSize(px)
            })
        })

        const opacity_cells = document.querySelector(".opacity-cells")!;
        if (opacity_cells) {
            const opacity_divs = opacity_cells.querySelectorAll("div")!;
            opacity_divs.forEach(function (element) {
                element.addEventListener("pointerdown", function (event: Event) {
                    const selected = opacity_cells.querySelector(".selected")
                    selected?.classList.remove("selected")
                    element.classList.add("selected")
    
                    const id = element.id
                    const alpha = id == "cell_low" ? 10 : id == "cell_mid" ? 40 : 100
                    my.updateOpacity(alpha / 100)
                })
            })
        }

        const erase_all = document.getElementById("erase_all")!;
        erase_all.addEventListener("click", function () {
            my.eraseSurface()
        })

        const save_canvas = document.getElementById("save_canvas")!;
        save_canvas.addEventListener("click", function () {
            const save_canvas_event = new CustomEvent("save_canvas");
            document.dispatchEvent(save_canvas_event);
        })
    }
}

export const tools = new Tools();
