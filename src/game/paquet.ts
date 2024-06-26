import * as App from "../core/app.js"
import * as router from "../core/router.js"
import { pluralize } from "../utils.js";
import { state } from "./state.js";

export const NS = "G_Paquet"


let current_name: string;

let burger_opened = false;
let show_delete_modal = false;


const menuTemplate = () => {
    return `
<div id="menu_area">
    <div class="menu-content">
        <div id="hamburger" class="menu-top ${burger_opened ? "opened" : ""}" onclick="${NS}.onHamburger()">
            <svg width="30" height="30" viewBox="0 0 30 30">
                <path stroke-width="2" d="M4 8 L26 8"></path>
                <path stroke-width="2" d="M4 15 L26 15"></path>
                <path stroke-width="2" d="M4 22 L26 22"></path>
            </svg>
        </div>
        <div id="menu_center_title">Paquet</div>
        <div id="menu_right" class="active-shrink" onclick="window.location.href='#/paquets'">
            <img src="./icones/icone-back.svg" title="Aller à la boîte de paquets" width="20" height="20">
        </div>
    </div>
</div>
<div class="menu ${burger_opened ? "opened" : ""}">
    <ul>
        <li id="paquet_add_card"><span onclick="${NS}.onAddCard()">Ajouter une carte</span></li>
        <!--<li id="paquet_restart_pack"><span>Recommencer le paquet</span></li>-->
        <li id="paquet_delete_pack" onclick="${NS}.onDestroyPaquet('modal')"><span>Détruire le paquet</span></li>
        <li id="paquet_goto_packs"><a href="#/paquets">Aller à la boîte de paquets</a></li>
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
        <div class="subtitle">Il n'y a pas encore<br>de carte dans ce paquet!<br><br>
            <div onclick="${NS}.onAddCard()">Ajouter une carte</div>
        </div>
        `
    }

    const carteSelected = state.carteSelected
    const count = paquet.cartes.length;

    const lines = paquet.cartes
        .map(one => {
            const status = state.getCardStatus(one.carteid)
            const success = status?.success

            const classList: string[] = []
            classList.push("active-shrink")

            if (success != undefined)
                classList.push(success ? "success" : "fail")
            if (one.carteid == carteSelected)
                classList.push("selected")

            return `<div ${classList.length ? `class='${classList.join(" ")}'` : ""}>
                <a href="#/carte/${one.carteid}/0">${one.carteid}</a>
            </div>`
        })
        .reduce((acc, one) => acc + one, "")

    return `
<div class="title"><span>${paquet.nom}</span></div>
<div class="subtitle">Ce paquet contient ${count} ${pluralize("carte", count)}</div>
<div id="card_list">
        ${lines}
</div>
<!--<div class="bravo">Bravo pour ta réussite!</div>-->
`
}

const deleteModal = () => {
    return `
<div id="modal">
    <div class="modal-content">
        <div class="modal-title centered">Veux-tu vraiment détruire ce paquet?</div>
        <div class="buttons-row">
            <button type="button" class="oval cancel active-shrink" onclick="${NS}.onDestroyPaquet('no')">Non</button>
            <button type="button" class="oval ok active-shrink" onclick="${NS}.onDestroyPaquet('yes')">&nbsp;Oui&nbsp;</button>
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
    state.paquetSelected = current_name
    burger_opened = false
    App.prepareRender(NS, "Paquet")
    refresh()
}

export const render = () => {
    if (!App.inContext(NS)) return ""

    return pagetemplate(menuTemplate(), template(), show_delete_modal ? deleteModal() : "");
}

export const postRender = () => {
    if (!App.inContext(NS)) return
}


export const onHamburger = () => {
    burger_opened = !burger_opened
    App.render()
}


export const onAddCard = async () => {
    burger_opened = false
    await state.addCarteToPaquet(current_name)
    refresh()
}


export const onDestroyPaquet = async (what: string) => {
    burger_opened = false

    if (what == "modal") {
        show_delete_modal = true;
        App.render()
    }
    else if (what == "yes") {
        await state.deletePaquet(current_name)
        show_delete_modal = false
        router.goto(`#/paquets`)
    }
    else {
        show_delete_modal = false
        App.render()
    }
}
