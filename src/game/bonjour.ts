import * as App from "../core/app.js"
import * as router from "../core/router.js"
//
import { menu } from "../menu.js"
import { setStateUsername, getStateUsername } from "../state.js";

export const NS = "GBONJOUR";


const template = () =>{
    let username = getStateUsername()
    username = username.charAt(0).toUpperCase() + username.slice(1)
    return `
    <div class="title" style="padding-top:10rem;">BONJOUR</div>
    <div class="title" style="padding-top:0;">${username}!</div>

    <div style="text-align:center;">
        <button type="button" class="oval" style="margin-top:8rem; color:green; font-size:200%;" onclick="${NS}.onBegin()">&nbsp;Choisir un paquet!&nbsp;</button>
    </div>
`
}

export const fetch = (args: string[] | undefined) => {
    const username = (args != undefined ? args[0] : "laura");
    setStateUsername(username)
    App.prepareRender(NS, "Bonjour")
    App.renderOnNextTick();
}

export const render = () => {
    if (!App.inContext(NS)) return ""
    return template()
}

export const postRender = () => {
    if (!App.inContext(NS)) return
    menu.hide_menu_area()
}

export const onBegin = () => {
    menu.show_menu_area()
    router.goto(`#/paquets`)
}
