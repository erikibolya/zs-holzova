
let viewports = document.querySelectorAll('.photogallery__container');
let pswp = document.querySelectorAll('.pswp')[0];
let items = document.querySelectorAll('.gallery__item');
let gallery = null;

for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.addEventListener('click', function (e) {
        openGallery(item);
        e.preventDefault();
    });
}

function openGallery(item) {
    let index = null;
    if (gallery === null) {
        index = buildGallery(items, item);
    }
    if (index === null) {
        for (let i = 0; i < items.length; i++) {
            if (items[i] === item) {
                index = i;
                break;
            }
        }
    }
    var psw = new PhotoSwipe(pswp, PhotoSwipeUI_Default, gallery, {index: index});
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
            src: items[i].getAttribute("href"),
            w: items[i].getAttribute("data-w"),
            h: items[i].getAttribute("data-h")
        };
    }
    gallery = slides;
    return index;
}