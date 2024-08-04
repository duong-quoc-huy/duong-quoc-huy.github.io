// scripts.js

// Smooth scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize Bootstrap carousel for testimonials
const testimonialCarousel = document.getElementById('testimonialCarousel');
new bootstrap.Carousel(testimonialCarousel, {
    interval: 5000,
    wrap: true
});

// Add dynamic typing effect in hero section
const typedText = document.querySelector('.lead');
const phrases = ["Full Stack Developer", "UI/UX Designer", "Tech Enthusiast"];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
    isEnd = false;
    typedText.textContent = currentPhrase.join("");

    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
            typedText.textContent = currentPhrase.join("");
        }

        if (isDeleting && j <= phrases[i].length) {
            currentPhrase.pop(phrases[i][j]);
            j--;
            typedText.textContent = currentPhrase.join("");
        }

        if (j == phrases[i].length) {
            isEnd = true;
            isDeleting = true;
        }

        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
            if (i === phrases.length) {
                i = 0;
            }
        }
    }
    const typingSpeed = isEnd ? 2000 : isDeleting ? 100 : 200;
    setTimeout(loop, typingSpeed);
}

loop();
