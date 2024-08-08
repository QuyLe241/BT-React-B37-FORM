export const getValueLocalStorage = (key) => {
    let dataLocal = localStorage.getItem(key);
    return dataLocal ? JSON.parse(dataLocal) : null;

};

export const setValueLocalStorage = (key, value) => {
    let stringData = JSON.stringify(value);
    localStorage.setItem(key, stringData);
};