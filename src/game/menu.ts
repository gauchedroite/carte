
export class Menu {
    private initialized = false;

    public initialize() {
        if (this.initialized)
            return;

        const burger = document.getElementById("hamburger")!

        burger.addEventListener("click", function (event: Event) {
            burger.classList.toggle("opened")

            const menu_area = document.querySelector("#menu_area")!
            menu_area?.classList.toggle("opened")

            const menu = document.querySelector("#app_root .menu")!
            menu?.classList.toggle("opened")
        });
    }

    public close() {
        const burger = document.getElementById("hamburger")!
        if (burger.classList.contains("opened"))
            document.getElementById("hamburger")!.click();
    }

    public hide_menu_area() {
        const menu = document.getElementById("menu_area")!
        menu.classList.add("hidden")
    }

    public show_menu_area() {
        const menu = document.getElementById("menu_area")!
        menu.classList.remove("hidden")
    }
}

export const menu = new Menu();
