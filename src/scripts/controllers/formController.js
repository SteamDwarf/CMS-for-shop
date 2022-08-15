import { editProductRequest, getCategories, postProduct } from "../API/serviceAPI.js"
import { formErrorContainer, modalForm } from "../elems/elems.js";
import { toBase64 } from "../utils/utils.js";
import { initForm, productChangingStatus, renderFormError } from "../view/formView.js";
import stateManager from "../managers/stateManager.js";
import triggerManager from "../managers/triggerManager.js";
import { useEffect } from "../managers/utils.js";

const addNewCategory = (category) => {
    const categories = stateManager.categories.getValue();

    if(categories.some(storedCategory => storedCategory === category)) {
        return categories;
    }
    
    return [...categories, category];
}


const succesFormSubmit = (product) => {
    const {categories} = stateManager;
    const {closingModal} = triggerManager;

    categories.setValue(addNewCategory(product.category));
    closingModal.trigger();
}

const successPatchProduct = (product) => {
    const {allGoods, editableProduct} = stateManager;
    
    allGoods.changeItem(product);
    editableProduct.setValue(null);

    succesFormSubmit(product)
}

const successPostProduct = (product) => {
    const {allGoods} = stateManager;

    allGoods.addNewItem(product);
    succesFormSubmit(product)
}

const addNewProduct = async (e) => {
    e.preventDefault();

    const formData = [...new FormData(modalForm)];
    const postingData = {};
    const {editableProduct} = stateManager;

    formData.forEach(async ([key, value]) => {
        if(key) postingData[key] = value;
    });

    if(postingData.image.size) {
        postingData.image = await toBase64(postingData.image);
    } else {
        delete postingData.image;
    }

    if(editableProduct.getValue()) {
        editProductRequest({
            editedData: postingData,
            productID: postingData.id,
            loadingFunc: productChangingStatus,
            successFunc: successPatchProduct,
            errorFunc: renderFormError
        })

    } else {
        if(!postingData.image) {
            alert('Добавьте изображение');
            return;
        }

        postProduct({
            data: postingData, 
            loadingFunc: productChangingStatus,
            successFunc: successPostProduct, 
            errorFunc: renderFormError
        });
    }

}

const clearForm = () => {
    modalForm.reset();
    formErrorContainer.innerHTML = '';
    stateManager.editableProduct.setValue(null);
}

export const formController = () => {
    getCategories({});
    initForm();

    useEffect(clearForm, [triggerManager.closingModal])

    modalForm.addEventListener('submit', addNewProduct);
}
