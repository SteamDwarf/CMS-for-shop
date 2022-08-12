import { deleteProductRequest, getGoods } from "../API/serviceAPI.js";
import stateManger from "../state-manager/state-manager.js";
import { initTable } from "../view/tableView.js";

export const deleteProduct = async (productID) => {
    await deleteProductRequest(productID)
    
    stateManger.goods.setValue(stateManger.goods.getValue().filter(product => {
        if(product.id !== productID) return product;
    }));
}

export const chooseProductItem = ({target}) => {
    const {editableProduct, goods} = stateManger;

    if(!target.closest('.btn-delete')) {
        editableProduct.setValue(goods.getValue().find(product => {
            return product.id === target.closest('.table-goods-item').dataset.id;
        }));
        triggerManager.openEditingProduct.trigger();
    }
}

export const tableController = async() => {
    initTable();
    stateManger.goods.setValue(await getGoods());
};