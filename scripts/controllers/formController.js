import { getCategories, postProduct } from "../API/serviceAPI.js"
import { modalForm } from "../elems/elems.js";
import stateManger from "../state-manager/state-manager.js";
import triggerManager from "../state-manager/triggerManager.js";
import { toBase64 } from "../utils/utils.js";
import { initForm } from "../view/formView.js";

const addNewCategory = (category) => {
    const categories = stateManger.categories.getValue();

    if(categories.some(storedCategory => storedCategory === category)) {
        return categories;
    }
    
    return [...categories, category];
}

const addNewProduct = async (e) => {
    e.preventDefault();

    const formData = [...new FormData(modalForm)];
    const postingData = {};
    let newProduct = {}

    formData.forEach(async ([key, value]) => {
        if(key) postingData[key] = value;
    });
    
    if(postingData.image.size) {
        postingData.image = await toBase64(postingData.image);
        newProduct = await postProduct(postingData);

        stateManger.goods.setValue([...stateManger.goods.getValue(), newProduct]);
        stateManger.categories.setValue(addNewCategory(newProduct.category));
        triggerManager.closingModal.trigger();

        return;
    }

    alert('Добавьте изображение товара!');

    return;
}

const clearForm = () => {
    modalForm.reset();
}

export const formController = async () => {
    initForm();
    stateManger.categories.setValue(await getCategories());
    triggerManager.closingModal.subscribe(clearForm);

    modalForm.addEventListener('submit', addNewProduct);
}
