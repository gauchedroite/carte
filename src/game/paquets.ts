import * as App from "../core/app.js"
import * as router from "../core/router.js"
import { state, fetch as state_fetch, hasPaquet, addPaquetToDeck } from "../state.js"

export const NS = "G_Paquets"



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
                <div onclick="${NS}.gotoPaquet('${one.nom}')">${one.nom}</div>
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



export const fetch = (args: string[] | undefined) => {
    App.prepareRender(NS, "Paquets", "paquets")
    state_fetch()
        .then(App.render)
        .catch(App.render)
}

export const render = () => {
    if (!App.inContext(NS)) return ""

    return menu() + template();
}

export const postRender = () => {
    if (!App.inContext(NS)) return
}



export const onAddPaquet_Ask = () => {
    addPaquetToDeck("Mon premier paquet")
    App.render()
}

export const gotoPaquet = (name: string) => {
    router.goto(`#/paquet/${name}`)
}
