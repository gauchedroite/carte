import { menu } from "./menu.js";
import { emitEvent } from "./utils.js";
export let state;
let username;
export function initialize(user_name) {
    username = user_name;
}
export async function fetch() {
    if (state != undefined)
        return Promise.resolve();
    try {
        state = { username };
        const response = await window.fetch(`data/${username}.json`);
        if (response.ok)
            state = await response.json();
    }
    catch (error) {
        console.error("ERROR:", error);
    }
}
export async function saveState() {
    const body = JSON.stringify(state);
    const response = await window.fetch(`save-state/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
}
export function goto(page, param = null, parent = null) {
    menu.close();
    setTimeout(() => {
        document.body.id = `body_${page}`;
        emitEvent("render", { page, param, parent });
    }, 200);
}
export function hasPaquet() {
    var _a, _b;
    return ((_b = (_a = state.paquets) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
}
export function hasCarte(paquet) {
    var _a, _b;
    return ((_b = (_a = paquet.cartes) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
}
export function addPaquetToDeck(name) {
    if (state.paquets == undefined)
        state.paquets = [];
    state.paquets.push({
        nom: name,
        success: undefined,
        cartes: []
    });
    saveState();
}
export function getPaquet(name) {
    return state.paquets.find(one => one.nom == name);
}
export function addCarteToPaquet(name) {
    const carte = {
        key: 42,
        updatable: true,
        faces: []
    };
    const paquet = state.paquets.find(one => one.nom == name);
    paquet.cartes.push(carte);
    saveState();
}
//# sourceMappingURL=state.js.map