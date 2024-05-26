import { state } from "./state.js";
import { tools } from "./tools.js"
import { menu } from "./menu.js"
import { myCroquis } from "./mycroquis.js"


await state.initialize("laura");

tools.initialize();
menu.initialize();
myCroquis.initialize();

