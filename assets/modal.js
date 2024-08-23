document.addEventListener("DOMContentLoaded", function() {
    galleryClick();
});

let currentImageId;
let currentCategory = "all";

const galleryClick = () => {
    const gallery = document.querySelectorAll('.gallery-items-row img');
    gallery.forEach((image) => {
        image.addEventListener("click", (event) => {
            const imageSrc = event.target.src;
            const imageId = parseInt(event.target.dataset.imageId);
            showModal(imageSrc, imageId);
        });
    });
    const modal = document.querySelector('.modal');
    modal.addEventListener("click", (event) => {
        hideModal();
    });

    // Tricky
    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    const prevButton = document.querySelector('.mg-prev');
    const nextButton = document.querySelector('.mg-next');
    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            showPrevImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        }
    });
}

const showModal = (imageSrc, imageId) => {
    const modal = document.querySelector('.modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalImg = document.querySelector('.modal-body img');
    
    modalBackdrop.classList.add('show');
    modal.classList.add('show');
    modalImg.src = imageSrc;
    currentImageId = imageId;
}

const hideModal = () => {
    const modal = document.querySelector('.modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalImg = document.querySelector('.modal-body img');
    
    modal.classList.remove('show');
    modalBackdrop.classList.remove('show');
    modalImg.src = "";
    currentImageId = null;
}

const showPrevImage = () => {
    const gallery = document.querySelectorAll('.gallery-items-row img');
    const galleryArray = [...gallery]; // Tricky
    const filteredImages = galleryArray.filter((item) => {
        if (currentCategory === "all") {
            return true;
        } else {
            return item.dataset.galleryTag === currentCategory;
        }
    });

    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const currentIndex = filteredImages.findIndex(
        (item) => {
            return parseInt(item.dataset.imageId) === currentImageId
        }
    );

    if (currentIndex > 0) {
        const prevImage = filteredImages[currentIndex - 1];
        currentImageId = parseInt(prevImage.dataset.imageId);
        showModal(prevImage.src, currentImageId);
    }
}

const showNextImage = () => {
    const gallery = document.querySelectorAll('.gallery-items-row img');
    const galleryArray = [...gallery]; // Tricky
    const filteredImages = galleryArray.filter((item) => {
        if (currentCategory === "all") {
            return true;
        } else {
            return item.dataset.galleryTag === currentCategory;
        }
    });

    const currentIndex = filteredImages.findIndex(
        (item) => parseInt(item.dataset.imageId) === currentImageId
    );

    if (currentIndex < filteredImages.length - 1) {
        const nextImage = filteredImages[currentIndex + 1];
        currentImageId = parseInt(nextImage.dataset.imageId);
        showModal(nextImage.src, currentImageId);
    }
}
