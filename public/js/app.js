function openGallery(item) {
    if (gallery === null) {
        var index = buildGallery(item.parentNode.children, item);
        var psw = new PhotoSwipe(pswp, PhotoSwipeUI_Default, galleries[key], {index: index});
    } else {
        var index = getGalleryItemIndex(item);
        var psw = new PhotoSwipe(pswp, PhotoSwipeUI_Default, galleries[key], {index: index});
    }
    psw.init();
}

function buildGallery(items, currentItem) {
    let slides = [];
    let index = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i] === currentItem) {
            index = i;
        }
        slides[slides.length] = {
            src: items[i].getAttribute("data-src"),
            w: items[i].getAttribute("data-w"),
            h: items[i].getAttribute("data-h")
        };
    }
    gallery = slides;
    return index;
}

function getGalleryItemIndex(item) {
    let siblings = item.parentNode.children;
    let index = 0;
    for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] === item) {
            index = i;
        }
    }
    return index;
}
