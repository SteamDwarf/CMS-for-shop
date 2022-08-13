import { deleteProductRequest, getGoods } from "../API/serviceAPI.js";
import { changeProductElem, deleteProductElement, initTable } from "../view/tableView.js";
import stateManager from "../managers/stateManager.js";
import triggerManager from "../managers/triggerManager.js";

export const deleteProduct = async (goodsRow) => {
    const goodsID = goodsRow.dataset.id;
    const isDeleted = await deleteProductRequest(goodsID);
    const {allGoods, visibleGoods} = stateManager;

    if(isDeleted) {
        allGoods.deleteItem(goodsID);
        visibleGoods.deleteItem(goodsID);
        deleteProductElement(goodsRow);
    }
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

export const changeProduct = (product) => {
    stateManager.allGoods.changeItem(product);
    stateManager.visibleGoods.changeItem(product);
    changeProductElem(product);
}

export const tableController = async() => {
    const goods = await getGoods();

    initTable();

    stateManager.allGoods.setValue(goods);
};