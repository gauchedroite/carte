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
            const paquets_menu = document.querySelector("#body_paquets #paquets .menu");
            paquets_menu === null || paquets_menu === void 0 ? void 0 : paquets_menu.classList.toggle("opened");
            const paquet_menu = document.querySelector("#body_paquet #paquet .menu");
            paquet_menu === null || paquet_menu === void 0 ? void 0 : paquet_menu.classList.toggle("opened");
            const canvas_menu = document.querySelector("#body_kanvas #kanvas .menu");
            canvas_menu === null || canvas_menu === void 0 ? void 0 : canvas_menu.classList.toggle("opened");
        });
    }
}
export const menu = new Menu();
//# sourceMappingURL=menu.js.map