import { isKeyboardUser } from './inputModality';

export function focusWithoutRing(el: HTMLElement) {
    if (!isKeyboardUser) {
        el.classList.add('no-focus-ring');

        const clear = () => {
            el.classList.remove('no-focus-ring');
            el.removeEventListener('blur', clear);
        };

        el.addEventListener('blur', clear);
    }

    el.focus();
}