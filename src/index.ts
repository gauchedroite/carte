import { initialize as State_initialize, goto } from "./state.js";
import { initialize as Paquets_initialize } from "./paquets.js";
import { initialize as Paquet_initialize } from "./paquet.js";
import { initialize as Carte_initialize } from "./carte.js";
import { tools } from "./tools.js"
import { menu } from "./menu.js"
import { myCroquis } from "./mycroquis.js"



await State_initialize("laura");

tools.initialize();
menu.initialize();
myCroquis.initialize();

Paquets_initialize();
Paquet_initialize();
Carte_initialize();

goto("paquets");
