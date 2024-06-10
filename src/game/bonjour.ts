import * as App from "../core/app.js"
import * as router from "../core/router.js"
import { capitalize } from "../utils.js";
//
import { state } from "./state.js";

export const NS = "GBONJOUR";


const template = () =>{
    return `
    <div class="title" style="padding-top:10rem;">BONJOUR</div>
    <div class="title" style="padding-top:0;">${capitalize(state.username)}!</div>

    <div style="margin-top:3rem; text-align:center;">
        <button type="button" class="oval active-shrink" style="color:green; font-size:175%;" onclick="${NS}.onBegin()">&nbsp;Choisir un paquet!&nbsp;</button>
    </div>
`
}

export const fetch = (args: string[] | undefined) => {
    let username = (args != undefined ? args[0] : "");
    username = username.length > 0 ? username : "laura"
    state.username = username
    App.prepareRender(NS, "Bonjour")
    App.renderOnNextTick();
}

export const render = () => {
    if (!App.inContext(NS)) return ""
    return template()
}

export const postRender = () => {
    if (!App.inContext(NS)) return
}

export const onBegin = () => {
    router.goto(`#/paquets`)
}
