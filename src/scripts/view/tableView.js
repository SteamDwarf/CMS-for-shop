import { chooseProductItem, deleteProduct } from "../controllers/tableController.js";
import { creatingProductBtn, tableErrorContainer, tableGoodsContainer, tableSpinner } from "../elems/elems.js";
import { currencyFormatRUB } from "../utils/utils.js";
import stateManager from "../managers/stateManager.js";
import { useEffect } from "../managers/utils.js";
import { renderErrorMessage, requestLoadingStatus} from "./statusView.js";

export const renderGoodsRow = ({id, title, category, price}) => {
    const goodsRow = document.createElement('tr');

    goodsRow.classList.add('table-row', 'table-goods-item');
    goodsRow.dataset.id = id;
    goodsRow.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${category}</td>
        <td class="text-end">${currencyFormatRUB(price)}</td>
        <td class="d-flex align-items-center justify-content-center">
            <button class="btn-table btn-delete">
                <svg width="30" height="30">
                    <use xlink:href="#delete" />
                </svg>
            </button>
            <div class="product-spinner spinner-border spinner-border-sm text-primary mx-auto visually-hidden" role="status"></div>
        </td>
    `;

    tableGoodsContainer.append(goodsRow);
    goodsRow.addEventListener('click', chooseProductItem);
    goodsRow.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(goodsRow));
}

export const renderTableError = (error) => {
    renderErrorMessage(tableErrorContainer, error);
}

export const productFetchingStatus = (isLoading) => {
    requestLoadingStatus(tableSpinner, creatingProductBtn, isLoading);
}

export const productDeletingStatus = (productElement, isInProcess) => {
    const productSpinner = productElement.querySelector('.product-spinner');
    const deleteProductBtn = productElement.querySelector('.btn-delete');

    requestLoadingStatus(productSpinner, deleteProductBtn, isInProcess);
}


const renderTable = (goods) => {
    tableGoodsContainer.innerHTML = '';
    goods.forEach(product => renderGoodsRow(product));
}


export const initTable = () => {
    useEffect(renderTable, [stateManager.visibleGoods]);
}
