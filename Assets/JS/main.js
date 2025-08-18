// main.js - Custom JS for your portfolio site
// Add interactivity here if needed

// Example: Smooth scroll for navigation links

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash) {
                e.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70, // adjust for navbar height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
