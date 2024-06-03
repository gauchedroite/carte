import * as App from "./core/app.js";
import * as router from "./core/router.js";
//
import * as GameMain from "./game/main.js";
export const NS = "GINDEX";
import { initialize as State_initialize } from "./state.js";
import { menu } from "./menu.js";
// Global reference to the app. Used for some event handlers.
window[App.NS] = App;
// This makes the :active CSS pseudo selector work to style taps on elements.
document.addEventListener("touchstart", () => { });
// Initialize the menu
menu.initialize();
// Set user context
State_initialize("laura");
const fetch = (args) => {
    router.goto("#/paquets");
};
export const render = () => {
    if (!App.inContext(NS))
        return "";
    return `
    <canvas id="index_canvas" class="full-viewport"></canvas>
    <div id="game_index_menu">
        <div><a href="#/menu/billy" style="color:whitesmoke;">Billy</a></div>
        <div><a href="#/menu/dev" style="color:whitesmoke;">Dev Game</a></div>
    </div>`;
};
export const postRender = () => {
    if (!App.inContext(NS))
        return;
};
// Initialize the app
App.initialize(() => {
    return `
        ${GameMain.render()}
        ${render()}
    `;
}, () => {
    GameMain.postRender();
    postRender();
}, "Carte");
// Configure routes
GameMain.startup();
// Add a catchall route (in index.ts itself)
router.addRoute("^#/?(.*)$", params => fetch(params));
/*
tools.initialize();
myCroquis.initialize();

Paquets_initialize();
Paquet_initialize();
Carte_initialize();

goto("paquets");
*/
//# sourceMappingURL=index.js.map