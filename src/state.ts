
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

    // public async initialize() {
    //     return fetch("/readfile", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ filename: "laura.json" })
    //     })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    // }
}

export const state = new State();
