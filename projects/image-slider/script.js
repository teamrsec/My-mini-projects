const slides = [
    { src: 'https://picsum.photos/id/1015/800/500', caption: 'Mountains' },
    { src: 'https://picsum.photos/id/201/800/500', caption: 'Forest' },
    { src: 'https://picsum.photos/id/29/800/500', caption: 'Ocean' }
];

let currentIndex = 0;
const slidesContainer = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderSlides() {
    slidesContainer.innerHTML = '';
    slides.forEach((slide, i) => {
        const div = document.createElement('div');
        div.className = 'slide';
        div.style.backgroundImage = `url(${slide.src})`;
        div.textContent = slide.caption;
        slidesContainer.appendChild(div);
    });
    
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    currentIndex = index;
    const slideWidth = slidesContainer.offsetWidth;
    slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    renderSlides();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
setInterval(() => {
    nextSlide();
}, 4000);

// Initial
renderSlides();