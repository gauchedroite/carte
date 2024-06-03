import * as App from "../core/app.js"
import * as router from "../core/router.js"
import { state, fetch as state_fetch, hasCarte, getPaquet, addCarteToPaquet } from "../state.js";

export const NS = "G_Paquet"


let current_name: string;

const menu = () => {
    return `
<div class="menu">
    <ul>
        <li id="paquet_add_card"><span>Ajouter une carte</span></li>
        <li id="paquet_restart_pack"><span>Recommencer le paquet</span></li>
        <li id="paquet_delete_pack"><span>Détruire le paquet</span></li>
        <li id="paquet_goto_packs"><a href="#/paquets">Aller à la liste de paquets</a></li>
    </ul>
    <div class="imperfect-horizontal-line"></div>
</div>
`
}

const template = () => {
    const paquet = getPaquet(current_name);

    if (!hasCarte(paquet)) {
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
                <div>${one.key}</div>
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



export const fetch = (args: string[] | undefined) => {
    current_name = decodeURIComponent(args![0])
    App.prepareRender(NS, "Paquet")
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



export const onAddCard = () => {
    addCarteToPaquet(current_name)
    App.render();
}
