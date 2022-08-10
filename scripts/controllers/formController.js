import { getCategories } from "../API/serviceAPI.js"
import { renderCategoryOptions } from "../view/formView.js";


export const formController = async () => {
    const categories = await getCategories();
    
    if(categories) renderCategoryOptions(categories);
}
