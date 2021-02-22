const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const collectionsId = 36416650;
const photoNumber = 20;
const apiKey = 'zrsk-8vs3ThroCd6lcHHsUWFmcKANUXsb49sihIiz4c';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&collections=${collectionsId}&count=${photoNumber}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages ) {
        ready = true;
        loader.hidden = true;
    }
}

function displayPhotos() {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {

        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        //Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> for inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

function getPhotos() {
    fetch(apiUrl)
    
        .then(response => {
            return response.json();
        })
        .then(data => {
            photosArray = data; 
            displayPhotos();
        })
        .catch(error => {
        });
}


window.addEventListener('scroll', () => {
    let length = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

    if (length && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
