import { state } from "./state.js";
export class Paquet {
    constructor() {
        this.gotoPaquets = (event) => {
            state.goto("paquets");
        };
    }
    initialize() {
        document.getElementById("paquet_goto_packs").addEventListener("click", this.gotoPaquets);
        document.addEventListener("render", (event) => {
            if (event.detail.page == "paquet")
                this.render();
        });
    }
    render() {
        console.log("render paquet");
    }
}
export const paquet = new Paquet();
//# sourceMappingURL=paquet.js.map