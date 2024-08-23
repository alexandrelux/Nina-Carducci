document.addEventListener("DOMContentLoaded", function() {
    navLinksClick();
});

const navLinksClick = () => {
    const navLinks = document.querySelectorAll('.tags-bar .nav-item .nav-link');

    navLinks.forEach((navLink) => {
        navLink.addEventListener("click", (event) => {
            const toggleValue = event.target.dataset.imagesToggle;
            currentCategory = toggleValue;
            navLinksIsActive(toggleValue);
            galleryIsActive(toggleValue);
        });
    });
}

const navLinksIsActive = (activeToggleValue) => {
    const navLinks = document.querySelectorAll('.tags-bar .nav-item .nav-link');

    navLinks.forEach((navLink) => {
        const toggleValue = navLink.dataset.imagesToggle;
        if (activeToggleValue === toggleValue) {
            navLink.classList.add("active");
        } else {
            navLink.classList.remove("active");
        }
    });
};

const galleryIsActive = (activeToggleValue) => {
    const gallery = document.querySelectorAll('.gallery-items-row img');
    gallery.forEach((image) => {
        if (activeToggleValue === "all") {
            image.parentElement.style.display='block';
        } else {
            const toggleValue = image.dataset.galleryTag;
            if (activeToggleValue === toggleValue) {
                image.parentElement.style.display='block';
            } else {
                image.parentElement.style.display='none';
            }
        }
    });
};
