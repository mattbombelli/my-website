function initFadeout(){

    function setScrollClasses(el){
        const isScrollable = el.scrollHeight > el.clientHeight;
    
        if (!isScrollable){
            el.classList.remove('overflowing-bottom', 'overflowing-top');
            return;
        }
    
        const isScrolledToBottom = el.scrollHeight < el.clientHeight + el.scrollTop + 1;
        const isScrolledToTop = isScrolledToBottom ? false : el.scrollTop === 0;
        el.classList.toggle('overflowing-bottom', !isScrolledToBottom);
        el.classList.toggle('overflowing-top', !isScrolledToTop)
    }

    let menus = document.querySelectorAll('.scroll-menu');
    if (menus) {
        for (let menu of menus){
            menu.addEventListener('scroll', (e) => {
                const el = e.currentTarget;
                setScrollClasses(el);
            })
            setScrollClasses(menu);
        }
    }
}

initFadeout();

document.addEventListener('astro:after-swap', initFadeout);