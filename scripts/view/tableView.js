import { chooseProductItem, deleteProduct } from "../controllers/tableController.js";
import { tableErrorContainer, tableGoodsContainer } from "../elems/elems.js";
import { currencyFormatRUB } from "../utils/utils.js";
import stateManager from "../managers/stateManager.js";
import { useEffect } from "../managers/utils.js";

export const renderGoodsRow = ({id, title, category, price}) => {
    const goodsRow = document.createElement('tr');

    goodsRow.classList.add('table-row', 'table-goods-item');
    goodsRow.dataset.id = id;
    goodsRow.innerHTML = `
        <td>${id}</td>
            <td>${title}</td>
            <td>${category}</td>
            <td class="text-end">${currencyFormatRUB(price)}</td>
            <td class="d-flex">
            <button class="btn-table btn-delete">
                <svg width="30" height="30">
                    <use xlink:href="#delete" />
                </svg>
            </button>
        </td>
    `;

    tableGoodsContainer.append(goodsRow);
    goodsRow.addEventListener('click', chooseProductItem);
    goodsRow.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(goodsRow));
}

export const renderErrorMessage = (error) => {
    tableErrorContainer.innerHTML = `
        <div class="alert alert-danger w-100" role="alert">
            <b>${error.status}:</b> ${error.statusText}
        </div>
    `;
}

const renderTable = (goods) => {
    tableGoodsContainer.innerHTML = '';
    goods.forEach(product => renderGoodsRow(product));
}


export const initTable = () => {
    useEffect(renderTable, [stateManager.visibleGoods]);
}
