export class Tools {
    initialize() {
        const tools = document.querySelector(".left-tools");
        const undo = document.getElementById("undo");
        undo.addEventListener("click", function () {
            console.log("undo");
        });
        const redo = document.getElementById("redo");
        redo.addEventListener("click", function () {
            console.log("redo");
        });
    }
}
export const tools = new Tools();
//# sourceMappingURL=Overworld.js.map