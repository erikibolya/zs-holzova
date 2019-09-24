let pswp = document.querySelectorAll('.pswp')[0];
let gallery_items = document.querySelectorAll('.gallery__item');
let gallery = [];
let viewports = document.querySelectorAll('.photogallery__container');


function openGallery(item, siblings) {
    var index = buildGallery(item, siblings);
    var psw = new PhotoSwipe(pswp, PhotoSwipeUI_Default, gallery, {index: index});
    psw.init();
}

function buildGallery(currentItem, siblings) {
    let slides = [];
    let index = 0;
    for (let i = 0; i < siblings.length; i++) {
        if (siblings[i] === currentItem) {
            index = i;
        }
        slides[slides.length] = {
            src: siblings[i].getAttribute("data-src"),
            w: siblings[i].getAttribute("data-w"),
            h: siblings[i].getAttribute("data-h")
        };
    }
    gallery = slides;
    return index;
}


for (let i = 0; i < gallery_items.length; i++) {
    let item = gallery_items[i];
    item.addEventListener('click', function (e) {
        openGallery(item, gallery_items);
        e.preventDefault();
    });
}

for (let i = 0; i < viewports.length; i++) {
    let viewport = viewports[i];
    let content = viewports[i].querySelector('.photogallery__scrollarea');
    let hasMoved = false;
    let prev_x = 0;
    new ScrollBooster({
        viewport, // this parameter is required
        content, // scrollable element
        mode: 'x', // scroll only in horizontal dimension
        onUpdate: (data) => {
            // your scroll logic goes here
            content.style.transform = `translateX(${ -data.position.x}px)`
            if (data.dragOffsetPosition.x === 0) {
                prev_x = 0;
            }
            if (data.dragOffsetPosition.x !== prev_x) {
                hasMoved = true;
                prev_x = data.dragOffsetPosition.x;
            }
        },
        onClick: (data, event) => {
            if (hasMoved) {
                hasMoved = false;
                prev_x = data.dragOffsetPosition.x;
                event.stopPropagation();
                event.preventDefault();
            } else {
                let item = event.target.parentNode;
                openGallery(item, item.parentNode.children);
            }
        }
    });
}