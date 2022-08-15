export const createTrigger = () => {
    let subscribers = [];

    const subscribe = (callback) => {
        subscribers.push(callback);
    }

    const notify = () => {
        subscribers.forEach(callback => callback());
    }

    const trigger = () => {
        notify();
    }

    return {
        subscribe,
        trigger,
    }
}