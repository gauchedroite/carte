import { menu } from "./menu.js";
import { emitEvent } from "./utils.js";
class State {
    constructor() {
        this._username = localStorage.getItem("username");
        if (this._username == undefined)
            this._username = "laura";
    }
    set username(value) {
        this._username = value;
        localStorage.setItem("username", value);
    }
    get username() {
        return this._username;
    }
    get paquets() {
        return this._state.paquets;
    }
    async fetch() {
        try {
            // Failure to retrieve this url is expected
            const response = await window.fetch(`data/${this._username}.json`);
            if (response.ok)
                this._state = await response.json();
            else
                this._state = { username: this._username };
        }
        catch (error) {
            console.error("ERROR:", error);
        }
    }
    async saveState() {
        const body = JSON.stringify(this._state);
        const response = await window.fetch(`save-state/${this._username}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    }
    goto(page, param = null, parent = null) {
        menu.close();
        setTimeout(() => {
            document.body.id = `body_${page}`;
            emitEvent("render", { page, param, parent });
        }, 200);
    }
    hasPaquet() {
        var _a, _b;
        return ((_b = (_a = this._state.paquets) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
    }
    hasCarte(paquet) {
        var _a, _b;
        return ((_b = (_a = paquet.cartes) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
    }
    addPaquetToDeck(name) {
        if (this._state.paquets == undefined)
            this._state.paquets = [];
        this._state.paquets.push({
            nom: name,
            success: undefined,
            cartes: []
        });
        return this.saveState();
    }
    getPaquet(name) {
        return this._state.paquets.find(one => one.nom == name);
    }
    addCarteToPaquet(name) {
        const carte = {
            carteid: 42,
            updatable: true,
            faces: []
        };
        const paquet = this._state.paquets.find(one => one.nom == name);
        paquet.cartes.push(carte);
        return this.saveState();
    }
}
export const state = new State();
//# sourceMappingURL=state.js.map