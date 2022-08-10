import { API_URI } from "../const.js";

const fetchData = (url) => {
    const data = fetch(url)
                    .then(response => response.ok ? response.json() : Promise.reject())
                    .then(data => data)
                    .catch(error => console.error(error));
    return data;
}

export const getGoods = () => {
    return fetchData(`${API_URI}/goods?nopage=true`);
}

export const getCategories = () => {
    return fetchData(`${API_URI}/category`);
}

