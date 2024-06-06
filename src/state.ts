import { menu } from "./menu.js"
import { emitEvent } from "./utils.js"


interface IState {
    username: string
    paquets: IPaquet[]
}

interface IPaquet {
    nom: string
    success?: boolean
    cartes: ICarte[]
}

interface ICarte {
    carteid: number
    date?: Date
    success?: boolean
    updatable: boolean
    faces: IFace[]
}

interface IFace {
    filename: string // `{username}/${carteid}_${faceindex}.png`
}



class State {
    private _state: IState | undefined;
    private _username: string | null

    constructor() {
        this._username = localStorage.getItem("username")
        if (this._username == undefined)
            this._username = "laura";
    }



    set username(value: string) {
        this._username = value
        localStorage.setItem("username", value)
    }

    get username() {
        return this._username!
    }

    get paquets() {
        return this._state!.paquets;
    }



    async fetch () {
        try {
            // Failure to retrieve this url is expected
            const response = await window.fetch(`data/${this._username}.json`);
            if (response.ok)
                this._state = await response.json();
            else
                this._state = <IState>{ username: this._username }
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



    goto (page: string, param: string | null = null, parent: string | null = null) {
        menu.close();
        setTimeout(() => {
            document.body.id = `body_${page}`
            emitEvent("render", { page, param, parent })
        }, 200);
    }



    hasPaquet() {
        return (this._state!.paquets?.length ?? 0) > 0
    }

    hasCarte(paquet: IPaquet) {
        return (paquet.cartes?.length ?? 0) > 0
    }

    addPaquetToDeck(name: string) {
        if (this._state!.paquets == undefined)
            this._state!.paquets = [];
    
        this._state!.paquets.push(<IPaquet>{
            nom: name,
            success: undefined,
            cartes: []
        })
    
        return this.saveState();
    }

    getPaquet(name: string) {
        return this._state!.paquets.find(one => one.nom == name)!
    }

    addCarteToPaquet(name: string) {
        const carte = <ICarte>{
            carteid: 42,
            updatable: true,
            faces: []
        }
        const paquet = this._state!.paquets.find(one => one.nom == name)!
        paquet.cartes.push(carte)
    
        return this.saveState()
    }
}

export const state = new State();
