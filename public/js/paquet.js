export class Paquet {
    initialize() {
        document.addEventListener("render", (event) => {
            if (event.detail.page == "paquet")
                this.render();
        });
    }
    render() {
        console.log("render paquet");
    }
}
export const paquet = new Paquet();
//# sourceMappingURL=paquet.js.map