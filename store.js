import { creatStore } from "./core.js";
import reducer from "./reducer.js";
import withLogger from "./logger.js"

const { attach, connect, dispatch} = creatStore(withLogger(reducer));

window.dispatch = dispatch;

export {
    attach,
    connect
}