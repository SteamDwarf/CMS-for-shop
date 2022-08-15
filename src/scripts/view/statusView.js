export const renderErrorMessage = (errorContainer, error) => {
    if(error.status && error.statusText) {
        errorContainer.innerHTML = `
            <div class="alert alert-danger w-100" role="alert">
                <b>${error.status}: ${error.statusText}</b> 
            </div>
        `;

        return;
    }

    errorContainer.innerHTML = `
        <div class="alert alert-danger w-100" role="alert">
            <b>${error}</b>
        </div>
    `;
}

export const requestLoadingStatus = (spinnerBlock, disablingBtn, isLoading) => {
    if(isLoading) {
        spinnerBlock.classList.remove('visually-hidden');
        disablingBtn.disabled = true;
        return;
    };

    spinnerBlock.classList.add('visually-hidden');
    disablingBtn.disabled = false;
}