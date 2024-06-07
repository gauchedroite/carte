import * as App from "../core/app.js"
import * as router from "../core/router.js"
import { menu } from "./menu.js"
import { state } from "./state.js";

export const NS = "G_Paquet"


let current_name: string;
let show_delete_modal = false;


const menuTemplate = () => {
    return `
<div class="menu">
    <ul>
        <li id="paquet_add_card"><span onclick="${NS}.onAddCard()">Ajouter une carte</span></li>
        <!--<li id="paquet_restart_pack"><span>Recommencer le paquet</span></li>-->
        <li id="paquet_delete_pack" onclick="${NS}.onDestroyPaquet_Ask()"><span>Détruire le paquet</span></li>
        <li id="paquet_goto_packs"><a href="#/paquets">Aller à la liste de paquets</a></li>
    </ul>
    <div class="imperfect-horizontal-line"></div>
</div>
`
}

const template = () => {
    const paquet = state.getPaquet(current_name);

    if (!state.hasCarte(paquet)) {
        return `
        <div class="title"><span>${paquet.nom}</span></div>
        <div class="subtitle">Il n'y a pas encore<br>de carte dans ce paquet.<br><br>
            <div onclick="${NS}.onAddCard()">Ajouter une carte!</div>
        </div>
        `
    }

    const count = paquet.cartes.length;
    const lines = paquet.cartes
        .map(one => {
            const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";
            return `<div ${cls ? `class='${cls}'` : ""}>
                <div><a href="#/carte/${one.carteid}/0">${one.carteid}</a></div>
            </div>`
        })
        .reduce((acc, one) => acc + one, "")

    return `
<div class="title"><span>${paquet.nom}</span></div>
<div class="subtitle">Il contient ${count} carte</div>
<div id="card_list">
        ${lines}
</div>
<div class="bravo">Bravo pour ta réussite!</div>
`
/*
    <!--<div class="success"><div>1</div></div>
    <div class="success selected"><div>2</div></div>
    <div><div>3</div></div>
    <div class="fail"><div>4</div></div>
    <div class="success"><div>5</div></div>
    <div class="success"><div>6</div></div>
    <div class="success"><div>7</div></div>-->*/
}

const deleteModal = () => {
    return `
<div id="modal">
    <div class="modal-content">
        <div class="modal-title centered">Veux-tu vraiment détruire ce paquet?</div>
        <div class="buttons-row">
            <button type="button" class="oval cancel" onclick="${NS}.onDestroyPaquet('no')">Non</button>
            <button type="button" class="oval ok" onclick="${NS}.onDestroyPaquet('yes')">&nbsp;Oui&nbsp;</button>
        </div>
    </div>
</div>
    `
}

const pagetemplate = (menu: string, template: string, modal: string) => {
    return `
    <form>
        <input type="submit" style="display:none;" id="${NS}_dummy_submit">
        ${menu + template + modal}
    </form>
    `;
}


const refresh = () => {
    state.fetch()
        .then(App.render)
        .catch(App.render)    
}

export const fetch = (args: string[] | undefined) => {
    current_name = decodeURIComponent(args![0])
    menu.close()
    App.prepareRender(NS, "Paquet")
    refresh()
}

export const render = () => {
    if (!App.inContext(NS)) return ""

    return pagetemplate(menuTemplate(), template(), show_delete_modal ? deleteModal() : "");
}

export const postRender = () => {
    if (!App.inContext(NS)) return
    menu.show_menu_area()
}



export const onAddCard = async () => {
    menu.close()
    await state.addCarteToPaquet(current_name)
    refresh()
}


export const onDestroyPaquet_Ask = () => {
    show_delete_modal = true;
    App.render()
}

export const onDestroyPaquet = async (what: string) => {
    if (what == "yes") {
        await state.deletePaquet(current_name)
    }
    show_delete_modal = false;
    router.goto(`#/paquets`)
}
