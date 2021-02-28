// ***** JS DOM PRACTICE HOMEWORK *****


// WHAT SHOULD YOU DO ?

// - Create array containing 4 image paths
// OK

// - Create slider with those images, where only one is visible in the start
// OK

// - Every 5 secods next image should be displayed, by switching image position (move first image in the last place by changing it's position in DOM)
//OK

// - Below the slider there should be list of slider thumbnails
// OK

// - Active image thumbnail should always be highlighted (have a border), change it when image is changed
// OK

// BONUS:

// - Make it possible to change images by sliding it, not only switching
//OK

// - Images whould be in parent element, all in same row (use flexbox), but only one should be visible, the rest should be hidden with overflow
//OK

// - Every 5 seconds the whole parent element should move to the left by the value of single image width. You can do this by changing it's margin
//OK

// - Once parent element moved to the left, you can move first image to the last place in parent (DOM position), so the current one is the first one. At this moment you would need to reset margin on parent element too
//OK

// - Here you should also have thumbnails, and change active one each time image is changed
//OK

// SAVE PREVIOUS BEHAVIOR TOO, JUST COMMENT IT OUT, SO YOU HAVE FUNCIONS FOR BOTH, SWITCHING AND SLIDING!

var imagesPaths = [
    './img/chicken-4151637_640.jpg',
    './img/cow-1509258_640.jpg',
    './img/goat-4408207_640.jpg',
    './img/horse-2196755_640.jpg'
];

var slider = document.getElementById('slider');
var thumbnails = document.getElementById('thumbnails');

// insert slider
function insertSlider(arr) {
    for(var i = arr.length - 1; i >= 0; i--) {
        slider.prepend(insertImage(i));
    }
}

// insert Thumbnails
function insertThumbnails(arr) {
    for(var i = arr.length - 1; i >= 0; i--) {
        thumbnails.prepend(insertImage(i));
    }
}

// insert image
function insertImage(i) {
    var image = document.createElement('img');
    image.setAttribute('src', imagesPaths[i]);

    return image;
}

function init() {
    insertSlider(imagesPaths);
    insertThumbnails(imagesPaths);
}
init();


// change slide

var imagesThumbnails = document.querySelectorAll('#thumbnails img');
var imagesSlide = document.querySelectorAll('#slider img');

function moveLeft() {
    slider.setAttribute("style", "left: -640px; transition-property: left; transition-duration: 2s; transition-timing-function: linear; transition-delay: 0s;");
}

var slideActive;

function changePos() {

    var startSlide = imagesSlide[0]; // chicken
    
    for(var i = 0; i < imagesSlide.length; i++) {
        var beforeStart = imagesSlide[i].previousElementSibling;

        if(!beforeStart) {

            slider.appendChild(imagesSlide[i]);
            
            if(i < imagesSlide.length - 1) {
                slideActive = imagesSlide[i + 1];
            } else {
                slideActive = imagesSlide[0];
            }
            break;
        }
    }
    highlightTN();
}

imagesThumbnails[0].classList.add('selected');

function highlightTN() {

    for(var i = 0; i < imagesThumbnails.length; i++) {

        imagesThumbnails[i].classList.remove('selected');

        var activePath = slideActive.getAttribute('src');
        var thumbNailPath = imagesThumbnails[i].getAttribute('src');

        if(thumbNailPath === activePath) {
            imagesThumbnails[i].classList.add('selected');
        }
    }
}

function moveBack() {
    slider.setAttribute("style",  "left: 0px; transition-property: left; transition-duration: 0s; transition-timing-function: linear; transition-delay: 0s;");
}

function slide() {
    moveLeft()
    setTimeout(changePos, 2000);
    setTimeout(moveBack, 2000);
}
setInterval(slide, 5000);
