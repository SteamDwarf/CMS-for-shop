import { createTrigger } from "./trigger.js";

const triggerManager = {
    closingModal: createTrigger(),
    openCreatingProduct: createTrigger(),
    openEditingProduct: createTrigger()
}

window.triggerManager = triggerManager;

export default triggerManager;