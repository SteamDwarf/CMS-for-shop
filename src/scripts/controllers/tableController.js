import { deleteProductRequest, getGoods } from "../API/serviceAPI.js";
import { initTable, productDeletingStatus, productFetchingStatus, renderTableError } from "../view/tableView.js";
import stateManager from "../managers/stateManager.js";
import triggerManager from "../managers/triggerManager.js";

export const deleteProduct = (productRow) => {
    const productID = productRow.dataset.id;
    const {allGoods} = stateManager;

    deleteProductRequest({
        productID, 
        loadingFunc: (isInProcess) => productDeletingStatus(productRow, isInProcess),
        successFunc: () => allGoods.deleteItem(productID)
    });
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
    getGoods({loadingFunc: productFetchingStatus, errorFunc: renderTableError});
    initTable();
};