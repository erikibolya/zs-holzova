let pswp = document.querySelectorAll('.pswp')[0];
let gallery_items = document.querySelectorAll('.gallery__item:not(.gallery__item--redirect)');
let gallery = [];
let viewports = document.querySelectorAll('.photogallery__container');
let menuCheckboxes = document.querySelectorAll(".desktop-menu__trigger");
let isMenuOpen = false;


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
        viewport: viewport, // this parameter is required
        content: content, // scrollable element
        mode: 'x', // scroll only in horizontal dimension
        onUpdate: function (data) {
            // your scroll logic goes here
            content.style.transform = "translateX(" + (-data.position.x) + "px)";
            if (data.dragOffsetPosition.x === 0) {
                prev_x = 0;
            }
            if (data.dragOffsetPosition.x !== prev_x) {
                hasMoved = true;
                prev_x = data.dragOffsetPosition.x;
            }
        },
        onClick: function (data, event) {
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

let searchbar = document.getElementById("searchbar");
if (searchbar !== null) {
    let action = searchbar.getAttribute("action");
    let input = searchbar.querySelector(".searchbar__input");
    let content = document.querySelector(".searcharea__content");
    searchbar.addEventListener("submit", function (e) {
        let value = input.value;
        minAjax({
            url: action, //request URL
            type: "POST", //Request type GET/POST
            //Send Data in form of GET/POST
            data: {
                query: value,
            },
            //CALLBACK FUNCTION with RESPONSE as argument
            success: function (data) {
                content.innerHTML = data;
//                console.log(data);
            }
        });
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }, true);
}



let contactForm = document.getElementById("contact_form");
if (contactForm !== null) {
    let cfaction = contactForm.getAttribute("action");
    let messageBox = contactForm.querySelector(".contacts__form__message");
    contactForm.addEventListener("submit", function (e) {
        let inputs = e.target;
        let data = {};
        for (let i = 0; i < inputs.length; i++) {
            data[inputs[i].name] = inputs[i].value;
        }
        console.log(data);
        minAjax({
            url: cfaction, //request URL
            type: "POST", //Request type GET/POST
            //Send Data in form of GET/POST
            data: data,
            //CALLBACK FUNCTION with RESPONSE as argument
            success: function (data) {
                let request = JSON.parse(data);
                if (request.send) {
                    messageBox.innerHTML = request.msg;
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = "";
                    }
                } else {
                    while (messageBox.classList.length > 0) {
                        messageBox.classList.remove(messageBox.classList.item(0));
                    }
                    messageBox.classList.add("contacts__form__message");
                    messageBox.classList.add(request.class);
                    messageBox.innerHTML = request.msg;
                }

//                console.log(JSON.parse(data));
            }
        });
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }, true);

}
