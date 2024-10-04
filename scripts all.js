// script.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href');
        if (linkUrl === currentUrl) {
            link.classList.add('active');
        }
    });
});
