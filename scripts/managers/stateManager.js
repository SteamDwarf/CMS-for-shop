import { createListState } from "./listState.js";
import { createState } from "./state.js";

const stateManager = {
    allGoods: createListState(),
    visibleGoods: createListState(),
    categories: createState([]),
    editableProduct: createState(null),
    sortField: createState('id'),
    sortDirection: createState('up'),
    itemsPerPage: createState(15),
    pages: createState(0),
    curPage: createState(1),
    filter: createState('')
}

export default stateManager;