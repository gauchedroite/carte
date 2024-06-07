import { menu } from "./menu.js"
import { emitEvent } from "../utils.js"


interface IState {
    username: string
    paquets: IPaquet[]
}

export interface IPaquet {
    nom: string
    success?: boolean
    cartes: ICarte[]
}

export interface ICarte {
    carteid: number
    alias: string
    date?: Date
    success?: boolean
    updatable: boolean
    faces: IFace[]
}

interface IFace {
    filename: string // `{username}_${carteid}_${faceindex}.png`
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


    //
    // Operations on the server
    //
    async fetch (): Promise<void> {
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

    async saveState(): Promise<string> {
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

    async getNextSeqno(): Promise<number> {
        const response = await window.fetch("next-seqno", { method: 'POST' });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.seqno as number;
    }

    private async newFace(carte: ICarte): Promise<IFace> {
        const filename = `${this.username}_${carte.carteid}_${carte.faces.length}.png`

        const response = await window.fetch(`new-face/${filename}`, { method: 'POST' });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        await response.text();

        const face = <IFace>{
            filename
        }
        return face;
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

    deletePaquet(name: string) {
        const index = this._state!.paquets.findIndex(one => one.nom == name);
        if (index != -1) {
            this._state!.paquets.splice(index, 1)
        }
        return this.saveState();
    }


    async addCarteToPaquet(paquetName: string) {
        const paquet = this._state!.paquets.find(one => one.nom == paquetName)!

        const seqno = await this.getNextSeqno();

        const carte = <ICarte>{
            carteid: seqno,
            alias: seqno.toString(),
            updatable: true,
            faces: []
        }

        const face = await this.newFace(carte)

        carte.faces.push(face)
        paquet.cartes.push(carte)
    
        return this.saveState()
    }

    async addFaceToCarte(carte: ICarte) {
        const face = await this.newFace(carte)
        
        carte.faces.push(face)

        return this.saveState()
    }

    buildFaceFilename(cardid: number, faceindex: number) {
        return `data/${this.username}_${cardid}_${faceindex}.png`
    }

    getCarte(cardid: number) {
        let carte: ICarte = <ICarte>{}
        this._state!.paquets.every(one => {
            const cardindex = one.cartes.findIndex(carte => carte.carteid == cardid)
            if (cardindex != -1) {
                carte = one.cartes[cardindex];
                return false
            }
            return true
        })
        return carte
    }

    getPaquetFromCarte(cardid: number) {
        let paquet: IPaquet = <IPaquet>{}
        this._state!.paquets.every(one => {
            const cardindex = one.cartes.findIndex(carte => carte.carteid == cardid)
            if (cardindex != -1) {
                paquet = one
                return false
            }
            return true
        })
        return paquet
    }

    getCarteIndex(paquet: IPaquet, cardid: number): number {
        return paquet.cartes.findIndex(one => one.carteid == cardid);
    }

    deleteCarte(paquet: IPaquet, cardid: number) {
        const index = this.getCarteIndex(paquet, cardid)
        if (index != -1) {
            paquet.cartes.splice(index, 1)
        }
        return this.saveState();
    }

    deleteFace(cardid: number, faceindex: number) {
        const carte = this.getCarte(cardid)
        carte.faces.splice(faceindex, 1)
    }
}

export const state = new State();
