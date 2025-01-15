function initHamburger() {
    let hamburger = document.querySelector('.hamburger');
    let lines = hamburger?.querySelectorAll('span');
    let mobileNavbar = document.querySelector('.mobile-navbar');
    let expanded = "expanded";

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle(expanded);
        if (lines) {
            lines[0].classList.toggle(expanded);
            lines[2].classList.toggle(expanded);
        }
        mobileNavbar?.classList.toggle(expanded);
        document.body.classList.toggle('menu-open');
        document.documentElement.classList.toggle('menu-open');
    });

    document.addEventListener('astro:before-swap', () => {

    }, { once: true });
}

initHamburger();

document.addEventListener('astro:after-swap', initHamburger);