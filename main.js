// Atelier Digital - Main JavaScript
// Handles all interactions, animations, and visual effects

// Global variables
let particleSystem;
let artworks = [];
let currentFilter = 'all';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticleSystem();
    initScrollReveal();
    initArtworkGrid();
    initFilterSystem();
    initCharts();
    initNavigation();
    initLivingCards();
});

// Particle System using p5.js
function initParticleSystem() {
    new p5(function(p) {
        let particles = [];
        let numParticles = 50;
        
        p.setup = function() {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particle-bg');
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.1, 0.3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, particle.opacity * 255);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(other => {
                    let distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        let alpha = p.map(distance, 0, 100, 0.1, 0);
                        p.stroke(255, alpha * 255);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Initialize artwork grid with sample data
function initArtworkGrid() {
    artworks = [
        {
            id: 1,
            title: "Metamorfose Digital",
            artist: "Elena Rodriguez",
            price: "Ξ2.45",
            category: "abstract",
            image: "images/artworks/blob (1).png",
            description: "Uma exploração da transformação digital e formas orgânicas"
        },
        {
            id: 2,
            title: "Sonhos Neon",
            artist: "Kai Nakamura",
            price: "Ξ1.89",
            category: "generative",
            image: "images/artworks/blob (1).png",
            description: "Obra de arte generativa explorando paisagens urbanas"
        },
        {
            id: 3,
            title: "Emaranhamento Quântico",
            artist: "Alex Chen",
            price: "Ξ3.21",
            category: "abstract",
            image: "images/artworks/blob (1).png",
            description: "Representação abstrata de conceitos de física quântica"
        },
        {
            id: 4,
            title: "Natureza Sintética",
            artist: "Maya Patel",
            price: "Ξ1.56",
            category: "3d",
            image: "images/artworks/blob (1).png",
            description: "Exploração renderizada em 3D de ecossistemas artificiais"
        },
        {
            id: 5,
            title: "Fluxos de Dados",
            artist: "Jordan Kim",
            price: "Ξ2.78",
            category: "generative",
            image: "images/artworks/blob (1).png",
            description: "Visualização de dados em tempo real como arte abstrata"
        },
        {
            id: 6,
            title: "Construções Etéreas",
            artist: "Sam Torres",
            price: "Ξ4.12",
            category: "3d",
            image: "images/artworks/blob (1).png",
            description: "Formas arquitetônicas no espaço digital"
        },
        {
            id: 7,
            title: "Fluxo Cromático",
            artist: "Luna Martinez",
            price: "Ξ1.98",
            category: "abstract",
            image: "images/artworks/blob (1).png",
            description: "Exploração da teoria das cores em meio digital"
        },
        {
            id: 8,
            title: "Sonhos Blockchain",
            artist: "Ryan O'Connor",
            price: "Ξ3.67",
            category: "generative",
            image: "images/artworks/blob (1).png",
            description: "Representação visual da tecnologia blockchain"
        },
        {
            id: 9,
            title: "Esculturas Virtuais",
            artist: "Zoe Williams",
            price: "Ξ2.23",
            category: "3d",
            image: "images/artworks/blob (1).png",
            description: "Formas esculturais criadas em realidade virtual"
        },
        {
            id: 10,
            title: "Poesia Pixel",
            artist: "Marcus Johnson",
            price: "Ξ1.34",
            category: "abstract",
            image: "images/artworks/blob (1).png",
            description: "Exploração minimalista do pixel como unidade artística"
        },
        {
            id: 11,
            title: "Universo Fractal",
            artist: "Aria Singh",
            price: "Ξ5.89",
            category: "generative",
            image: "images/artworks/blob (1).png",
            description: "Beleza matemática através de geração algorítmica"
        },
        {
            id: 12,
            title: "Arqueologia Digital",
            artist: "Felix Brown",
            price: "Ξ2.45",
            category: "3d",
            image: "images/artworks/blob (1).png",
            description: "Escavando artefatos digitais de mundos virtuais"
        }
    ];
    
    renderArtworkGrid(artworks);
}

// Render artwork grid
function renderArtworkGrid(artworksToShow) {
    const grid = document.getElementById('artwork-grid');
    grid.innerHTML = '';
    
    artworksToShow.forEach((artwork, index) => {
        const card = createArtworkCard(artwork, index);
        grid.appendChild(card);
    });
    
    // Animate cards in
    anime({
        targets: '.masonry-item',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart'
    });
}

// Create artwork card element
function createArtworkCard(artwork, index) {
    const card = document.createElement('div');
    card.className = 'masonry-item living-card cursor-pointer';
    card.onclick = () => openArtworkPortal(artwork);
    
    card.innerHTML = `
        <div class="glass-effect rounded-xl overflow-hidden group">
            <div class="aspect-square overflow-hidden">
                <img src="${artwork.image}" alt="${artwork.title}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                    <div>
                        <h3 class="font-semibold text-lg mb-1">${artwork.title}</h3>
                        <p class="text-sm text-gray-400">${artwork.artist}</p>
                    </div>
                    <div class="text-right">
                        <div class="font-mono text-accent-blue">${artwork.price}</div>
                        <div class="text-xs text-gray-500">Lance atual</div>
                    </div>
                </div>
                <p class="text-sm text-gray-300 line-clamp-2">${artwork.description}</p>
                <div class="mt-3 flex items-center justify-between">
                    <span class="text-xs px-2 py-1 bg-white/10 rounded-full">${artwork.category}</span>
                    <button class="text-xs text-accent-blue hover:text-accent-violet transition-colors">
                        Ver Detalhes →
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Initialize filter system
function initFilterSystem() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active', 'bg-white/20'));
            this.classList.add('active', 'bg-white/20');
            
            // Filter artworks
            const filter = this.dataset.filter;
            currentFilter = filter;
            
            let filteredArtworks = filter === 'all' 
                ? artworks 
                : artworks.filter(art => art.category === filter);
            
            // Animate out current cards
            anime({
                targets: '.masonry-item',
                opacity: 0,
                translateY: -30,
                duration: 300,
                complete: () => {
                    renderArtworkGrid(filteredArtworks);
                }
            });
        });
    });
}

// Initialize charts
function initCharts() {
    // Price trend chart
    const priceChart = echarts.init(document.getElementById('price-chart'));
    const priceOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            axisLine: { lineStyle: { color: '#404040' } },
            axisLabel: { color: '#9ca3af' }
        },
        yAxis: {
            type: 'value',
            axisLine: { lineStyle: { color: '#404040' } },
            axisLabel: { color: '#9ca3af' },
            splitLine: { lineStyle: { color: '#2d2d2d' } }
        },
        series: [{
            data: [8.2, 12.5, 15.8, 18.3, 22.1, 25.7],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#4a90e2', width: 3 },
            itemStyle: { color: '#4a90e2' },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(74, 144, 226, 0.3)' },
                        { offset: 1, color: 'rgba(74, 144, 226, 0.05)' }
                    ]
                }
            }
        }]
    };
    priceChart.setOption(priceOption);
    
    // Category distribution chart
    const categoryChart = echarts.init(document.getElementById('category-chart'));
    const categoryOption = {
        backgroundColor: 'transparent',
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
                { value: 35, name: 'Abstrata', itemStyle: { color: '#4a90e2' } },
                { value: 28, name: 'Generativa', itemStyle: { color: '#f5a623' } },
                { value: 22, name: 'Arte 3D', itemStyle: { color: '#9013fe' } },
                { value: 15, name: 'Outras', itemStyle: { color: '#2d2d2d' } }
            ],
            label: {
                color: '#ffffff',
                fontSize: 12
            },
            labelLine: {
                lineStyle: { color: '#404040' }
            }
        }]
    };
    categoryChart.setOption(categoryOption);
    
    // Resize charts on window resize
    window.addEventListener('resize', () => {
        priceChart.resize();
        categoryChart.resize();
    });
}

// Initialize navigation
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Initialize living card interactions
function initLivingCards() {
    const cards = document.querySelectorAll('.living-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Open artwork portal (navigate to artwork detail page)
function openArtworkPortal(artwork) {
    // Store artwork data in sessionStorage for the detail page
    sessionStorage.setItem('selectedArtwork', JSON.stringify(artwork));
    
    // Navigate to artwork detail page
    window.location.href = 'artwork.html';
}

// Utility functions
function scrollToGallery() {
    document.getElementById('gallery').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function toggleMobileMenu() {
    // Mobile menu implementation
    console.log('Menu mobile alternado');
}

// Load more functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more artworks
            this.innerHTML = 'Carregando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = 'Carregar Mais Obras';
                this.disabled = false;
                
                // Show success message
                const notification = document.createElement('div');
                notification.className = 'fixed top-24 right-6 glass-effect px-4 py-2 rounded-lg z-50';
                notification.innerHTML = 'Mais obras carregadas!';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            }, 1500);
        });
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate masonry layout if needed
    const grid = document.getElementById('artwork-grid');
    if (grid) {
        // Force reflow
        grid.style.columnCount = '';
        setTimeout(() => {
            grid.style.columnCount = window.innerWidth < 768 ? 
                (window.innerWidth < 480 ? '1' : '2') : 
                (window.innerWidth < 1024 ? '3' : '4');
        }, 100);
    }
});

// Export functions for global access
window.scrollToGallery = scrollToGallery;
window.openArtworkPortal = openArtworkPortal;