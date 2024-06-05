export class Menu {
    constructor() {
        this.initialized = false;
    }
    initialize() {
        if (this.initialized)
            return;
        const burger = document.getElementById("hamburger");
        burger.addEventListener("click", function (event) {
            burger.classList.toggle("opened");
            const menu_area = document.querySelector("#menu_area");
            menu_area === null || menu_area === void 0 ? void 0 : menu_area.classList.toggle("opened");
            const menu = document.querySelector("#app_root .menu");
            menu === null || menu === void 0 ? void 0 : menu.classList.toggle("opened");
        });
    }
    close() {
        const burger = document.getElementById("hamburger");
        if (burger.classList.contains("opened"))
            document.getElementById("hamburger").click();
    }
    hide_menu_area() {
        const menu = document.getElementById("menu_area");
        menu.classList.add("hidden");
    }
    show_menu_area() {
        const menu = document.getElementById("menu_area");
        menu.classList.remove("hidden");
    }
}
export const menu = new Menu();
//# sourceMappingURL=menu.js.map