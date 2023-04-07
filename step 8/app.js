// Define variables
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const filterForm = document.querySelector('#filter-form');
const filterSelect = document.querySelector('#filter-select');
const photoDetail = document.querySelector('.photo-detail');
const photoDetailImg = document.querySelector('.photo-detail img');
const photoDetailId = document.querySelector('.photo-detail p');

let photosArray = [];

// Fetch photos from API and display them in gallery
function getPhotos() {
  fetch('https://source.unsplash.com/250x250/?nature,water')
    .then((response) => response.json())
    .then((data) => {
      photosArray = data;
      displayPhotos(photosArray);
    });
}

// Display photos in gallery
function displayPhotos(photos) {
  gallery.innerHTML = '';
  photos.forEach((photo) => {
    const img = document.createElement('img');
    img.src = photo.thumbnailUrl;
    img.alt = photo.title;
    img.setAttribute('data-id', photo.id);
    gallery.appendChild(img);
  });
}

// Show photo detail screen
function showPhotoDetail(id) {
  const photo = photosArray.find((photo) => photo.id == id);
  photoDetailImg.src = photo.url;
  photoDetailImg.alt = photo.title;
  photoDetailId.textContent = `ID: ${photo.id}`;
  photoDetail.classList.add('fade-in');
  photoDetail.style.display = 'flex';
}

// Hide photo detail screen
function hidePhotoDetail() {
  photoDetail.style.display = 'none';
  photoDetail.classList.remove('fade-in');
}

// Event listeners
document.addEventListener('DOMContentLoaded', getPhotos);

gallery.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    const id = event.target.getAttribute('data-id');
    showPhotoDetail(id);
  }
});

photoDetail.addEventListener('click', hidePhotoDetail);

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filteredPhotos = photosArray.filter((photo) =>
    photo.title.toLowerCase().includes(searchTerm)
  );
  displayPhotos(filteredPhotos);
});

filterForm.addEventListener('change', (event) => {
  const filterValue = event.target.value;
  let filteredPhotos = [];

  if (filterValue === 'all') {
    filteredPhotos = photosArray;
  } else {
    filteredPhotos = photosArray.filter((photo) =>
      photo.albumId == filterValue
    );
  }

  displayPhotos(filteredPhotos);
});

// Responsive navbar
const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});
