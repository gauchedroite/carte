import * as App from "./core/app.js";
import * as router from "./core/router.js";
//
import * as GameMain from "./game/main.js";
import * as bonjour from "./game/bonjour.js";
//
import { menu } from "./menu.js";
export const NS = "GINDEX";
// Global reference to the app. Used for some event handlers.
window[App.NS] = App;
// This makes the :active CSS pseudo selector work to style taps on elements.
document.addEventListener("touchstart", () => { });
// Initialize the menu
menu.initialize();
// Initialize the app
App.initialize(() => {
    return `
        ${GameMain.render()}
    `;
}, () => {
    GameMain.postRender();
}, "Carte");
// Configure routes
GameMain.startup();
// Add a catchall route to bonjour
router.addRoute("^#/?(.*)$", params => bonjour.fetch(params));
/*
tools.initialize();
myCroquis.initialize();

Paquets_initialize();
Paquet_initialize();
Carte_initialize();

goto("paquets");
*/
//# sourceMappingURL=index.js.map