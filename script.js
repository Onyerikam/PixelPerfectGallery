// Get the gallery images and filter select element
const gallery = document.querySelector('.gallery');
const filterSelect = document.querySelector('#filter');

// Get the search input and form element
const searchInput = document.querySelector('input[type="text"]');
const searchForm = document.querySelector('form');

// Get the page title element
const pageTitle = document.querySelector('title');

// Add hover effect to gallery images
gallery.addEventListener('mouseover', e => {
  if (e.target.matches('.gallery img')) {
    e.target.style.opacity = 0.7;
  }
});

gallery.addEventListener('mouseout', e => {
  if (e.target.matches('.gallery img')) {
    e.target.style.opacity = 1;
  }
});

// Filter images based on selected category
filterSelect.addEventListener('change', e => {
  const category = e.target.value;
  const images = gallery.querySelectorAll('img');

  images.forEach(image => {
    if (category === 'all') {
      image.style.display = 'block';
    } else if (image.alt.includes(category)) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });
});

// Update page title based on selected image
gallery.addEventListener('click', e => {
  if (e.target.matches('.gallery img')) {
    const title = e.target.alt;
    pageTitle.textContent = title;
  }
});

// Filter images based on search input
searchForm.addEventListener('submit', e => {
  e.preventDefault();

  const term = searchInput.value.toLowerCase().trim();
  const images = gallery.querySelectorAll('img');

  images.forEach(image => {
    const title = image.alt.toLowerCase();

    if (title.includes(term)) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });
});
