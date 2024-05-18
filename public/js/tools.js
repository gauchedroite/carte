import { myCroquis } from "./mycroquis.js";
const my = myCroquis;
export class Tools {
    initialize() {
        const undo = document.getElementById("undo");
        undo.addEventListener("click", function () {
            my.undo();
        });
        const redo = document.getElementById("redo");
        redo.addEventListener("click", function () {
            my.redo();
        });
        const color_cells = document.querySelector(".color-cells");
        const color_divs = color_cells.querySelectorAll("div");
        color_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event) {
                const selected = color_cells.querySelector(".selected");
                selected === null || selected === void 0 ? void 0 : selected.classList.remove("selected");
                const cell = event.target;
                cell.classList.add("selected");
                my.updateColor(cell.style.backgroundColor);
            });
        });
        const brush_cells = document.querySelector(".brush-cells");
        const brush_divs = brush_cells.querySelectorAll("div");
        brush_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event) {
                const selected = brush_cells.querySelector(".selected");
                selected === null || selected === void 0 ? void 0 : selected.classList.remove("selected");
                element.classList.add("selected");
                const isDefaultBrush = element.id == "cell_round";
                const target = event.currentTarget;
                const image = target.querySelector("img");
                my.brushImagePointerDown(image, isDefaultBrush);
            });
        });
        const size_cells = document.querySelector(".size-cells");
        const size_divs = size_cells.querySelectorAll("div");
        size_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event) {
                const selected = size_cells.querySelector(".selected");
                selected === null || selected === void 0 ? void 0 : selected.classList.remove("selected");
                element.classList.add("selected");
                const id = element.id;
                const px = id == "cell_small" ? 10 : id == "cell_medium" ? 30 : 50;
                my.updateSize(px);
            });
        });
        const opacity_cells = document.querySelector(".opacity-cells");
        const opacity_divs = opacity_cells.querySelectorAll("div");
        opacity_divs.forEach(function (element) {
            element.addEventListener("pointerdown", function (event) {
                const selected = opacity_cells.querySelector(".selected");
                selected === null || selected === void 0 ? void 0 : selected.classList.remove("selected");
                element.classList.add("selected");
                const id = element.id;
                const alpha = id == "cell_low" ? 10 : id == "cell_mid" ? 40 : 100;
                my.updateOpacity(alpha / 100);
            });
        });
    }
}
export const tools = new Tools();
//# sourceMappingURL=tools.js.map