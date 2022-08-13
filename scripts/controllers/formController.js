import { editProductRequest, getCategories, postProduct } from "../API/serviceAPI.js"
import { modalForm } from "../elems/elems.js";
import { toBase64 } from "../utils/utils.js";
import { initForm } from "../view/formView.js";
import stateManager from "../managers/stateManager.js";
import triggerManager from "../managers/triggerManager.js";
import { changeProduct } from "./tableController.js";

const addNewCategory = (category) => {
    const categories = stateManager.categories.getValue();

    if(categories.some(storedCategory => storedCategory === category)) {
        return categories;
    }
    
    return [...categories, category];
}

//TODO красиво оформить код создания нового товара и его редактирования

const addNewProduct = async (e) => {
    e.preventDefault();

    const formData = [...new FormData(modalForm)];
    const postingData = {};
    const {allGoods, categories, editableProduct} = stateManager;
    const {closingModal} = triggerManager;
    let product = {}

    formData.forEach(async ([key, value]) => {
        if(key) postingData[key] = value;
    });

    if(postingData.image.size) {
        postingData.image = await toBase64(postingData.image);
    } else {
        delete postingData.image;
    }

    if(editableProduct.getValue()) {
        product = await editProductRequest(postingData, postingData.id);
        changeProduct(product);
        editableProduct.setValue(null);

    } else {
        if(!postingData.image) {
            alert('Добавьте изображение');
            return;
        }
        product = await postProduct(postingData);
        allGoods.addNewItem(product);
    }
    
    categories.setValue(addNewCategory(product.category));
    closingModal.trigger();

    return;
}

const clearForm = () => {
    modalForm.reset();
    stateManager.editableProduct.setValue(null);
}

export const formController = async () => {
    initForm();
    stateManager.categories.setValue(await getCategories());
    triggerManager.closingModal.subscribe(clearForm);

    modalForm.addEventListener('submit', addNewProduct);
}
