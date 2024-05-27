import { state } from "./state.js";
import { tools } from "./tools.js";
import { menu } from "./menu.js";
import { myCroquis } from "./mycroquis.js";
import { paquets } from "./paquets.js";
import { paquet } from "./paquet.js";
await state.initialize("laura");
tools.initialize();
menu.initialize();
myCroquis.initialize();
paquets.initialize();
paquet.initialize();
state.goto("paquets");
//# sourceMappingURL=index.js.map