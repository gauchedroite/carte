import { menu } from "./menu.js"
import { state } from "./state.js";

export class Paquet {
    public initialize() {
        document.getElementById("paquet_goto_packs")!.addEventListener("click", this.gotoPaquets)

        document.addEventListener("render", (event: any) => {
            if (event.detail.page == "paquet")
                this.render()
        })
    }

    render() {
        console.log("render paquet")
    }

    gotoPaquets = (event: MouseEvent) => {
        state.goto("paquets",);
    }}

export const paquet = new Paquet();
