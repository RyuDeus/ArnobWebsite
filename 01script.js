




// Smooth Scroll Function (Same as before)
    function scrollToSection(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }

    // Active Navigation Dot Update (Same as before)
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.nav-dot');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('onclick').includes(current)) {
                dot.classList.add('active');
            }
        });
        
        // Graffiti Animation Logic
        const aboutSection = document.getElementById('about');
        const graffiti = document.querySelector('.graffiti-art');
        if(graffiti && aboutSection) {
            const aboutPos = aboutSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.5;
            if(aboutPos < screenPos) {
                graffiti.style.opacity = '1';
                graffiti.style.transform = 'translateX(0)';
            }
        }
    });

    // ===============================================
    // UPDATED MODAL & IMAGE VIEWER LOGIC STARTS HERE
    // ===============================================

    const modal = document.getElementById('portfolioModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalGallery = document.getElementById('modalGallery');

    // 1. Elements for the New Image Viewer
    const imageViewer = document.getElementById('imageViewer');
    const fullImage = document.getElementById('fullImage');
    let currentScale = 1; // Variable to track zoom level

    // Sample data
    const portfolioData = {
        'Logo Designing': [
            'Portfolio/logo 2.0.jpg',
            'Portfolio/logo 1.5.jpg',
            'portfolio/logo.jpg',

        ],
        'Thumbnail Editing': [
            'portfolio/lobotomy.jpg',
            'portfolio/messi thumbnail.jpg',
            'Portfolio/roblox veve thumbnail.jpg',
            'Portfolio/neon.jpg',
            'Portfolio/shittyboss.jpg',
            'Portfolio/cop vid.jpg',
            'Portfolio/TIPS AND TRICKS VID.jpg',
            'Portfolio/DOCTOR VS BAPI DA.final.jpg',        
        
        ],
        'Posts & Banners': [
            'Portfolio/banner.jpg',
            'Portfolio/PORTFOLIO PROGRESS.jpg',
            'Portfolio/restaurant  menu.jpg',
            'Portfolio/FINAL SUPRA POSTER.jpg',
            'Portfolio/Koenigsegg Jesko.jpg',

        ]
    };

    // Open the Service Modal (Grid View)
    function openModal(serviceName) {
        modalTitle.innerText = serviceName;
        modalGallery.innerHTML = '';

        if(portfolioData[serviceName]) {
            portfolioData[serviceName].forEach(imgSrc => {
                const div = document.createElement('div');
                div.className = 'gallery-item';
                // Make the image clickable to trigger the Viewer
                div.innerHTML = `<img src="${imgSrc}" alt="${serviceName} work" onclick="openImageViewer('${imgSrc}')" style="cursor:zoom-in;">`;
                modalGallery.appendChild(div);
            });
        } else {
            modalGallery.innerHTML = '<p style="color:#fff;">No work uploaded for this category yet.</p>';
        }

        modal.classList.add('open');
    }

    function closeModal() {
        modal.classList.remove('open');
    }

    // --- NEW FUNCTIONS FOR IMAGE VIEWER ---

    // Open the single image viewer
    function openImageViewer(src) {
        fullImage.src = src;       // Set the image source
        currentScale = 1;          // Reset zoom level
        fullImage.style.transform = `scale(${currentScale})`; // Apply reset
        imageViewer.classList.remove('hidden'); // Show overlay
    }

    // Close the single image viewer
    function closeImageViewer() {
        imageViewer.classList.add('hidden');
    }

    // Zoom Logic
    function zoomImage(step) {
        currentScale += step;
        
        // Prevent zooming out too far (inverted) or zooming in infinitely
        if (currentScale < 0.5) currentScale = 0.5; 
        if (currentScale > 3.0) currentScale = 3.0;

        fullImage.style.transform = `scale(${currentScale})`;
    }

    // Close logic for clicking outside
    window.onclick = function(event) {
        // If clicking outside the Service Modal content
        if (event.target == modal) {
            closeModal();
        }
        // If clicking outside the Image Viewer image (on the dark background)
        if (event.target == imageViewer) {
            closeImageViewer();
        }
    }