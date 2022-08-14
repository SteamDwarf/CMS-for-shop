import { categoryDataList, formBtn, formSpinner, formTitle, modalForm, preview } from "../elems/elems.js";
import stateManager from "../managers/stateManager.js";
import triggerManager from "../managers/triggerManager.js";
import { showPreview } from "../controllers/previewController.js";
import { SERVER_URI } from "../const.js";
import { formErrorContainer } from "../elems/elems.js";


const initCreatingForm = () => {
    formTitle.textContent = 'Добавить новый товар';
    formBtn.textContent = 'Добавить товар';
}

const initEditingForm = () => {
    const editableProduct = stateManager.editableProduct.getValue();

    formTitle.textContent = 'Изменить товар';
    formBtn.textContent = 'Изменить товар';
    
    modalForm.id.value = editableProduct.id;
    modalForm.title.value = editableProduct.title;
    modalForm.category.value = editableProduct.category;
    modalForm.description.value = editableProduct.description;
    modalForm.display.value = editableProduct.display;
    modalForm.price.value = editableProduct.price;
    modalForm.imagesave.value = editableProduct.image;

    showPreview(`${SERVER_URI}${editableProduct.image}`);
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

export const renderFormError = (error) => {
    formErrorContainer.innerHTML = `
        <div class="alert alert-danger w-100 text-center" role="alert">
            <b>${error.status}:</b> ${error.statusText}
        </div>
    `;
}

export const sendingRequest = (isShow) => {
    if(isShow) {
        formSpinner.classList.remove('visually-hidden');
        formBtn.disabled = true;
        return;
    };

    formBtn.disabled = false;
    formSpinner.classList.add('visually-hidden');
}

export const initForm = () => {
    const {categories} = stateManager;
    const {openCreatingProduct, openEditingProduct} = triggerManager;

    openCreatingProduct.subscribe(initCreatingForm);
    openEditingProduct.subscribe(initEditingForm);
    categories.subscribe(renderCategoryOptions);
}