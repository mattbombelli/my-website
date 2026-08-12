export let isKeyboardUser = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        isKeyboardUser = true;
    }
});

document.addEventListener('pointerdown', () => {
    isKeyboardUser = false;
});