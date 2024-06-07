import * as App from "./core/app.js";
import * as router from "./core/router.js";
//
import * as GameMain from "./game/main.js";
import * as bonjour from "./game/bonjour.js";
//
import { tools } from "./game/tools.js";
export const NS = "GINDEX";
// Global reference to the app. Used for some event handlers.
window[App.NS] = App;
// This makes the :active CSS pseudo selector work to style taps on elements.
document.addEventListener("touchstart", () => { });
// Initialize objects that need to be initialized
tools.initialize();
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
//# sourceMappingURL=index.js.map