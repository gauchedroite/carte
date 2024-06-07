import * as App from "../core/app.js"
import * as router from "../core/router.js"
import { menu } from "./menu.js"
import { state, ICarte, IPaquet } from "./state.js";
import { myCroquis } from "./mycroquis.js"

export const NS = "G_Carte"


let cardid: number;
let faceindex: number;

let carte: ICarte;
let paquet: IPaquet;
let filename: string;
let carteIndex: number;
let isLastCard = false;


const menuTemplate = () => {
    return `
<div class="menu">
    <ul>
        <li id="canvas_edit"><span style="font-weight:600;">Dessiner sur la carte</span></li>
        <li id="canvas_add_card"><span>Ajouter une carte</span></li>
        <li id="canvas_delete_card"><span>Détruire la carte</span></li>
        <li id="canvas_goto_pack"><a href="#/paquet/${paquet.nom}">Aller au paquet</a></li>
        <li id="canvas_no_update"><span>Don't save edits</span></li>
        <li id="canvas_add_face"><a href="#" onclick="${NS}.onAddFace();return false;">Ajouter une face</a></li>
        <li id="canvas_delete_face"><span>Détruire la face</span></li>
    </ul>
    <div class="imperfect-horizontal-line"></div>
</div>
`
}

const kanvasFooter = () => {
    const faceCount = carte.faces.length

    const isFirstFace = faceindex == 0
    const isLastFace = faceindex == faceCount - 1;

    if (isLastFace) {
        return `
            <button type="button" class="oval ov3" onclick="${NS}.onClickResult('success')">
                <img src="./icones/icone-check.svg" title="check" width="50" height="50">
            </button>
            <button type="button" class="oval" onclick="${NS}.onClickResult('failure')">
                <img src="./icones/icone-delete.svg" title="delete" width="50" height="50">
            </button>`
    }
    else if (!isFirstFace) {
        return `
            <button type="button" class="oval ov1" onclick="window.location.href='#/carte/${cardid}/${faceindex - 1}'">
                <img src="./icones/icone-previous2.svg" title="undo" width="50" height="50">
            </button>
            <button type="button" class="oval ov2" onclick="window.location.href='#/carte/${cardid}/${faceindex + 1}'">
                <img src="./icones/icone-next2.svg" title="redo" width="50" height="50">
            </button>`
    }
    else {
        return `
            <button type="button" class="oval ov2" onclick="window.location.href='#/carte/${cardid}/1'">
                <img src="./icones/icone-next2.svg" title="redo" width="50" height="50">
            </button>`
    }
}



const refresh = () => {
    state.fetch()
        .then(App.render)
        .catch(App.render)    
}

export const fetch = (args: string[] | undefined) => {
    cardid = +args![0]
    faceindex = +args![1]
    menu.close()
    App.prepareRender(NS, "Carte")
    refresh()
}

export const render = () => {
    if (!App.inContext(NS)) return ""

    carte = state.getCarte(cardid)
    paquet = state.getPaquetFromCarte(cardid)
    filename = state.buildFaceFilename(cardid, faceindex)
    carteIndex = state.getCarteIndex(paquet, cardid)
    isLastCard = carteIndex == paquet.cartes.length - 1;

    return menuTemplate();
}

export const postRender = () => {
    if (!App.inContext(NS)) return
    menu.show_menu_area()

    myCroquis.loadImage(filename)
    App.renderPartial("footer", `<div id="footer">${kanvasFooter()}</div>`)
}


export const onClickResult = (status: string) => {
    // store result, then
    if (isLastCard) {
        router.goto(`#/paquet/${paquet.nom}`)
    }
    else {
        router.goto(`#/carte/${paquet.cartes[carteIndex + 1].carteid}/0`)
    }
}

export const onAddFace = async () => {
    menu.close()
    await state.addFaceToCarte(carte)
    router.goto(`#/carte/${cardid}/${faceindex + 1}`)
}
