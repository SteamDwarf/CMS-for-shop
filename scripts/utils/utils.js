export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.addEventListener('loadend', () => resolve(fileReader.result));
        fileReader.addEventListener('error', () => reject(fileReader.error));

        fileReader.readAsDataURL(file);
    });
}