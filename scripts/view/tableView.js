import { tableGoodsContainer } from "../elems/elems.js";
import { currencyFormatRUB } from "../utils/utils.js";

const createGoodsRow = ({id, title, category, price}) => {
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

    return goodsRow;
}

export const renderTable = (goods) => {
    const rows = goods.map(product => createGoodsRow(product));

    tableGoodsContainer.append(...rows);
}