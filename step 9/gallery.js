// Initialize Material UI components
const { TextField, Button, Select, MenuItem, FormControl, InputLabel } = window['material-ui'];

// Gallery data
const galleryData = [
  {
    id: 1,
    category: 'landscapes',
    src: 'https://picsum.photos/id/1018/800/600',
    alt: 'A beautiful landscape'
  },
  {
    id: 2,
    category: 'portraits',
    src: 'https://picsum.photos/id/1015/800/600',
    alt: 'A portrait of a man'
  },
  {
    id: 3,
    category: 'abstracts',
    src: 'https://picsum.photos/id/1021/800/600',
    alt: 'An abstract artwork'
  },
  // Add more data here
];

// Gallery settings
const settings = {
  imagesPerRow: 4,
  lazyLoadOffset: 100,
  infiniteScrollOffset: 500,
};

// Initialize the gallery
const gallery = new PixelPerfectGallery(galleryData, settings);

// Initialize Material UI components
const searchInput = new TextField({
  placeholder: 'Search...',
  onChange: handleSearch,
});

const filterSelect = new Select({
  value: 'all',
  onChange: handleFilter,
  inputProps: {
    id: 'category-select',
  },
  children: [
    new MenuItem({ value: 'all', children: 'All' }),
    new MenuItem({ value: 'landscapes', children: 'Landscapes' }),
    new MenuItem({ value: 'portraits', children: 'Portraits' }),
    new MenuItem({ value: 'abstracts', children: 'Abstracts' }),
  ],
});

const filterFormControl = new FormControl({
  children: [
    new InputLabel({ htmlFor: 'category-select', children: 'Category' }),
    filterSelect,
  ],
});

const searchButton = new Button({
  variant: 'contained',
  children: [
    new window['material-ui-icons'].Search(),
  ],
  onClick: handleSearch,
});

// Add the Material UI components to the controls container
document.querySelector('.search-container').appendChild(searchInput.render());
document.querySelector('.search-container').appendChild(searchButton.render());
document.querySelector('.filter-container').appendChild(filterFormControl.render());

// Handle search input and button clicks
function handleSearch() {
  const searchValue = searchInput.getValue().toLowerCase();
  gallery.filter((item) => item.alt.toLowerCase().includes(searchValue));
}

// Handle filter select changes
function handleFilter() {
  const filterValue = filterSelect.getValue();
  if (filterValue === 'all') {
    gallery.showAll();
  } else {
    gallery.filter((item) => item.category === filterValue);
  }
}

// Initialize the photo detail screen
const photoDetail = new PhotoDetailScreen({
  onClose: () => gallery.hidePhotoDetail(),
  onShare: (photoId) => handleShare(photoId),
});

// Add the photo detail screen to the page
document.body.appendChild(photoDetail.render());

// Handle share button clicks
function handleShare(photoId) {
  const shareUrl = `https://web.facebook.com/stories/create${photoId}`;
  navigator.share({ url: shareUrl });
}

// Initialize the gallery and photo detail screen
gallery.init();
photoDetail.init();
