import { menu } from "./menu.js"
import { state } from "./state.js";

export class Paquet {
    public initialize() {
        document.addEventListener("render", (event: any) => {
            if (event.detail.page == "paquet")
                this.render()
        })
    }

    render() {
        console.log("render paquet")
    }
}

export const paquet = new Paquet();
