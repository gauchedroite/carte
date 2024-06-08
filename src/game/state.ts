
interface IState {
    username: string
    paquets: IPaquet[]
}

export interface IPaquet {
    nom: string
    cartes: ICarte[]
}

export interface ICarte {
    carteid: number
    alias: string
    updatable: boolean
    faces: IFace[]
}

interface IFace {
    filename: string // `{username}_${carteid}_${faceindex}.png`
}

interface ILocalState {
    paquet: string
    cardid: number
    cards: ILocalCard[]
}

interface ILocalCard {
    cardid: number
    success: boolean
    //date: Date
}

interface ILocalPaquet {
    success: boolean
}


class State {
    private _state: IState | undefined
    private _username: string
    private _localState: ILocalState

    constructor() {
        this._localState = <ILocalState>{}
        this._username = "laura"
        this.username = localStorage.getItem("username") ?? "laura"
    }



    set username(value: string) {
        this._username = value
        localStorage.setItem("username", value)
        const json = localStorage.getItem(value)
        this._localState = JSON.parse(json ?? "{}")
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


    private saveLocalState() {
        localStorage.setItem(this._username, JSON.stringify(this._localState))
    }

    set paquetSelected(paquetName: string) {
        this._localState.paquet = paquetName
        this.saveLocalState()
    }

    get paquetSelected() {
        return this._localState.paquet
    }

    set carteSelected(cardid: number) {
        this._localState.cardid = cardid
        this.saveLocalState()
    }

    get carteSelected() {
        return this._localState.cardid
    }

    setCarteStatus(cardid: number, success: boolean) {
        if (this._localState.cards == undefined)
            this._localState.cards = []

        const entry = this._localState.cards.find(one => one.cardid == cardid)
        if (entry == undefined) {
            this._localState.cards.push(<ILocalCard>{
                cardid,
                success,
                //date: new Date()
            })
        }
        else {
            entry.success = success
            //entry.date = new Date()
        }

        this.saveLocalState()
    }

    getCardStatus(cardid: number) {
        return this._localState.cards?.find(one => one.cardid == cardid)
    }

    getPaquetStatus(name: string) {
        const paquet = this.getPaquet(name)

        let undecided = false
        let ok = true
        paquet.cartes.forEach(one => {
            const status = this.getCardStatus(one.carteid)
            if (status != undefined) {
                ok = ok && status.success
            }
            else {
                undecided = true
            }
        })

        const success = (!undecided ? ok : null)

        let localStatus = <ILocalPaquet>{
            success
        }
        return localStatus
    }
}

export const state = new State();
