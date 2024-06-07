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

let show_delete_card_modal = false;
let show_delete_face_modal = false;


const menuTemplate = () => {
    return `
<div class="menu">
    <ul>
        <li id="canvas_edit"><span onclick="${NS}.showTools()" style="font-weight:600;">Dessiner sur la carte</span></li>
        <li id="canvas_add_card"><span>Ajouter une carte</span></li>
        <li id="canvas_delete_card"><span onclick="${NS}.onDestroyCarte_Ask()">Détruire la carte</span></li>
        <li id="canvas_goto_pack"><a href="#/paquet/${paquet.nom}">Aller au paquet</a></li>
        <li id="canvas_no_update"><div class="muted">Don't save edits</div></li>
        <li id="canvas_add_face"><a href="#" onclick="${NS}.onAddFace();return false;">Ajouter une face</a></li>
        <!--<li id="canvas_delete_face"><span>Détruire la face</span></li>-->
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

const deleteModal = () => {
    return `
<div id="modal">
    <div class="modal-content">
        <div class="modal-title centered">Veux-tu vraiment détruire cete carte?</div>
        <div class="buttons-row">
            <button type="button" class="oval cancel" onclick="${NS}.onDestroyCarte('no')">Non</button>
            <button type="button" class="oval ok" onclick="${NS}.onDestroyCarte('yes')">&nbsp;Oui&nbsp;</button>
        </div>
    </div>
</div>
    `
}

const pagetemplate = (menu: string, modal1: string) => {
    return `
    <form>
        <input type="submit" style="display:none;" id="${NS}_dummy_submit">
        ${menu + modal1}
    </form>
    `;
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

    const modal1 = show_delete_card_modal ? deleteModal() : ""
    return pagetemplate(menuTemplate(), modal1);
}

export const postRender = () => {
    if (!App.inContext(NS)) return
    menu.show_menu_area()

    myCroquis.loadImage(filename)
    App.renderPartial("footer", `<div id="footer">${kanvasFooter()}</div>`)
}


export const showTools = () => {
    
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


export const onDestroyCarte_Ask = () => {
    show_delete_card_modal = true;
    App.render()
}

export const onDestroyCarte = async (what: string) => {
    if (what == "yes") {
        await state.deleteCarte(paquet, cardid)
    }
    show_delete_card_modal = false;
    router.goto(`#/paquet/${paquet.nom}`)
}


/*
export const onDestroyFace_Ask = () => {
    show_delete_face_modal = true;
    App.render()
}

export const onDestroyFace = async (what: string) => {
    show_delete_face_modal = false;
    if (what == "yes") {
        await state.deleteFace(cardid, faceindex)
    }
    router.goto(`#/carte/`)
}
*/