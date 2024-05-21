export class Menu {
    constructor() {
        this.initialized = false;
    }
    initialize() {
        if (this.initialized)
            return;
        const menu_panel = document.querySelector(".menu-panel");
        const burger = document.getElementById("hamburger");
        burger.addEventListener("click", function (event) {
            burger.classList.toggle("opened");
            menu_panel.classList.toggle("opened");
        });
    }
}
export const menu = new Menu();
//# sourceMappingURL=menu.js.map