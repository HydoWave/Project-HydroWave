// script.js

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let activeSectionIndex = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    function onScroll() {
        const scrollPosition = window.scrollY;
        let nextSectionIndex = activeSectionIndex;

        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop - window.innerHeight / 2) {
                nextSectionIndex = index;
            }
        });

        if (nextSectionIndex !== activeSectionIndex) {
            activeSectionIndex = nextSectionIndex;
            showSection(activeSectionIndex);
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initially show the first section
    showSection(activeSectionIndex);
});
