import { state, goto, hasPaquet, addPaquetToDeck } from "./state.js";

export const initialize = () => {
    document.getElementById("paquets_add_pack")!.addEventListener("click", askPaquetName)
    document.getElementById("paquet_list")!.addEventListener("click", (e) => gotoPaquet(e))

    document.addEventListener("render", (event: any) => {
        if (event.detail.page == "paquets")
            render()
    })
}

const render = () => {
    if (!hasPaquet()) {
        const subtitle = `Il n'y a pas encore<br>de paquet.<br><br><div>Ajouter un paquet!</div>`
        document.querySelector("#paquets .subtitle")!.innerHTML = subtitle
        document.querySelector("#paquets .subtitle div")!.addEventListener("click", addPaquet)
        return;
    }

    const count = state.paquets.length;
    document.querySelector("#paquets .subtitle")!.innerHTML = `Il y a ${count} paquets`

    state.paquets.map(one => {
        const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";

        const text = `<li ${cls ? `class='${cls}'` : ""}><div>${one.nom}</div></li>`
        document.getElementById("paquet_list")!.innerHTML = text;
    })
}

const askPaquetName = () => {
}

const addPaquet = () => {
    addPaquetToDeck("bonjour!")
    render();
}

const gotoPaquet = (event: MouseEvent) => {
    const element = event.target as Element;
    if (element.nodeName != "DIV")
        return;

    goto("paquet", element.textContent!);
}
