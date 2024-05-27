import { state } from "./state.js";
export class Paquets {
    constructor() {
        this.addPaquet = () => {
            //state.goto("paquet");
            state.addPaquet("bonjour!");
            this.render();
        };
        this.gotoPaquet = (event) => {
            if (event.target.nodeName != "DIV")
                return;
            console.log(event);
        };
    }
    initialize() {
        document.getElementById("paquets_add_pack").addEventListener("click", this.addPaquet);
        document.querySelector("#paquets_empty div").addEventListener("click", this.addPaquet);
        document.getElementById("paquet_list").addEventListener("click", this.gotoPaquet);
        document.addEventListener("render", (event) => {
            if (event.detail.page == "paquets")
                this.render();
        });
    }
    render() {
        const display = state.hasPaquet() ? "none" : "block";
        document.getElementById("paquets_empty").style.display = display;
        if (!state.hasPaquet())
            return;
        const pids = state.userdata.pids;
        const text = pids.map(one => {
            const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";
            const text = `<li ${cls ? `class='${cls}'` : ""}><div>${one.nom}</div></li>`;
            document.getElementById("paquet_list").innerHTML = text;
        });
    }
}
export const paquets = new Paquets();
//# sourceMappingURL=paquets.js.map