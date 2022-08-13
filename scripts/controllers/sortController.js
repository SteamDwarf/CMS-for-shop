import { wrapperSort } from "../elems/elems.js";
import stateManager from "../managers/stateManager.js";

const toggleSortDirection = () => {
    const {sortDirection} = stateManager;

    if(sortDirection.getValue() === 'up') {
        sortDirection.setValue('down');
        return;
    }

    if(sortDirection.getValue() === 'down') {
        sortDirection.setValue('up')
        return;
    }
}

const changeSortSettings = ({target}) => {
    const {sortField, sortDirection} = stateManager;
    const chosenSortField = target.dataset.sort;

    if(!chosenSortField) return;

    if(sortField.getValue() === chosenSortField) {
        toggleSortDirection();
        return;
    }
    
    if(sortDirection.getValue() !== 'up') sortDirection.setValue('up');

    sortField.setValue(chosenSortField);
}

const sortingNumbers = (list, field) =>{ 
    return list.sort((a, b) => a[field] - b[field]);
}

const sortingStrings = (list, field) => {
    return list.sort((a, b) => a[field].localeCompare(b[field]));
}

const sortingData = () => {
    const {allGoods, visibleGoods} = stateManager;
    const sortedField = stateManager.sortField.getValue();
    const sortedDirection = stateManager.sortDirection.getValue();
    let sortedList = []

    if(sortedField === 'id' || sortedField === 'price') {
        sortedList = sortingNumbers(allGoods.getValue(), sortedField);
    }

    if(sortedField === 'title' || sortedField === 'category') {
        sortedList = sortingStrings(allGoods.getValue(), sortedField);
    }

    if(sortedDirection === 'down') sortedList.reverse();

    visibleGoods.setValue(sortedList);
}

export const sortController = () => {
    wrapperSort.addEventListener('click', changeSortSettings);
    stateManager.allGoods.subscribe(sortingData);
    stateManager.sortDirection.subscribe(sortingData);
    stateManager.sortField.subscribe(sortingData);
}