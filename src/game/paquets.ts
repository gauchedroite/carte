import * as App from "../core/app.js"
import * as router from "../core/router.js"
import * as Misc from "../core/misc.js"
import { state } from "./state.js"

export const NS = "G_Paquets"


let burger_opened = false;
let show_modal = false;


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
    </div>
</div>
<div class="menu ${burger_opened ? "opened" : ""}">
    <ul>
        <li id="paquets_add_pack"><span onclick="${NS}.onAddPaquet_Ask()">Ajouter un paquet</span></li>
    </ul>
    <div class="imperfect-horizontal-line"></div>
</div>
`
}

const template = () => {
    if (!state.hasPaquet()) {
        return `
        <div class="title"><span>Les paquets</span></div>
        <div class="subtitle">Il n'y a pas encore<br>de paquet.<br><br>
            <div onclick="${NS}.onAddPaquet_Ask()">Ajouter un paquet!</div>
        </div>
        `
    }

    const paquetSelected = state.paquetSelected
    const count = state.paquets.length;
    const lines = state.paquets
        .map(one => {
            const status = state.getPaquetStatus(one.nom)
            const success = status?.success

            const classList: string[] = []

            if (success != undefined)
                classList.push(success ? "success" : "fail")
            if (one.nom == paquetSelected)
                classList.push("selected")

            return `<li ${classList.length ? `class='${classList.join(" ")}'` : ""}>
                <a href="#/paquet/${one.nom}">${one.nom}</a>
            </li>`
        })
        .reduce((acc, one) => acc + one, "")

    return `
<div class="title"><span>Les paquets</span></div>
<div class="subtitle">Il y a ${count} paquet</div>
<ul id="paquet_list">
    ${lines}
</ul>
`
}

const modal = () => {
    return `
<div id="modal">
    <div class="modal-content">
        <div class="modal-title">Nom du nouveau paquet:</div>
        <input type="text" title="Nom" required>
        <div class="buttons-row">
            <button type="button" class="oval cancel" onclick="${NS}.onModal('close')">Annuler</button>
            <button type="button" class="oval ok" onclick="${NS}.onModal('ok')">&nbsp;OK&nbsp;</button>
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
    burger_opened = false
    App.prepareRender(NS, "Paquets")
    refresh()
}

export const render = () => {
    if (!App.inContext(NS)) return ""

    return pagetemplate(menuTemplate(), template(), show_modal ? modal() : "");
}

export const postRender = () => {
    if (!App.inContext(NS)) return
}


export const onHamburger = () => {
    burger_opened = !burger_opened
    App.render()
}


export const onModal = async (what: string) => {
    if (what == "ok") {
        if (!Misc.html5Valid(NS)) return

        const name = (document.querySelector("#modal input") as HTMLInputElement).value
        await state.addPaquetToDeck(name)
    }

    show_modal = false;
    refresh()
}

export const onAddPaquet_Ask = () => {
    show_modal = true;
    burger_opened = false
    App.render()
}
