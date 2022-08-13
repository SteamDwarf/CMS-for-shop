export const createListState = () => {
    let value = [];
    let subscribers = [];

    const subscribe = (callback) => {
        subscribers.push(callback);
    }

    const notify = () => {
        subscribers.forEach(callback => callback(value));
    }

    const setValue = (newValue) => {
        value = newValue;
        notify();
    }

    const addNewItem = (newItem) => {
        setValue([...value, newItem]);
    }

    const changeItem = (item) => {
        value.forEach(listItem => {
            if(listItem.id === item.id) {
                value[value.indexOf(listItem)] = item;
            }
        });
    }

    const deleteItem = (itemID) => {
        const deletableItem = value.find(item => item.id === itemID);
        const deletableItemIndex = value.indexOf(deletableItem);

        value.splice(deletableItemIndex, 1);
    }

    const getValue = () => value;

    return {
        subscribe,
        setValue,
        addNewItem,
        changeItem,
        deleteItem,
        getValue
    }
}