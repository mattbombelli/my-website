function initFooter(){
    let e = document.querySelector('.e');
    
    e?.addEventListener("click", () => {
        e.setAttribute("href", "mailto:hello@mattiabombelli.com");
    }); document.addEventListener('astro:before-swap', () => {
    
        }, { once: true });
    }
    
initFooter();

document.addEventListener('astro:after-swap', initFooter);