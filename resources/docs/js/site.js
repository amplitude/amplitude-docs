import headingsAnchors from './heading-anchors'

headingsAnchors()

window.onload = function() {
    const element = document.querySelector('.active');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};