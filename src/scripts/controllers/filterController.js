import { filterInput } from "../elems/elems.js";
import stateManager from "../managers/stateManager.js";

const changeFilter = ({target}) => {
    stateManager.filter.setValue(target.value);
}

export const filteringProducts = (dataList) => {
    const filter = stateManager.filter.getValue();

    const filteredList = dataList.filter(data => {
        const filteringFields = [data.id, data.title, data.category, data.price.toString()];
        
        return filteringFields.some(field => field.toLowerCase().includes(filter.toLowerCase()));
    });

    return filteredList;
}

export const filterController = () => {
    filterInput.addEventListener('input', changeFilter);
}