import { modal, modalCloseBtn, creatingProductBtn } from "../elems/elems.js";
import triggerManager from "../managers/triggerManager.js";

const openModal = () => modal.classList.add('d-block');

export const closeModal = () => {
    modal.classList.remove('d-block');
};

export const modalController = () => {
    const {openCreatingProduct, openEditingProduct, closingModal} = triggerManager;

    openCreatingProduct.subscribe(openModal);
    openEditingProduct.subscribe(openModal);
    closingModal.subscribe(closeModal);

    creatingProductBtn.addEventListener('click', openCreatingProduct.trigger);
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target === modalCloseBtn) {
            closingModal.trigger();
        }
    });
}
