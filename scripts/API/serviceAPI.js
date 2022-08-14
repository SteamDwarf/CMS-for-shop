import { API_URI } from "../const.js";
import stateManager from "../managers/stateManager.js";

const fetchData = (url, successFunc, errorFunc) => {
    fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error));
}

const postData = (url, postingData, successFunc, errorFunc) => {    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postingData)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error));
}

const deleteData = (url, itemID, successFunc, errorFunc) => {
    fetch(`${url}${itemID}`, {
        method: 'DELETE'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error));
}

const editData = (url, editedData, itemID, successFunc, errorFunc) => {
    fetch(`${url}${itemID}`, {
        method: 'PATCH',
        body: JSON.stringify(editedData)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error))
}

export const getGoods = (errorFunc) => {
    return fetchData(`${API_URI}/goods?nopage=true`, stateManager.allGoods.setValue, errorFunc);
}

export const getCategories = (errorFunc) => {
    return fetchData(`${API_URI}/category`, stateManager.categories.setValue, errorFunc);
}

export const postProduct = (data, successFunc, errorFunc) => {
    return postData(`${API_URI}/goods`, data, successFunc, errorFunc);
}

export const deleteProductRequest = (productID, successFunc, errorFunc) => {
    return deleteData(`${API_URI}/goods/`, productID, successFunc, errorFunc);
}

export const editProductRequest = (editedData, productID, successFunc, errorFunc) => {
    return editData(`${API_URI}/goods/`, editedData, productID, successFunc, errorFunc);
}

