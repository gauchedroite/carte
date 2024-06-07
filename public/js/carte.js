import { state } from "./game/state.js";
let current_name;
let parent_name;
export const initialize = () => {
    document.getElementById("canvas_goto_pack").addEventListener("click", gotoPaquet);
    //document.getElementById("card_list")!.addEventListener("click", (e) => gotoCarte(e))
    document.addEventListener("render", (event) => {
        if (event.detail.page == "kanvas") {
            current_name = event.detail.param;
            parent_name = event.detail.parent;
            render();
        }
    });
};
const render = () => {
    // const paquet = getCarte(current_name);
    // if (paquet.cartes.length == 0) {
    //     const subtitle = `Il n'y a pas encore<br>de carte dans le paquet.<br><br><div>Ajouter une carte!</div>`
    //     document.querySelector("#paquet .subtitle")!.innerHTML = subtitle
    //     document.querySelector("#paquet .subtitle div")!.addEventListener("click", addCarte)
    //     return;
    // }
    // document.querySelector("#paquet .title span")!.innerHTML = paquet.nom;
    // const count = paquet.cartes.length;
    // document.querySelector("#paquet .subtitle")!.innerHTML = `Il y a ${count} carte<br>dans ce paquet`
    // paquet.cartes.map(one => {
    //     const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";
    //     const text = `<div ${cls ? `class='${cls}'` : ""}><div>${one.key}</div></div>`
    //     document.getElementById("card_list")!.innerHTML = text;
    // })
};
const gotoPaquet = () => {
    state.goto("paquet", parent_name);
};
//# sourceMappingURL=carte.js.map