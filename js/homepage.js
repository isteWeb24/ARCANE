/*Hamburger menu */

const ham_button = document.querySelector('.hamburger');
const ham_menu = document.querySelector('.ham-list');

ham_button.addEventListener('click', function(){
    ham_button.classList.toggle('is-active');
    ham_menu.classList.toggle('is-active');
});




/*carousel */

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth + 18;
const arrowBtns = document.querySelectorAll(".wrapper .fa-angle-left, .wrapper .fa-angle-right");
const carouselChildren = [...carousel.children];
const scrollInfoBar = document.querySelector('.scroll-info-bar');

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

const updateCarousel = () => {
    carouselChildren.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildren.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
};

const handleArrowClick = (btn) => {
    carousel.scrollLeft += btn.classList.contains("fa-angle-left") ? -firstCardWidth : firstCardWidth;
    updateScrollInfoBar();
};

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => handleArrowClick(btn));
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX);
    carousel.scrollLeft = startScrollLeft - walk;
    updateScrollInfoBar();
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

const updateScrollInfoBar = () => {
    const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
    const scrollLeft = carousel.scrollLeft;
    const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;
    scrollInfoBar.style.width = `${scrollPercentage}%`;
};

const autoPlay = () => {
    if (!isAutoPlay) return;
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
        updateScrollInfoBar();
    }, 2500);
};

updateCarousel();
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

carousel.addEventListener("scroll", () => {
    infiniteScroll();
    updateScrollInfoBar();
});
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

