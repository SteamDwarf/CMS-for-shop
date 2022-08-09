import { modalController } from './controllers/modalController.js';
import { modal, modalOpenBtn, modalCloseBtn, imageInput, preview } from './elems/elems.js';
import { previewController } from './controllers/previewController.js';

modalController({
    modal,
    modalOpenBtn,
    modalCloseBtn,
    modalOpenClass: 'd-block'
});


previewController(imageInput, preview);