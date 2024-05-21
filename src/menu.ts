
export class Menu {
    initialized = false;

    public initialize() {
        if (this.initialized)
            return;

        const menu_panel = document.querySelector(".menu-panel")!
        const burger = document.getElementById("hamburger")!

        burger.addEventListener("click", function (event: Event) {
            burger.classList.toggle("opened")
            menu_panel.classList.toggle("opened")
        });

    }
}

export const menu = new Menu();
