
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

            const paquets_menu = document.querySelector("#body_paquets #paquets .menu")!
            paquets_menu?.classList.toggle("opened")

            const paquet_menu = document.querySelector("#body_paquet #paquet .menu")!
            paquet_menu?.classList.toggle("opened")

            const canvas_menu = document.querySelector("#body_kanvas #kanvas .menu")!
            canvas_menu?.classList.toggle("opened")
        });
    }

    public close() {
        const burger = document.getElementById("hamburger")!
        if (burger.classList.contains("opened"))
            document.getElementById("hamburger")!.click();
    }
}

export const menu = new Menu();
