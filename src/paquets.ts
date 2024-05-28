import { menu } from "./menu.js"
import { state } from "./state.js";

export class Paquets {
    public initialize() {
        const me = this;

        document.getElementById("paquets_add_pack")!.addEventListener("click", this.addPaquet)
        document.querySelector("#paquets_empty div")!.addEventListener("click", this.addPaquet)
        document.getElementById("paquet_list")!.addEventListener("click", (e) => this.gotoPaquet(e))

        document.addEventListener("render", (event: any) => {
            if (event.detail.page == "paquets")
                this.render()
        })
    }

    render() {
        const display = state.hasPaquet() ? "none" : "block"
        document.getElementById("paquets_empty")!.style.display = display;

        if (!state.hasPaquet())
            return;

        const pids = state.userdata.pids;
        const text = pids.map(one => {
            const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";

            const text = `<li ${cls ? `class='${cls}'` : ""}><div>${one.nom}</div></li>`
            document.getElementById("paquet_list")!.innerHTML = text;
        })
    }

    addPaquet = () => {
        state.addPaquet("bonjour!")
        this.render();
    }

    gotoPaquet = (event: MouseEvent) => {
        const element = event.target as Element;
        if (element.nodeName != "DIV")
            return;

        state.goto("paquet", element.textContent!);
    }
}

export const paquets = new Paquets();
