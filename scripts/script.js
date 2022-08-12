import { modalController } from './controllers/modalController.js';
import { imageInput, preview } from './elems/elems.js';
import { previewController } from './controllers/previewController.js';
import { tableController } from './controllers/tableController.js';
import { formController } from './controllers/formController.js';

const init = () => {
    modalController();
    previewController(imageInput, preview);
    tableController();
    formController();
}

init();

