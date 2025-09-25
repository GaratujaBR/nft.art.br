// Global variables
let currentArtwork = null;
let zoomLevel = 1;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadArtworkData();
    initPriceHistoryChart();
    loadRelatedArtworks();
});

// Load artwork data from sessionStorage
function loadArtworkData() {
    const artworkData = sessionStorage.getItem('selectedArtwork');
    if (artworkData) {
        currentArtwork = JSON.parse(artworkData);
        populateArtworkDetails(currentArtwork);
    } else {
        // Fallback to sample data if no artwork selected
        currentArtwork = {
            id: 1,
            title: "Digital Metamorphosis",
            artist: "Elena Rodriguez",
            price: "Ξ2.45",
            category: "Abstract",
            image: "https://kimi-web-img.moonshot.cn/img/mir-s3-cdn-cf.behance.net/d9e0560c8d25291c0f3053ee82c9dde0df6532f2.jpg",
            description: "An exploration of digital transformation and organic forms in contemporary digital art. This piece represents the intersection of technology and nature, creating a unique visual language that speaks to the modern condition."
        };
        populateArtworkDetails(currentArtwork);
    }
}

// Populate artwork details
function populateArtworkDetails(artwork) {
    document.getElementById('main-artwork').src = artwork.image;
    document.getElementById('main-artwork').alt = artwork.title;
    document.getElementById('artwork-title').textContent = artwork.title;
    document.getElementById('artwork-category').textContent = artwork.category;
    document.getElementById('artwork-description').textContent = artwork.description;
    document.getElementById('artwork-price').textContent = artwork.price;
    document.getElementById('creator-name').textContent = artwork.artist;
    
    // Set creator avatar initials
    const initials = artwork.artist.split(' ').map(n => n[0]).join('');
    document.getElementById('creator-avatar').textContent = initials;
    
    // Set creation date
    const creationDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    document.getElementById('creation-date').textContent = creationDate.toLocaleDateString();
}

// [Include all the other JavaScript functions from the original artwork.html]

// Initialize entrance animation
document.addEventListener('DOMContentLoaded', function() {
    anime({
        targets: '.glass-effect',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuart'
    });
});