export const createState = (initValue) => {
    let value = initValue;
    let subscribers = [];

    const subscribe = (callback) => {
        subscribers.push(callback);
    }

    const notify = () => {
        subscribers.forEach(callback => callback(value));
    }

    const setValue = (newValue) => {
        if(value !== newValue) {
            value = newValue;
            notify();
        }
    }

    const getValue = () => value;

    return {
        subscribe,
        setValue,
        getValue
    }
}