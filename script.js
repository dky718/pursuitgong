document.addEventListener('DOMContentLoaded', () => {
    const gong = document.getElementById('gong');
    const gongSound = document.getElementById('gongSound');
    const soundToggle = document.getElementById('soundToggle');
    const confettiCanvas = document.getElementById('confetti-canvas');
    let confettiInterval = null;
    let confettiInstance = window.confetti.create(confettiCanvas, { resize: true, useWorker: true });

    // Remove .slowing-down after animation ends
    gong.addEventListener('animationend', (e) => {
        if (e.animationName === 'slowDown') {
            gong.classList.remove('slowing-down');
        }
    });

    // Function to start confetti
    function startConfetti() {
        stopConfetti(); // Always clear any previous interval
        confettiInterval = setInterval(() => {
            confettiInstance({
                particleCount: 5,
                angle: 90,
                spread: 120,
                origin: { x: Math.random(), y: 0 },
                gravity: 4.0,
                ticks: 400,
                startVelocity: 30,
                colors: ['#FFD700', '#FF0000', '#00FF00', '#0000FF', '#FF69B4', '#00FFFF'],
                scalar: 1.5
            });
        }, 50);
    }

    // Function to stop confetti
    function stopConfetti() {
        if (confettiInterval) {
            clearInterval(confettiInterval);
            confettiInterval = null;
        }
    }

    // Play gong sound and start confetti when clicked
    gong.addEventListener('click', () => {
        // Always reset sound and animation
        gongSound.currentTime = 0;
        gongSound.play().catch(() => {});
        gong.classList.remove('slowing-down');
        gong.classList.remove('wiggling');
        // Force reflow to restart animation
        void gong.offsetWidth;
        gong.classList.add('wiggling');
        // Start confetti
        startConfetti();
    });

    // Stop wiggling and confetti when sound ends
    gongSound.addEventListener('ended', () => {
        gong.classList.remove('wiggling');
        gong.classList.add('slowing-down');
        stopConfetti();
    });

    // Stop button: stop all effects, but do not block future gong hits
    soundToggle.addEventListener('click', () => {
        gongSound.pause();
        gongSound.currentTime = 0;
        gong.classList.remove('wiggling');
        gong.classList.add('slowing-down');
        stopConfetti();
    });

    // Set copyright year dynamically
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Sidebar menu logic
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
        sidebarOverlay.classList.add('opacity-100', 'pointer-events-auto');
        sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
    }
    function closeSidebarMenu() {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        sidebarOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
    }

    hamburger.addEventListener('click', openSidebar);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openSidebar();
    });
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);
}); 