export async function waitAsync(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
export function emitEvent(name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
}
//# sourceMappingURL=utils.js.map