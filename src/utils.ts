
export async function waitAsync(msec: number) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

export function emitEvent(name: string, detail?: any) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
}
