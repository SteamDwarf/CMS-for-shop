import { API_URI } from "../const.js";
import stateManager from "../managers/stateManager.js";

const fetchData = ({url, loadingFunc, successFunc, errorFunc}) => {
    if(loadingFunc) loadingFunc(true);

    fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error))
    .finally(() => loadingFunc ? loadingFunc(false) : null);
}

const postData = ({url, loadingFunc, postingData, successFunc, errorFunc}) => {
    if(loadingFunc) loadingFunc(true);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postingData)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error))
    .finally(() => loadingFunc ? loadingFunc(false) : null);
}

const deleteData = (url, itemID, successFunc, errorFunc) => {
    fetch(`${url}${itemID}`, {
        method: 'DELETE'
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error));
}

const editData = ({url, editedData, itemID, loadingFunc, successFunc, errorFunc}) => {
    if(loadingFunc) loadingFunc(true);

    fetch(`${url}${itemID}`, {
        method: 'PATCH',
        body: JSON.stringify(editedData)
    })
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => successFunc(data))
    .catch(error => errorFunc ? errorFunc(error) : console.error(error))
    .finally(() => loadingFunc ? loadingFunc(false) : null);
}

export const getGoods = ({loadingFunc, errorFunc}) => {
    return fetchData({url: `${API_URI}/goods?nopage=true`, loadingFunc, successFunc: stateManager.allGoods.setValue, errorFunc});
}

export const getCategories = ({loadingFunc, errorFunc}) => {
    return fetchData({url: `${API_URI}/category`, loadingFunc, successFunc: stateManager.categories.setValue, errorFunc});
}

export const postProduct = ({data, loadingFunc, successFunc, errorFunc}) => {
    return postData({url: `${API_URI}/goods`, postingData: data, loadingFunc: loadingFunc,  successFunc, errorFunc});
}

export const deleteProductRequest = (productID, successFunc, errorFunc) => {
    return deleteData(`${API_URI}/goods/`, productID, successFunc, errorFunc);
}

export const editProductRequest = ({editedData, productID, loadingFunc, successFunc, errorFunc}) => {
    return editData({url: `${API_URI}/goods/`, editedData, itemID: productID, loadingFunc, successFunc, errorFunc});
}

