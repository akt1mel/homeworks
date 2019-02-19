'use strict';


const sliders = document.querySelector('.slider-nav');
const slides = document.querySelector('.slides');
let currentSlide = slides.firstElementChild;
currentSlide.classList.add('slide-current');



const nextSlide = document.querySelector('[data-action="next"]');
const prevSlide = document.querySelector('[data-action="prev"]');
const lastSlide = document.querySelector('[data-action="last"]');
const firstSlide = document.querySelector('[data-action="first"]');


sliders.addEventListener('click', event => {
    currentSlide.classList.remove('slide-current');
    switch (event.target) {
        case nextSlide:
            currentSlide = currentSlide.nextElementSibling;
            break;
        case prevSlide:
            currentSlide = currentSlide.previousElementSibling;
            break;
        case lastSlide:
            currentSlide = slides.lastElementChild;
            break;
        case firstSlide:
            currentSlide = slides.firstElementChild;
            break;
    }
    currentSlide.classList.add('slide-current');
    updateSlider();
});

updateSlider();

function updateSlider() {
    nextSlide.classList.toggle('disabled', currentSlide.nextElementSibling == null);
    prevSlide.classList.toggle('disabled', currentSlide.previousElementSibling == null);
    lastSlide.classList.toggle('disabled', currentSlide.nextElementSibling == null);
    firstSlide.classList.toggle('disabled', currentSlide.previousElementSibling == null);
}