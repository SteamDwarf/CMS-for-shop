import { pagesContainer } from "../elems/elems.js";
import stateManager from "../managers/stateManager.js"

export const changePage = ({target}) => {
    stateManager.curPage.setValue(target.textContent);

    pagesContainer.querySelectorAll('.page-item').forEach(pageElement => {
        pageElement.classList.remove('active');
    })
    target.classList.add('active');
}

const createpageBtn = (index) => {
    const paginationItem = document.createElement('li');
    const classes = index === 0 ? ['btn', 'page-item', 'page-link', 'active'] : ['btn', 'page-item', 'page-link'];

    paginationItem.textContent = index + 1;
    paginationItem.classList.add(...classes);
    paginationItem.addEventListener('click', changePage);

    return paginationItem;
}

export const renderPagesButtons = () => {
    const pages = stateManager.pages.getValue();

    pagesContainer.innerHTML = '';

    if(pages > 1) {
        new Array(pages).fill(0).forEach((item, index) => {
            pagesContainer.append(createpageBtn(index));
        });

    }
}