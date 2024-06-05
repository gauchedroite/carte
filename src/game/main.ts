
import * as router from "../core/router.js"
import * as bonjour from "./bonjour.js"
import * as paquets from "./paquets.js"
import * as paquet from "./paquet.js"


(window as any)[bonjour.NS] = bonjour;
(window as any)[paquets.NS] = paquets;
(window as any)[paquet.NS] = paquet;



export const startup = () => {
    router.addRoute("^#/bonjour/?(.*)$", params => bonjour.fetch(params));
    router.addRoute("^#/paquets/?(.*)$", params => paquets.fetch(params));
    router.addRoute("^#/paquet/?(.*)$", params => paquet.fetch(params));
}

export const render = () => {
    return `
    ${bonjour.render()}
    ${paquets.render()}
    ${paquet.render()}
`
}

export const postRender = () => {
    bonjour.postRender();
    paquets.postRender();
    paquet.postRender();
}

