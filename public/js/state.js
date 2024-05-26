export class State {
    async initialize(username) {
        try {
            this.userdata = { username };
            const response = await fetch(`data/${username}.json`);
            if (response.ok)
                this.userdata = await response.json();
        }
        catch (error) {
            console.error("ERROR:", error);
        }
        console.log(this.userdata);
    }
}
export const state = new State();
//# sourceMappingURL=state.js.map