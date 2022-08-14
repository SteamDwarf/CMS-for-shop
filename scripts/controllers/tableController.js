import { deleteProductRequest, getGoods } from "../API/serviceAPI.js";
import { initTable, renderErrorMessage, sendingRequestTable } from "../view/tableView.js";
import stateManager from "../managers/stateManager.js";
import triggerManager from "../managers/triggerManager.js";

export const deleteProduct = (goodsRow) => {
    const goodsID = goodsRow.dataset.id;
    const {allGoods} = stateManager;

    deleteProductRequest(goodsID, () => allGoods.deleteItem(goodsID));
}

export const chooseProductItem = ({target}) => {
    const {editableProduct, visibleGoods} = stateManager;

    if(!target.closest('.btn-delete')) {
        editableProduct.setValue(visibleGoods.getValue().find(product => {
            return product.id === target.closest('.table-goods-item').dataset.id;
        }));
        triggerManager.openEditingProduct.trigger();
    }
}


export const tableController = () => {
    getGoods({loadingFunc: sendingRequestTable, errorFunc: renderErrorMessage});
    initTable();
};