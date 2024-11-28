window.addEventListener("scroll", () => {
    const scrollThreshold = window.innerHeight / 2;
    const body = document.body;

    if (window.scrollY > scrollThreshold) {
        body.classList.add("scrolled");
    } else {
        body.classList.remove("scrolled");
    }
});
