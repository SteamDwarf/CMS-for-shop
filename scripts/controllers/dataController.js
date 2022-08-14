import { sortController, sortingData } from "./sortController.js";
import { paginationController, setPagination } from "./paginationController.js";
import { filterController, filteringProducts } from "./filterController.js";
import stateManager from "../managers/stateManager.js";
import { compose } from "../utils/utils.js";
import { useEffect } from "../managers/utils.js";


const transformList = () => {
    const allGoods = stateManager.allGoods.getValue();
    const {visibleGoods} = stateManager;
    const transformFunc = compose(setPagination, sortingData, filteringProducts);
    const dataResult = transformFunc(allGoods);

    visibleGoods.setValue(dataResult);
}

export const dataController = () => {
    const {allGoods, filter, sortField, sortDirection, curPage} = stateManager;

    sortController();
    paginationController();
    filterController();

    useEffect(transformList, [allGoods, filter, sortField, sortDirection, curPage]);
}