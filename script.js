// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll-triggered animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const animationType = target.dataset.animation;
                const animationDelay = target.dataset.delay || '0s';

                // Apply the animation class and delay
                target.style.animationDelay = animationDelay;
                target.classList.add(`animate-${animationType}`);

                // Stop observing once the animation has been triggered
                observer.unobserve(target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements that should be observed for animation
    const elementsToAnimate = document.querySelectorAll('.observer-target');
    elementsToAnimate.forEach(element => {
        // Initially hide elements that will be animated on scroll
        // This prevents them from flashing before the observer kicks in
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)'; // Default for fade-in-up
        if (element.dataset.animation === 'slide-in-left') {
            element.style.transform = 'translateX(-50px)';
        } else if (element.dataset.animation === 'slide-in-right') {
            element.style.transform = 'translateX(50px)';
        } else if (element.dataset.animation === 'scale-in') {
            element.style.transform = 'scale(0.9)';
        }
        observer.observe(element);
    });

    // Typewriter effect for hero text - Dynamic phrases
    const typewriterTextElement = document.getElementById('typewriter-text');
    const phrases = [
        "An ever-evolving developer.",
        "A passionate coder.",
        "A strategic chess enthusiast.",
        "A creative writer.",
        "An innovative problem-solver."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    const typingSpeed = 50; // Speed of typing each character
    const phraseDisplayTime = 2000; // Time to display each phrase before erasing (2 seconds)
    const eraseSpeed = 30; // Speed of erasing each character

    function typePhrase() {
        const currentPhrase = phrases[phraseIndex];
        if (charIndex < currentPhrase.length) {
            typewriterTextElement.textContent += currentPhrase.charAt(charIndex);
            charIndex++;
            setTimeout(typePhrase, typingSpeed);
        } else {
            // Phrase fully typed, now wait and then start erasing
            typewriterTextElement.style.borderRight = '2px solid white'; // Keep cursor visible
            setTimeout(erasePhrase, phraseDisplayTime);
        }
    }

    function erasePhrase() {
        const currentPhrase = phrases[phraseIndex];
        if (charIndex > 0) {
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erasePhrase, eraseSpeed);
        } else {
            // Phrase fully erased, move to next phrase
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typewriterTextElement.textContent = ''; // Ensure it's empty
            typewriterTextElement.style.borderRight = '2px solid white'; // Ensure cursor is visible before typing next
            setTimeout(typePhrase, typingSpeed); // Start typing next phrase
        }
    }

    // Start the typing sequence
    setTimeout(typePhrase, 1000); // Initial delay before first phrase starts typing

    // Back to Top Button Logic
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Simple Parallax Effect for Hero Background
    const heroSection = document.getElementById('hero-section');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        // Adjust the multiplier for more or less parallax effect
        heroSection.style.backgroundPositionY = -scrollPosition * 0.2 + 'px';
    });
});
