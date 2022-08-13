import { chooseProductItem, deleteProduct } from "../controllers/tableController.js";
import { tableGoodsContainer } from "../elems/elems.js";
import { currencyFormatRUB } from "../utils/utils.js";
import stateManager from "../managers/stateManager.js";

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

export const changeProductElem = ({id, title, category, price}) => {
    const productElem = tableGoodsContainer.querySelector(`[data-id='${id}']`);
    
    productElem.innerHTML = `
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

    productElem.querySelector('.btn-delete').addEventListener('click', () => deleteProduct(productElem));
}

export const deleteProductElement = (productElem) => {
    productElem.remove();
}

const renderTable = (goods) => {
    tableGoodsContainer.innerHTML = '';
    goods.forEach(product => renderGoodsRow(product));
}


export const initTable = () => {
    stateManager.visibleGoods.subscribe(renderTable);
}
