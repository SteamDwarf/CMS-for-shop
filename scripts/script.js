import { modalController } from './controllers/modalController.js';
import { modal, modalOpenBtn, modalCloseBtn, imageInput, preview } from './elems/elems.js';
import { previewController } from './controllers/previewController.js';
import { tableController } from './controllers/tableController.js';
import { formController } from './controllers/formController.js';

const init = () => {
    modalController({
        modal,
        modalOpenBtn,
        modalCloseBtn,
        modalOpenClass: 'd-block'
    });
    
    
    previewController(imageInput, preview);
    tableController();
    formController();
}

init();

