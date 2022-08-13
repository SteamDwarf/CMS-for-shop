import { createTrigger } from "./trigger.js";

const triggerManager = {
    closingModal: createTrigger(),
    openCreatingProduct: createTrigger(),
    openEditingProduct: createTrigger()
}

export default triggerManager;