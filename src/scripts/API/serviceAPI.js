import { API_URI } from "../const.js";
import stateManager from "../managers/stateManager.js";

const fetchHandler = ({fetchRequest, loadingFunc, successFunc, errorFunc}) => {
    if(loadingFunc) loadingFunc(true);

    fetchRequest()
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error))
    .finally(() => loadingFunc ? loadingFunc(false) : null);
}

export const getGoods = ({loadingFunc, errorFunc}) => {
    fetchHandler({
        fetchRequest: () => fetch(`${API_URI}/goods?nopage=true`),
        successFunc: stateManager.allGoods.setValue,
        loadingFunc,
        errorFunc
    })
}

export const getCategories = ({loadingFunc, errorFunc}) => {
    fetchHandler({
        fetchRequest: () => fetch(`${API_URI}/category`),
        successFunc: stateManager.categories.setValue,
        loadingFunc,
        errorFunc
    })
}

export const postProduct = ({data, loadingFunc, successFunc, errorFunc}) => {
    fetchHandler({
        fetchRequest: () => fetch(`${API_URI}/goods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        }),
        loadingFunc,
        successFunc,
        errorFunc
    })
}

export const deleteProductRequest = ({productID, loadingFunc, successFunc, errorFunc}) => {
    fetchHandler({
        fetchRequest: () => fetch(`${API_URI}/goods/${productID}`, {
            method: 'DELETE'
        }),
        loadingFunc,
        successFunc,
        errorFunc
    })
}

export const editProductRequest = ({editedData, productID, loadingFunc, successFunc, errorFunc}) => {
    fetchHandler({
        fetchRequest: () => fetch(`${API_URI}/goods/${productID}`, {
            method: 'PATCH',
            body: JSON.stringify(editedData)
        }),
        loadingFunc,
        successFunc,
        errorFunc
    })
}

