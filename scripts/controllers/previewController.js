import { toBase64 } from "../utils/utils.js";

const showPreview = (file, preview) => {
    preview.classList.add('d-block');

    toBase64(file)
    .then(image => preview.src = image)
    .catch(error => console.error(error));
}

export const hidePreview = (preview) => {
    preview.removeAttribute('src');
    preview.classList.remove('d-block');
}

export const previewController = (imageInput, preview) => {
    imageInput.addEventListener('change', () => {
        if(imageInput.files[0]) {
            showPreview(imageInput.files[0], preview);
        }
    });
}