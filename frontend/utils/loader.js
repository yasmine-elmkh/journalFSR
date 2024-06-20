export function showLoader() {
    const loaderContainer = document.createElement('div');
    loaderContainer.className = 'loader-container';
    loaderContainer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
    `;

    const spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.style.cssText = `
        width: 5rem;
        height: 5rem;
    `;
    spinner.setAttribute('role', 'status');

    const srOnly = document.createElement('span');
    srOnly.className = 'sr-only';

    spinner.appendChild(srOnly);
    loaderContainer.appendChild(spinner);

    document.body.appendChild(loaderContainer);
}

export function hideLoader() {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.remove();
    }
}
