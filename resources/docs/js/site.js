import headingsAnchors from './heading-anchors'

headingsAnchors()

window.onload = function() {
    const element = document.querySelector('.active');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};


document.addEventListener('DOMContentLoaded', function () {
    // Select all images with the expandable-image class
    const expandableImages = document.querySelectorAll('.expandable-image');

    // Loop through each image and add the click event listener
    expandableImages.forEach(image => {
        image.addEventListener('click', function () {
            // Open the image source in a new tab
            window.open(image.src, '_blank');
        });
    });
});