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
    key: number
    date?: Date
    success?: boolean
    updatable: boolean
    faces: IFace[]
}

interface IFace {
    filename: string // `carte_${id}_${noseq}.png`
}



export let state!: IState;


export async function initialize (username: string) {

    try {
        state = <IState>{ username };

        const response = await fetch(`data/${username}.json`);
        if (response.ok)
            state = await response.json();
    }
    catch (error) {
        console.error("ERROR:", error);
    }

    console.log(state)
}

export async function saveState() {
    const username = state.username;
    const body = JSON.stringify(state);

    const response = await fetch(`save-state/${username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
}


export function goto (page: string, param: string | null = null) {
    menu.close();
    setTimeout(() => {
        document.body.id = `body_${page}`
        emitEvent("render", { page, param })
    }, 200);
}

export function hasPaquet() {
    return (state.paquets?.length ?? 0) > 0
}

export function hasCarte(paquet: IPaquet) {
    return (state.paquets?.length ?? 0) > 0
}

export function addPaquetToDeck(name: string) {
    if (state.paquets == undefined)
        state.paquets = [];

    state.paquets.push(<IPaquet>{
        nom: name,
        success: undefined,
        cartes: []
    })

    saveState();
}

export function getPaquet(name: string) {
    return state.paquets.find(one => one.nom == name)!
}

export function addCarteToPaquet(name: string) {
    const carte = <ICarte>{
        key: 42,
        updatable: true,
        faces: []
    }
    const paquet = state.paquets.find(one => one.nom == name)!
    paquet.cartes.push(carte)

    saveState()
}