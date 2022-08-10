import { categoryDataList } from "../elems/elems.js";

const createCategoryOption = (category) => {
    const categoryOption = document.createElement('option');

    categoryOption.value = category;

    return categoryOption;
}

export const renderCategoryOptions = (categories) => {
    const categoriesOptions =  categories.map(category => createCategoryOption(category));

    categoryDataList.append(...categoriesOptions);
}