import { categoryDataList, formBtn, formTitle, modalForm, preview } from "../elems/elems.js";
import stateManger from "../state-manager/state-manager.js";
import triggerManager from "../state-manager/triggerManager.js";
import { showPreview } from "../controllers/previewController.js";
import { SERVER_URI } from "../const.js";


const initCreatingForm = () => {
    formTitle.textContent = 'Добавить новый товар';
    formBtn.textContent = 'Добавить товар';
}

const initEditingForm = () => {
    const editableProduct = stateManger.editableProduct.getValue();

    formTitle.textContent = 'Изменить товар';
    formBtn.textContent = 'Изменить товар';
    
    modalForm.title.value = editableProduct.title;
    modalForm.category.value = editableProduct.category;
    modalForm.description.value = editableProduct.description;
    modalForm.display.value = editableProduct.display;
    modalForm.price.value = editableProduct.price;
    modalForm.imagesave.value = editableProduct.image;

    showPreview(`${SERVER_URI}${editableProduct.image}`)
/*     preview.classList.add('d-block');
    preview.src = `${SERVER_URI}${editableProduct.image}`; */
}

export const renderCategory = (category) => {
    const categoryOption = document.createElement('option');

    categoryOption.value = category;
    categoryDataList.append(categoryOption);

}

const renderCategoryOptions = (categories) => {
    categoryDataList.innerHTML = '';

    categories.forEach(category => renderCategory(category));
}

export const initForm = () => {
    const {categories} = stateManger;
    const {openCreatingProduct, openEditingProduct} = triggerManager;

    openCreatingProduct.subscribe(initCreatingForm);
    openEditingProduct.subscribe(initEditingForm);
    categories.subscribe(renderCategoryOptions);
}