import { myCroquis } from "./mycroquis.js";

const my = myCroquis;


export class Tools {
    public initialize() {

        const undo = document.getElementById("undo")!;
        undo.addEventListener("click", function () {
            console.log("undo")
        })

        const redo = document.getElementById("redo")!;
        redo.addEventListener("click", function () {
            console.log("redo")
        })

        const color_cells = document.querySelector(".color-cells")!;
        const color_divs = color_cells.querySelectorAll("div")!;
        color_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event: Event) {
                const selected = color_cells.querySelector(".selected")
                selected?.classList.remove("selected")
                const cell = event.target as HTMLDivElement
                cell.classList.add("selected")
            })
        })

        const brush_cells = document.querySelector(".brush-cells")!;
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

        const size_cells = document.querySelector(".size-cells")!;
        const size_divs = size_cells.querySelectorAll("div")!;
        size_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event: Event) {
                const selected = size_cells.querySelector(".selected")
                selected?.classList.remove("selected")
                element.classList.add("selected")
            })
        })

        const opacity_cells = document.querySelector(".opacity-cells")!;
        const opacity_divs = opacity_cells.querySelectorAll("div")!;
        opacity_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event: Event) {
                const selected = opacity_cells.querySelector(".selected")
                selected?.classList.remove("selected")
                element.classList.add("selected")
            })
        })
    }
}

export const tools = new Tools();
