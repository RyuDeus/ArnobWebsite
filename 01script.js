




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
            'portfolio/logo 0.0.jpg',
            'https://media.discordapp.net/attachments/811903789426016296/1449444427658428686/coffee_restaurant_logo_eclipless.jpg?ex=69418ed0&is=69403d50&hm=1c5e88a367335d0bffc1cdee8aeeed80d7ecf09304ca61ecfc8b45f65c478174&=&format=webp&width=1376&height=955',
            'https://media.discordapp.net/attachments/811903789426016296/1449444523619913869/coffee_restaurant_logo.jpg?ex=69418ee7&is=69403d67&hm=76fed862f2d816a4c3c879ac114da762dbae07043f28bd851b3a9e9ba99c00f3&=&format=webp&width=1376&height=955',
            'https://media.discordapp.net/attachments/811903789426016296/1449444882744873091/tech_company_logo_white_version.jpg?ex=69418f3d&is=69403dbd&hm=ca22510ba2b812179fe18c81974c2fa4255a8a8d0fe3d51b126ae970f98e2948&=&format=webp&width=1376&height=955',
            'https://media.discordapp.net/attachments/811903789426016296/1449444936264056954/tech_company_logo.jpg?ex=69418f4a&is=69403dca&hm=e219af8750a4491c19ddf5c2675ac69e7f41faf556c2724c98cf756824542c1e&=&format=webp&width=1376&height=955',
            'https://media.discordapp.net/attachments/811903789426016296/1449444474227785982/realestatelogo.jpg?ex=69418edc&is=69403d5c&hm=d6691982da7b8a20de3c7a90643315b588ecef06e3e86357453f67239d91ad3a&=&format=webp&width=1604&height=902',

        ],
        'Thumbnail Editing': [
            'Portfolio/footballTB1.jpg',
            'Portfolio/footballTB2.jpg',
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


