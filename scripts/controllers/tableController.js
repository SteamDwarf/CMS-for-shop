import { getGoods } from "../API/serviceAPI.js";
import { renderTable } from "../view/tableView.js";

export const tableController = async() => {
    const goods = await getGoods();
    renderTable(goods);
};