import { formInputs, formTextarea, preview } from "../elems/elems.js";
import { hidePreview } from "./previewController.js";

const openModal = (modal, modalOpenClass) => modal.classList.add(modalOpenClass);
const closeModal = (modal, modalOpenClass) => {
    formInputs.forEach(input => input.value = '');
    formTextarea.value = '';

    hidePreview(preview);

    modal.classList.remove(modalOpenClass);
};

export const modalController = ({modal, modalOpenBtn, modalCloseBtn, modalOpenClass}) => {
    modalOpenBtn.addEventListener('click', () => openModal(modal, modalOpenClass));
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target === modalCloseBtn) {
            closeModal(modal, modalOpenClass);
        }
    });
}