import { pagesContainer } from "../elems/elems.js";
import stateManager from "../managers/stateManager.js";
import { useEffect } from "../managers/utils.js";
import { changePage, renderPagesButtons } from "../view/paginationView.js";

const countPages = (products) => {
    const itemsPerPage = stateManager.itemsPerPage.getValue();

    return Math.ceil(products.length / itemsPerPage);
}

export const setPagination = (products) => {
    const {pages} = stateManager;
    const curPage = stateManager.curPage.getValue();
    const itemsPerPage = stateManager.itemsPerPage.getValue();
    const pagesCount = countPages(products);
    const firstIndex = (curPage - 1) * itemsPerPage;
    const lastIndex = curPage * itemsPerPage;

    if(pagesCount !== pages.getValue()) {
        pages.setValue(pagesCount);
    }

    return products.slice(firstIndex, lastIndex);
}

const resetPage = () => {
    const firstPageBtn = pagesContainer.querySelector('.page-btn');

    stateManager.curPage.setValue(1);

    if(firstPageBtn) changePage(firstPageBtn);
}

export const paginationController = () => {
    const {pages, filter} = stateManager;

    useEffect(renderPagesButtons, [pages])
    useEffect(resetPage, [filter]);
}