
import * as router from "../core/router.js"
import * as bonjour from "./bonjour.js"
import * as paquets from "./paquets.js"
import * as paquet from "./paquet.js"
import * as carte from "./carte.js"


(window as any)[bonjour.NS] = bonjour;
(window as any)[paquets.NS] = paquets;
(window as any)[paquet.NS] = paquet;
(window as any)[carte.NS] = carte;



export const startup = () => {
    router.addRoute("^#/bonjour/?(.*)$", params => bonjour.fetch(params));
    router.addRoute("^#/paquets/?(.*)$", params => paquets.fetch(params));
    router.addRoute("^#/paquet/?(.*)$", params => paquet.fetch(params));
    router.addRoute("^#/carte/?(.*)$", params => carte.fetch(params));
}

export const render = () => {
    return `
    ${bonjour.render()}
    ${paquets.render()}
    ${paquet.render()}
    ${carte.render()}
`
}

export const postRender = () => {
    bonjour.postRender();
    paquets.postRender();
    paquet.postRender();
    carte.postRender();
}

