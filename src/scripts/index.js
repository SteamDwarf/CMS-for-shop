
import '../css/bootstrap.min.css';
import '../css/style.css';
import { modalController } from './controllers/modalController.js';
import { imageInput, preview } from './elems/elems.js';
import { previewController } from './controllers/previewController.js';
import { tableController } from './controllers/tableController.js';
import { formController } from './controllers/formController.js';
import { dataController } from './controllers/dataController.js';

const init = () => {
    modalController();
    previewController(imageInput);
    tableController();
    formController();
    dataController();
}

init();

