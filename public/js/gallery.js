
let viewports = document.querySelectorAll('.photogallery__container');
let pswp = document.querySelectorAll('.pswp')[0];
let galleries = [];

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
                openGallery(item);
            }
        }
    });
}


function openGallery(item) {
    let key = item.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".news__hook").id;
    if (galleries[key] === undefined) {
        var index = buildGallery(key, item.parentNode.children, item);
        var psw = new PhotoSwipe(pswp, PhotoSwipeUI_Default, galleries[key], {index: index});
    } else {
        var index = getGalleryItemIndex(item);
        var psw = new PhotoSwipe(pswp, PhotoSwipeUI_Default, galleries[key], {index: index});
    }
    psw.init();
}

function buildGallery(key, items, currentItem) {
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
    galleries[key] = slides;
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
