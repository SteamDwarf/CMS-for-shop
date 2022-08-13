import { toBase64 } from "../utils/utils.js";
import { preview } from "../elems/elems.js";
import triggerManager from "../managers/triggerManager.js";

export const showPreview = (file) => {
    preview.classList.add('d-block');

    if(file.type) {
        toBase64(file)
        .then(image => preview.src = image)
        .catch(error => console.error(error));

        return;
    }
    
    preview.src = file;
}

const hidePreview = () => {
    preview.removeAttribute('src');
    preview.classList.remove('d-block');
}

export const previewController = (imageInput) => {
    triggerManager.closingModal.subscribe(() => hidePreview(preview));

    imageInput.addEventListener('change', () => {
        if(imageInput.files[0]) {
            showPreview(imageInput.files[0], preview);
        }
    });
}