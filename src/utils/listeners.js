function onTitledInputsListener() {
    const FILLED_CLASS = 'field__input--filled';
    const inputsEl = document.querySelectorAll('.field__input');

    inputsEl.forEach((inputEl) => {
        inputEl.addEventListener('input', () => {
            if (inputEl.value !== '') {
                inputEl.classList.add(FILLED_CLASS);
            } else if (inputEl.value === '') {
                inputEl.classList.remove(FILLED_CLASS);
            }
        });
    });
}

function onFileInputsListener() {
    const fieldsEl = document.querySelectorAll('.field--file');

    fieldsEl.forEach((fieldEl) => {
        const inputEl = fieldEl.querySelector('.field__input');
        const fieldTitle = fieldEl.querySelector('.field__title');
        const initText = fieldTitle.textContent;

        inputEl.addEventListener('change', () => {
            if (inputEl.files.length > 0) {
                fieldTitle.textContent = inputEl.files[0].name;
            } else if (inputEl.files.length === 0) {
                fieldTitle.textContent = initText;
            }
        });
    });
}

function onPopupOpenListener() {
    const openPopup = document.querySelector('.open-popup');
    const popup = document.querySelector('.popup');
    const closePopup = document.querySelector('.popup__close');
    const overlayPopup = document.querySelector('.popup__overlay');
    const togglePopupVisibility = () => popup.classList.toggle('hidden');

    openPopup.addEventListener('click', togglePopupVisibility);
    closePopup.addEventListener('click', togglePopupVisibility);
    overlayPopup.addEventListener('click', togglePopupVisibility);
}

function onSmPopupOpenListener() {
    const openSmPopup = document.querySelectorAll('.open-sm-popup');

    openSmPopup.forEach((btn) => {
        btn.addEventListener('click', () =>
            btn.nextElementSibling.classList.toggle('hidden')
        );
    });
}

export {
    onTitledInputsListener,
    onFileInputsListener,
    onPopupOpenListener,
    onSmPopupOpenListener,
};
