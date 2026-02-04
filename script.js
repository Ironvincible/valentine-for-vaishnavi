// Valentine's Proposal Card - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log("Valentine's card loaded! 💝");
    
    // ===== ELEMENTS =====
    const card = document.getElementById('card');
    const flipBtn = document.getElementById('flipBtn');
    const resetBtn = document.getElementById('resetBtn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebrationOverlay = document.getElementById('celebration-overlay');
    const closeCelebrationBtn = document.getElementById('close-celebration');
    const daysCount = document.getElementById('days-count');
    const floatingHeartsContainer = document.getElementById('floating-hearts');
    const photoContainer = document.getElementById('photo-container');
    const photoNav = document.getElementById('photo-nav');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volume-slider');
    
    // ===== CREATE BACKGROUND FLOATING HEARTS =====
    function createBackgroundHearts() {
        const bgHeartsContainer = document.createElement('div');
        bgHeartsContainer.className = 'background-hearts';
        
        // Create 6 floating hearts in background
        for (let i = 1; i <= 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.innerHTML = '💖';
            bgHeartsContainer.appendChild(heart);
        }
        
        document.body.appendChild(bgHeartsContainer);
    }
    
    // ===== CREATE HEARTS AROUND THE CARD =====
    function createCardHearts() {
        const cardHeartsContainer = document.createElement('div');
        cardHeartsContainer.className = 'card-hearts';
        
        // Create 4 hearts around the card
        for (let i = 1; i <= 4; i++) {
            const heart = document.createElement('div');
            heart.className = 'card-heart';
            heart.innerHTML = '💝';
            cardHeartsContainer.appendChild(heart);
        }
        
        document.querySelector('.card-container').appendChild(cardHeartsContainer);
    }
    
    // ===== MUSIC PLAYER =====
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> Play Music';
        } else {
            bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        }
        isPlaying = !isPlaying;
    });
    
    volumeSlider.addEventListener('input', function() {
        bgMusic.volume = this.value;
    });
    
    // Try to autoplay music with user interaction
    document.addEventListener('click', function initMusic() {
        if (!isPlaying) {
            bgMusic.volume = volumeSlider.value;
            musicToggle.click();
        }
        document.removeEventListener('click', initMusic);
    }, { once: true });
    
    // ===== CARD FLIP =====
    function flipCard() {
        card.classList.toggle('flipped');
        updateButtonText();
    }
    
    function resetCard() {
        card.classList.remove('flipped');
        updateButtonText();
    }
    
    function updateButtonText() {
        if (card.classList.contains('flipped')) {
            flipBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Flip to Front';
        } else {
            flipBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Flip Card';
        }
    }
    
    // ===== EVENT LISTENERS =====
    // Card click to flip
    card.addEventListener('click', flipCard);
    
    // Button clicks
    flipBtn.addEventListener('click', flipCard);
    resetBtn.addEventListener('click', resetCard);
    
    // ===== PROPOSAL RESPONSE =====
    yesBtn.addEventListener('click', function() {
        celebrationOverlay.style.display = 'flex';
        createCelebrationHearts();
        
        // Update button text
        yesBtn.innerHTML = 'YES! 💖';
        yesBtn.style.background = '#2E7D32';
        
        // Add extra celebration hearts
        createExtraHearts();
    });
    
    // No button fun interaction
    noBtn.addEventListener('mouseover', function() {
        // Move button away when trying to click
        const maxX = 200;
        const maxY = 100;
        const randomX = Math.random() * maxX * 2 - maxX;
        const randomY = Math.random() * maxY * 2 - maxY;
        
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    
    noBtn.addEventListener('click', function() {
        // If somehow clicked, show message
        alert("I know you meant YES! 😉");
        noBtn.innerHTML = "OK, YES!";
        noBtn.style.background = "#4CAF50";
        
        // Change to yes functionality
        noBtn.onmouseover = null;
        noBtn.onclick = function() {
            celebrationOverlay.style.display = 'flex';
            createCelebrationHearts();
            createExtraHearts();
        };
    });
    
    // Close celebration
    closeCelebrationBtn.addEventListener('click', function() {
        celebrationOverlay.style.display = 'none';
    });
    
    // ===== PHOTO GALLERY - SIMPLIFIED AND FIXED =====
    function loadPhotos() {
        console.log("📸 Loading photos...");
        
        // Define photo paths - try different variations
        const photoConfigs = [
            {
                index: 0,
                primaryPath: 'assets/images/Vaishnavi1.png',
                altPaths: [
                    'assets/images/vaishnavi1.png',
                    'assets/images/Vaishnavi1.PNG',
                    'images/Vaishnavi1.png',
                    'Vaishnavi1.png'
                ],
                placeholderText: 'Vaishnavi 1',
                placeholderColor: '#ff4081'
            },
            {
                index: 1,
                primaryPath: 'assets/images/Vaishnavi2.jpg',
                altPaths: [
                    'assets/images/vaishnavi2.jpg',
                    'assets/images/Vaishnavi2.JPG',
                    'assets/images/Vaishnavi2.jpeg',
                    'images/Vaishnavi2.jpg',
                    'Vaishnavi2.jpg'
                ],
                placeholderText: 'Vaishnavi 2',
                placeholderColor: '#f50057'
            },
            {
                index: 2,
                primaryPath: 'assets/images/Vaishnavi3.png',
                altPaths: [
                    'assets/images/vaishnavi3.png',
                    'assets/images/Vaishnavi3.PNG',
                    'images/Vaishnavi3.png',
                    'Vaishnavi3.png'
                ],
                placeholderText: 'Vaishnavi 3',
                placeholderColor: '#ff79b0'
            }
        ];
        
        // Clear existing content
        photoContainer.innerHTML = '';
        photoNav.innerHTML = '';
        
        let photosLoaded = 0;
        const totalPhotos = photoConfigs.length;
        
        // Function to load a single photo
        function loadPhoto(config) {
            const slide = document.createElement('div');
            slide.className = `photo-slide ${config.index === 0 ? 'active' : ''}`;
            slide.id = `slide-${config.index}`;
            
            // Try primary path first
            tryImageLoad(config.primaryPath, slide, config, 0);
            
            photoContainer.appendChild(slide);
            
            // Create navigation button
            const navBtn = document.createElement('button');
            navBtn.className = `nav-btn ${config.index === 0 ? 'active' : ''}`;
            navBtn.setAttribute('data-slide', config.index);
            navBtn.setAttribute('aria-label', `View ${config.placeholderText}`);
            navBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
            photoNav.appendChild(navBtn);
        }
        
        function tryImageLoad(path, slide, config, attemptIndex) {
            const img = new Image();
            
            img.onload = function() {
                console.log(`✅ Loaded: ${config.placeholderText} from ${path}`);
                
                // Clear slide and add image
                slide.innerHTML = '';
                const imgElement = this.cloneNode(true);
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'cover';
                imgElement.style.objectPosition = 'center top';
                
                // Special handling for different images
                if (config.index === 2) { // Vaishnavi3 is more square
                    imgElement.style.objectPosition = 'center';
                }
                
                slide.appendChild(imgElement);
                photosLoaded++;
                checkAllPhotosLoaded();
            };
            
            img.onerror = function() {
                console.log(`❌ Failed: ${path}`);
                
                // Try next alternative path
                if (attemptIndex < config.altPaths.length) {
                    tryImageLoad(config.altPaths[attemptIndex], slide, config, attemptIndex + 1);
                } else {
                    // All paths failed, show placeholder
                    console.log(`⚠️ All paths failed for ${config.placeholderText}, showing placeholder`);
                    createPlaceholder(slide, config);
                    photosLoaded++;
                    checkAllPhotosLoaded();
                }
            };
            
            img.src = path;
            img.alt = config.placeholderText;
        }
        
        function createPlaceholder(slide, config) {
            slide.innerHTML = '';
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-placeholder';
            placeholder.innerHTML = `
                <i class="fas fa-heart"></i>
                <p>${config.placeholderText}</p>
                <small>Beautiful Memory</small>
            `;
            placeholder.style.background = `linear-gradient(135deg, ${config.placeholderColor}, ${config.placeholderColor}80)`;
            placeholder.style.color = 'white';
            
            // Make placeholder clickable to show a sample
            placeholder.style.cursor = 'pointer';
            placeholder.title = 'Click to see a sample';
            placeholder.addEventListener('click', function() {
                showSampleImage(slide, config);
            });
            
            slide.appendChild(placeholder);
        }
        
        function showSampleImage(slide, config) {
            slide.innerHTML = '';
            const sampleDiv = document.createElement('div');
            sampleDiv.className = 'photo-placeholder';
            sampleDiv.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 10px;">💖</div>
                <p style="font-size: 1.3rem; font-weight: bold;">${config.placeholderText}</p>
                <small>Vaishnavi's Photo ${config.index + 1}</small>
                <div style="margin-top: 10px; font-size: 0.8rem; opacity: 0.8;">
                    Add ${config.placeholderText}.jpg/png to assets/images/
                </div>
            `;
            sampleDiv.style.background = `linear-gradient(135deg, ${config.placeholderColor}, #ffb6c1)`;
            sampleDiv.style.color = 'white';
            sampleDiv.style.display = 'flex';
            sampleDiv.style.flexDirection = 'column';
            sampleDiv.style.alignItems = 'center';
            sampleDiv.style.justifyContent = 'center';
            sampleDiv.style.height = '100%';
            
            slide.appendChild(sampleDiv);
        }
        
        function checkAllPhotosLoaded() {
            if (photosLoaded === totalPhotos) {
                console.log(`📊 Photo loading complete: ${photosLoaded}/${totalPhotos} loaded`);
                // All photos processed, setup is complete
                if (totalPhotos > 1) {
                    startPhotoRotation();
                }
            }
        }
        
        // Load all photos
        photoConfigs.forEach(config => {
            loadPhoto(config);
        });
    }
    
    let currentSlide = 0;
    let photoInterval = null;
    
    function showSlide(index) {
        const slides = document.querySelectorAll('.photo-slide');
        const navButtons = document.querySelectorAll('.nav-btn');
        
        if (slides.length === 0) return;
        
        // Reset index if out of bounds
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show selected slide
        slides[index].classList.add('active');
        
        // Update navigation buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        if (navButtons[index]) {
            navButtons[index].classList.add('active');
        }
        
        currentSlide = index;
        
        // Restart auto-rotation timer
        restartPhotoRotation();
    }
    
    // Auto-rotate photos every 5 seconds
    function startPhotoRotation() {
        if (photoInterval) clearInterval(photoInterval);
        
        photoInterval = setInterval(() => {
            const slides = document.querySelectorAll('.photo-slide');
            if (slides.length > 1) {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= slides.length) nextSlide = 0;
                showSlide(nextSlide);
            }
        }, 5000);
    }
    
    function restartPhotoRotation() {
        if (photoInterval) {
            clearInterval(photoInterval);
            startPhotoRotation();
        }
    }
    
    // ===== FLOATING HEARTS =====
    function createFloatingHearts() {
        const heartCount = 25;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random size
            const size = Math.random() * 25 + 15;
            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            
            // Random position
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            
            // Random animation
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            heart.style.animation = `float ${duration}s infinite ${delay}s`;
            
            // Random color
            const opacity = Math.random() * 0.5 + 0.3;
            heart.style.opacity = opacity;
            
            // Random pink color
            const pinkShades = ['#ff4081', '#f50057', '#ff79b0', '#ff4d8d'];
            const randomColor = pinkShades[Math.floor(Math.random() * pinkShades.length)];
            heart.style.background = randomColor;
            
            floatingHeartsContainer.appendChild(heart);
        }
        
        // Add floating animation to CSS
        if (!document.querySelector('#float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: rotate(45deg) translateY(0) rotate(0deg); }
                    25% { transform: rotate(45deg) translateY(-30px) rotate(90deg); }
                    50% { transform: rotate(45deg) translateY(-15px) rotate(180deg); }
                    75% { transform: rotate(45deg) translateY(-25px) rotate(270deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ===== EXTRA HEARTS FOR CELEBRATION =====
    function createExtraHearts() {
        const heartEmojis = ['💖', '💗', '💓', '💞', '💕', '❤️', '💘', '💝'];
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = Math.random() * 40 + 30 + 'px';
            heart.style.zIndex = '1999';
            heart.style.opacity = '0.7';
            heart.style.animation = `floatAround ${Math.random() * 10 + 5}s infinite linear`;
            document.body.appendChild(heart);
        }
    }
    
    // ===== CELEBRATION HEARTS =====
    function createCelebrationHearts() {
        const heartEmojis = ['💖', '💗', '💓', '💞', '💕', '❤️', '💘', '💝'];
        
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 40 + 30 + 'px';
            heart.style.zIndex = '1999';
            heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            document.body.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
        
        // Add falling animation
        if (!document.querySelector('#fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fall-animation';
            style.textContent = `
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ===== DAYS COUNTER =====
    // Set a meaningful date (when you met or started dating)
    const loveStartDate = new Date('2025-09-01'); // Change this to your actual date
    const today = new Date();
    const timeDiff = today.getTime() - loveStartDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (daysCount) {
        daysCount.textContent = daysDiff > 0 ? daysDiff : 365;
    }
    
    // ===== SHARE BUTTON =====
    const shareBtn = document.createElement('button');
    shareBtn.className = 'control-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    shareBtn.style.background = '#4CAF50';
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'For My Vaishnavi - Valentine\'s Proposal',
                text: 'Check out this Valentine\'s proposal card made with love!',
                url: window.location.href
            });
        } else {
            alert('Copy this link to share: ' + window.location.href);
        }
    });
    
    // Add share button to controls
    document.querySelector('.control-panel').appendChild(shareBtn);
    
    // ===== INITIALIZE =====
    createBackgroundHearts();
    createCardHearts();
    createFloatingHearts();
    loadPhotos();
    
    console.log("💖 Card initialized successfully! Ready for Vaishnavi!");
    console.log("📸 Photo loading initialized");
    console.log("💡 Check console for detailed loading information");
});