export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.addEventListener('loadend', () => resolve(fileReader.result));
        fileReader.addEventListener('error', () => reject(fileReader.error));

        fileReader.readAsDataURL(file);
    });
}

export const currencyFormatRUB = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    }).format(price);
}

export const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];