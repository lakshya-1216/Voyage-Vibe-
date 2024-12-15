// Smooth scrolling for internal links
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

// Responsive menu toggle (for smaller screens)
const navToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Search bar validation
const searchForm = document.querySelector('.search-container');
if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        const searchInput = this.querySelector('.search-input');
        if (!searchInput.value.trim()) {
            e.preventDefault();
            alert('Please enter a search term.');
        }
    });
}

// Highlight navigation item based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

let timeout;
window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100); // Debounce time
});

// Add hover effect for social media icons
const socialIcons = document.querySelectorAll('#social-media a');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.color = '#007bff';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.color = '#000';
    });
});

// Form interaction for Travel Form
const travelForm = document.querySelector('.travel-form');
if (travelForm) {
    travelForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for submitting your details! We will get back to you soon.');
    });
};

// Login Button Functionality
document.getElementById("loginBtn").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in both username and password.");
    } else {
        // Simulate successful login or integrate with your backend
        alert(`Welcome back, ${username}!`);
        // Redirect to a dashboard or home page after login
        window.location.href = "index.html"; // Replace with your actual login redirection URL
    }
});

// Signup Button Functionality
document.getElementById("signupBtn").addEventListener("click", function () {
    // Redirect to the Signup Page
    window.location.href = "signUp.html";
});
