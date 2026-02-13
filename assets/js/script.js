const ganadores = [
    { nombre: "@juan***", juego: "Aviator", monto: "$85.000 CLP" },
    { nombre: "@andre_x", juego: "Gates of Olympus", monto: "$120.500 CLP" },
    { nombre: "@carlosG", juego: "Sweet Bonanza", monto: "$45.000 CLP" },
    { nombre: "@ana.pau", juego: "Aviator", monto: "$210.000 CLP" },
    { nombre: "@luis_99", juego: "Mines", monto: "$60.000 CLP" },
    { nombre: "@fer.nanda", juego: "Lucky Jet", monto: "$150.000 CLP" }
];

const tickerText = document.getElementById('ticker-text');

function updateTicker() {
    if (!tickerText) return;

    // Fade out
    tickerText.classList.add('fade-out');

    setTimeout(() => {
        // Pick random winner
        const ganador = ganadores[Math.floor(Math.random() * ganadores.length)];

        // Update text content
        tickerText.innerHTML = `Ganancia reciente en <span class="text-brand-accent font-bold">${ganador.juego}</span>: <span class="text-white font-bold">${ganador.monto}</span> por usuario <span class="text-slate-400">${ganador.nombre}</span>`;

        // Fade in
        tickerText.classList.remove('fade-out');
    }, 500); // Wait for fade out to complete (0.5s match CSS)
}

// Start interval every 3.5 seconds
setInterval(updateTicker, 3500);

// Background Carousel - Curated Pairs
const imagePairs = [
    ['assets/img/starlight.jfif', 'assets/img/Gates-of-Olymps.png'],
    ['assets/img/starlight-n.jfif', 'assets/img/gates.jfif'],
    ['assets/img/5-Lions-Megaways.png', 'assets/img/Beast-Mode.png'],
    ['assets/img/Fire-Hopper.png', 'assets/img/pizzapizza.jfif'],
    ['assets/img/5645_0.jpg', 'assets/img/images.jpg']
];

let currentPairIndex = 0;

// Preload Images for Performance
function preloadImages() {
    imagePairs.forEach(pair => {
        pair.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
    console.log('Background images preloaded.');
}

// Robust Copy Logic
function copiarCodigo(textoCodigo) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textoCodigo).then(showFeedback).catch(err => {
            console.error('Clipboard copy failed:', err);
            fallbackCopy(textoCodigo);
        });
    } else {
        fallbackCopy(textoCodigo);
    }
}

function fallbackCopy(text) {
    // Fallback for older browsers
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showFeedback();
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }
}

function showFeedback() {
    const feedback = document.getElementById('copy-feedback');
    if (feedback) {
        feedback.classList.remove('opacity-0');
        setTimeout(() => {
            feedback.classList.add('opacity-0');
        }, 2000);
    }
}

function initCarousel() {
    const bgLeft = document.getElementById('bg-left');
    const bgRight = document.getElementById('bg-right');

    if (!bgLeft || !bgRight) return;

    try {
        // Set initial sources
        const [initialLeft, initialRight] = imagePairs[0];
        bgLeft.src = initialLeft;
        bgRight.src = initialRight;

        setInterval(() => {
            // Fade out
            bgLeft.classList.add('opacity-0');
            bgRight.classList.add('opacity-0');

            setTimeout(() => {
                // Update index
                currentPairIndex = (currentPairIndex + 1) % imagePairs.length;

                // Get new pair
                const [nextLeft, nextRight] = imagePairs[currentPairIndex];

                // Update Sources
                bgLeft.src = nextLeft;
                bgRight.src = nextRight;

                // Trigger reflow force
                void bgLeft.offsetWidth;
                void bgRight.offsetWidth;

                // Fade in
                bgLeft.classList.remove('opacity-0');
                bgRight.classList.remove('opacity-0');
            }, 1000);

        }, 6500);
    } catch (e) {
        console.error("Carousel error:", e);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initCarousel();
});
