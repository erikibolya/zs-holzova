let viewports = document.querySelectorAll('.photogallery__container');
let pswp = document.querySelectorAll('.pswp')[0];
let gallery = null;

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


