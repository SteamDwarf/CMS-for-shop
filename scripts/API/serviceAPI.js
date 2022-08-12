import { API_URI } from "../const.js";

const fetchData = (url) => {
    const data = fetch(url)
                    .then(response => response.ok ? response.json() : Promise.reject())
                    .catch(error => console.error(error));
    return data;
}

const postData = async (url, postingData) => {    
    const data = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postingData)
    })
    .then(response => response.ok ? response.json() : Promise.reject())
    .catch(error => console.error(error));

    return data;
}

const deleteData = async (url, itemID) => {
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => response.ok ? response.json() : Promise.reject())
    .catch(error => error);
}

export const getGoods = () => {
    return fetchData(`${API_URI}/goods?nopage=true`);
}

export const getCategories = () => {
    return fetchData(`${API_URI}/category`);
}

export const postProduct = (data) => {
    return postData(`${API_URI}/goods`, data);
}

export const deleteProductRequest = (productID) => {
    return deleteData(`${API_URI}/goods/${productID}`);
}

