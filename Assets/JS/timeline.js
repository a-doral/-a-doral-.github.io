// timeline.js - Reveal timeline cards on scroll

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.animate-timeline-in');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
    const upperThreshold = windowHeight * 0.15;
    const lowerThreshold = windowHeight * 0.75;
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardTop = rect.top;
            const cardBottom = rect.bottom;
            // Reveal when card is within middle 80% of viewport, delay disappearance
            if (cardBottom > upperThreshold && cardTop < lowerThreshold) {
                card.classList.add('timeline-visible');
            } else {
                card.classList.remove('timeline-visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});
