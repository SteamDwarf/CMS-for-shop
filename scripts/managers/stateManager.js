import { createListState } from "./listState.js";
import { createState } from "./state.js";

const stateManager = {
    allGoods: createListState(),
    visibleGoods: createListState(),
    categories: createState([]),
    editableProduct: createState(null),
    sortField: createState('id'),
    sortDirection: createState('up')
}

export default stateManager;