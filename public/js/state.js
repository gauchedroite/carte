import { menu } from "./menu.js";
import { emitEvent } from "./utils.js";
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
    goto(page) {
        menu.close();
        setTimeout(() => {
            document.body.id = `body_${page}`;
            emitEvent("render", { page });
        }, 200);
    }
    hasPaquet() {
        var _a, _b;
        return ((_b = (_a = this.userdata.pids) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0;
    }
    addPaquet(name) {
        if (this.userdata.pids == undefined)
            this.userdata.pids = [];
        this.userdata.pids.push({
            nom: name,
            success: undefined,
            cids: []
        });
    }
}
export const state = new State();
//# sourceMappingURL=state.js.map