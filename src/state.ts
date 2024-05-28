import { menu } from "./menu.js"
import { emitEvent } from "./utils.js"

interface IState {
    username: string
    pids: Paquet[]
}

interface Paquet {
    nom: string
    success?: boolean
    cids: Carte[]
}

interface Carte {
    numba: number
    date: Date
    success?: boolean
    updatable: boolean
    fids: Face[]
}

interface Face {
    filename: string
}


export class State {
    public userdata!: IState;

    public async initialize(username: string) {

        try {
            this.userdata = <IState>{ username };

            const response = await fetch(`data/${username}.json`);
            if (response.ok)
                this.userdata = await response.json();
        }
        catch (error) {
            console.error("ERROR:", error);
        }

        console.log(this.userdata)
    }

    public goto(page: string, paquetName: string | null = null) {
        menu.close();
        setTimeout(() => {
            document.body.id = `body_${page}`
            emitEvent("render", { page, param: paquetName })
        }, 200);
    }

    public hasPaquet() {
        return (this.userdata.pids?.length ?? 0) > 0
    }

    public addPaquet(name: string) {
        if (this.userdata.pids == undefined)
            this.userdata.pids = [];

        this.userdata.pids.push(<Paquet>{
            nom: name,
            success: undefined,
            cids: []
        })
    }
}

export const state = new State();
