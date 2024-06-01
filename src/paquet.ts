import { state, getPaquet, goto, addCarteToPaquet } from "./state.js";


let current_name: string;

export const initialize = () => {
    document.getElementById("paquet_goto_packs")!.addEventListener("click", gotoPaquets)
    document.getElementById("card_list")!.addEventListener("click", (e) => gotoCarte(e))

    document.addEventListener("render", (event: any) => {
        if (event.detail.page == "paquet") {
            current_name = event.detail.param
            render()
        }
    })
}

const render = () => {
    const paquet = getPaquet(current_name);

    if (paquet.cartes.length == 0) {
        const subtitle = `Il n'y a pas encore<br>de carte dans le paquet.<br><br><div>Ajouter une carte!</div>`
        document.querySelector("#paquet .subtitle")!.innerHTML = subtitle
        document.querySelector("#paquet .subtitle div")!.addEventListener("click", addCarte)
        return;
    }

    document.querySelector("#paquet .title span")!.innerHTML = paquet.nom;

    const count = paquet.cartes.length;
    document.querySelector("#paquet .subtitle")!.innerHTML = `Il y a ${count} carte<br>dans ce paquet`

    paquet.cartes.map(one => {
        const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";

        const text = `<div ${cls ? `class='${cls}'` : ""}><div>${one.key}</div></div>`
        document.getElementById("card_list")!.innerHTML = text;
    })
}

const addCarte = () => {
    addCarteToPaquet(current_name)
    render();
}

const gotoPaquets = () => {
    goto("paquets");
}

const gotoCarte = (event: MouseEvent) => {
    const element = event.target as Element;
    if (element.nodeName != "DIV")
        return;

    // Only accept clicks on divs within #card_list
    if (element.id == "card_list")
        return;

    goto("kanvas", element.textContent!, current_name);
}