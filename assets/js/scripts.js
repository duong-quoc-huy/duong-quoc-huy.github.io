// Wait for DOM and all dependencies to load
document.addEventListener('DOMContentLoaded', function() {
	// Initialize AOS only after it's loaded
	if (typeof AOS !== 'undefined') {
		AOS.init({
			duration: 800,         
			once: true,             
			offset: 100,            
			easing: 'ease-in-out',  
			disable: false,        
			startEvent: 'DOMContentLoaded'
		});
	}

	// Loading Screen
	const loadingOverlay = document.getElementById('loadingOverlay');
	if (loadingOverlay) {
		setTimeout(() => {
			loadingOverlay.classList.add('hidden');
		}, 1000);
	}

	// Typing Effect
	const texts = [
		"I Am Able to Create Responsive, High-Quality Websites and Applications",
		"Full-Stack Developer with Modern Technologies",
		"Passionate About Clean Code and User Experience"
	];
	let textIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typingSpeed = 100;

	function typeWriter() {
		const typedTextElement = document.getElementById('typed-text');
		if (!typedTextElement) return;

		const currentText = texts[textIndex];

		if (isDeleting) {
			typedTextElement.textContent = currentText.substring(0, charIndex - 1);
			charIndex--;
			typingSpeed = 50;
		} else {
			typedTextElement.textContent = currentText.substring(0, charIndex + 1);
			charIndex++;
			typingSpeed = 100;
		}

		if (!isDeleting && charIndex === currentText.length) {
			isDeleting = true;
			typingSpeed = 2000;
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			textIndex = (textIndex + 1) % texts.length;
		}

		setTimeout(typeWriter, typingSpeed);
	}

	// Start typing effect
	setTimeout(typeWriter, 1500);

	// Back to Top Button
	const backToTopButton = document.getElementById('backToTop');
	
	if (backToTopButton) {
		window.addEventListener('scroll', function() {
			if (window.pageYOffset > 300) {
				backToTopButton.classList.add('show');
			} else {
				backToTopButton.classList.remove('show');
			}
		});

		backToTopButton.addEventListener('click', function() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	// Smooth Navigation
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
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

	// Contact Form Enhancement
	const form = document.getElementById('contactForm');
	if (form) {
		const inputs = form.querySelectorAll('.form-control-modern');
		const emailInput = form.querySelector('input[name="email"]'); // Adjust selector if needed
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

		form.addEventListener('submit', async function(e) {
			e.preventDefault();

			let isValid = true;
			inputs.forEach(input => {
				if (!input.value.trim()) {
					input.style.borderColor = '#e53e3e';
					isValid = false;
				} else {
					input.style.borderColor = '#e2e8f0';
				}
			});

			// Specific email validation
			if (emailInput && !emailRegex.test(emailInput.value.trim())) {
				emailInput.style.borderColor = '#e53e3e';
				isValid = false;
				if (typeof Swal !== 'undefined') {
					Swal.fire({
						icon: 'error',
						title: 'Invalid Email',
						text: 'Please enter a valid email address.',
						confirmButtonColor: '#3085d6',
					});
				} else {
					alert('Please enter a valid email address.');
				}
				return;
			}

			if (!isValid) {
				if (typeof Swal !== 'undefined') {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Please fill in all fields.',
						confirmButtonColor: '#3085d6',
					});
				} else {
					alert('Please fill in all fields.');
				}
				return;
			}

			try {
				const response = await fetch(form.action, {
					method: 'POST',
					body: new FormData(form),
					headers: { 'Accept': 'application/json' }
				});

				if (response.ok) {
					form.reset();
					if (typeof Swal !== 'undefined') {
						Swal.fire({
							icon: 'success',
							title: 'Success!',
							text: 'Thank you! Your message has been sent successfully.',
							confirmButtonColor: '#3085d6',
						});
					} else {
						alert('Thank you! Your message has been sent successfully.');
					}
				} else {
					const data = await response.json();
					console.log('Server response:', data); // Debug the response
					if (typeof Swal !== 'undefined') {
						Swal.fire({
							icon: 'error',
							title: 'Submission Failed',
							text: data.errors?.map(x => x.message).join('\n') || data.error || data.message || 'Submission failed.',
							confirmButtonColor: '#3085d6',
						});
					} else {
						alert(data.errors?.map(x => x.message).join('\n') || data.error || data.message || 'Submission failed.');
					}
				}
			} catch (err) {
				if (typeof Swal !== 'undefined') {
					Swal.fire({
						icon: 'error',
						title: 'Network Error',
						text: 'Network error. Please try again later.',
						confirmButtonColor: '#3085d6',
					});
				} else {
					alert('Network error. Please try again later.');
				}
			}
		});

		inputs.forEach(input => {
			input.addEventListener('focus', function() {
				this.style.borderColor = 'var(--primary-color)';
			});

			input.addEventListener('blur', function() {
				if (!this.value) {
					this.style.borderColor = '#e2e8f0';
				}
			});
		});
	}

	// Skill items animation on hover
	document.querySelectorAll('.skill-item').forEach(item => {
		item.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-10px) scale(1.05)';
		});

		item.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1)';
		});
	});

	// Project cards enhanced interaction
	document.querySelectorAll('.project-card').forEach(card => {
		card.addEventListener('mouseenter', function() {
			const overlay = this.querySelector('.project-overlay');
			if (overlay) overlay.style.opacity = '1';
		});

		card.addEventListener('mouseleave', function() {
			const overlay = this.querySelector('.project-overlay');
			if (overlay) overlay.style.opacity = '0';
		});
	});

	// Timeline animation on scroll
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const timelineObserver = new IntersectionObserver(function(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	document.querySelectorAll('.timeline-item').forEach(item => {
		item.style.opacity = '0';
		item.style.transform = 'translateY(50px)';
		item.style.transition = 'all 0.6s ease';
		timelineObserver.observe(item);
	});
});

// Functions that need to be in global scope
function myMenuFunction(){
	var menuBtn = document.getElementById("myNavMenu");
	if(menuBtn.className === "nav-menu"){
		menuBtn.className += " responsive";
	} else {
		menuBtn.className = "nav-menu";
	}
}

// Navigation shadow on scroll
window.onscroll = function() {headerShadow()};

function headerShadow() {
	const navHeader = document.getElementById("header");
	if (!navHeader) return;

	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
		navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
		navHeader.style.height = "70px";
		navHeader.style.lineHeight = "70px";
	} else {
		navHeader.style.boxShadow = "none";
		navHeader.style.height = "90px";
		navHeader.style.lineHeight = "90px";
	}
}

// Active link functionality
window.addEventListener('load', function() {
	const sections = document.querySelectorAll('section[id]');

	function scrollActive() {
		const scrollY = window.scrollY;

		sections.forEach(current => {
			const sectionHeight = current.offsetHeight;
			const sectionTop = current.offsetTop - 50;
			const sectionId = current.getAttribute('id');

			const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']') || 
						document.querySelector('a[href*=' + sectionId + ']');
			
			if (link) {
				if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
					link.classList.add('active-link');
				} else {
					link.classList.remove('active-link');
				}
			}
		});
	}

	window.addEventListener('scroll', scrollActive);
});