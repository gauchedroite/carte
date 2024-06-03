import * as App from "../core/app.js"
import * as router from "../core/router.js"
import * as Misc from "../core/misc.js"
import { state, fetch as state_fetch, hasPaquet, addPaquetToDeck } from "../state.js"

export const NS = "G_Paquets"


let show_modal = false;


const menu = () => {
    return `
<div class="menu">
    <ul>
        <li id="paquets_add_pack"><span onclick="${NS}.onAddPaquet_Ask()">Ajouter un paquet</span></li>
    </ul>
    <div class="imperfect-horizontal-line"></div>
</div>
`
}

const template = () => {
    if (!hasPaquet()) {
        return `
        <div class="title"><span>Les paquets</span></div>
        <div class="subtitle">Il n'y a pas encore<br>de paquet.<br><br>
            <div onclick="${NS}.onAddPaquet_Ask()">Ajouter un paquet!</div>
        </div>
        `
    }

    const count = state.paquets.length;
    const lines = state.paquets
        .map(one => {
            const cls = one.success != undefined ? (one.success ? "success" : "fail") : "";
            return `<li ${cls ? `class='${cls}'` : ""}>
                <a href="#/paquet/${one.nom}">${one.nom}</a>
            </li>`
        })
        .reduce((acc, one) => acc + one, "")

    return `
<div class="title"><span>Les paquets</span></div>
<div class="subtitle">Il y a ${count} paquets</div>
<ul id="paquet_list">
    ${lines}
</ul>
`
/*
    <li class="success"><div>Animaux</div></li>
    <li class="success"><div>Choses</div></li>
    <li><div>Pas essayé aujourd'hui</div></li>
    <li class="fail selected"><div>Difficile</div></li>*/
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



export const fetch = (args: string[] | undefined) => {
    App.prepareRender(NS, "Paquets")
    state_fetch()
        .then(App.render)
        .catch(App.render)
}

export const render = () => {
    if (!App.inContext(NS)) return ""

    return pagetemplate(menu(), template(), show_modal ? modal() : "");
}

export const postRender = () => {
    if (!App.inContext(NS)) return
}



export const onModal = (what: string) => {
    if (what == "ok") {
        if (!Misc.html5Valid(NS)) return

        const name = (document.querySelector("#modal input") as HTMLInputElement).value
        addPaquetToDeck(name)
    }

    show_modal = false;
    App.render();
}

export const onAddPaquet_Ask = () => {
    show_modal = true;
    App.render()
}
