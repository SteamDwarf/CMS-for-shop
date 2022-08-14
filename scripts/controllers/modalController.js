import { modal, modalCloseBtn, creatingProductBtn } from "../elems/elems.js";
import triggerManager from "../managers/triggerManager.js";
import { useEffect } from "../managers/utils.js";

const openModal = () => modal.classList.add('d-block');

export const closeModal = () => {
    modal.classList.remove('d-block');
};

export const modalController = () => {
    const {openCreatingProduct, openEditingProduct, closingModal} = triggerManager;

    useEffect(openModal, [openCreatingProduct, openEditingProduct]);
    useEffect(closeModal, [closingModal]);

    creatingProductBtn.addEventListener('click', openCreatingProduct.trigger);
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target === modalCloseBtn) {
            closingModal.trigger();
        }
    });
}
