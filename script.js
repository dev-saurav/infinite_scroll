//const
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let totalImages = 0;
let loadedImages = 0;

let imgArray = [];

//unsplash api config
let count = 5;
const apiKey = "5hBj7-0KAFUVh3ApfZSjRIHSGH_Rjp8t6qsIdk5bEow";
console.log(count);
const unsplashApi = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//setAttributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//when image is loaded
function imageLoad() {
    loadedImages++;
    if (loadedImages === totalImages) {
        ready = true;
        count = 30;
        loader.hidden = true;
    }
}

//display photos 
function displayPhotos() {
    loadedImages = 0;
    totalImages = imgArray.length;
    imgArray.forEach(img => {
        //create a <a> tag
        const item = document.createElement('a')
        item.setAttribute("href", img.links.html);
        item.setAttribute("target", "_blank");
        setAttributes(item, {
            "href": img.links.html,
            "target": "_blank"
        })
        //create a <img> tag
        const image = document.createElement('img');
        setAttributes(image, {
            "src": img.urls.regular,
            "alt": img.alt_description,
            "title": img.alt_description,
        });
        //add the event listner to know if image is loaded
        image.addEventListener("load", imageLoad)
        // Add the img tag to the a tag
        item.appendChild(image);
        //Add the a tag to the img Container
        imgContainer.appendChild(item);
    })
}


//get photos from api
async function getPhotos() {
    try {
        const res = await fetch(unsplashApi);
        imgArray = await res.json();
        displayPhotos();
    } catch (error) {
        // console error
        console.log(error);
    }
}

//implement the infinite scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//on load
getPhotos()
