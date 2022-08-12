import { createState } from "./state.js";

const stateManger = {
    goods: createState([]),
    categories: createState([]),
    editableProduct: createState(null)
}

window.stateManger = stateManger;

export default stateManger;