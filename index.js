// Hamburger menu
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const hamList = document.querySelector('.ham-list');
    const hamListLinks = hamList.querySelectorAll('a');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('is-active');
        hamList.classList.toggle('is-active');
    });

    hamListLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamList.classList.remove('is-active');
            hamburger.classList.remove('is-active');
        });
    });
});


// Carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelectorAll('.carousel .card');
    
    carouselItems.forEach(item => {
        item.addEventListener('click', () => {
            const url = item.getAttribute('data-link');
            if (url) {
                window.location.href = url;
            }
        });
    });

});



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





// Scroll
const about = document.querySelector('#about');
const events = document.querySelector('#events');
const highlights = document.querySelector('#highlights');
const contact = document.querySelector('#contact');
const navLinks = document.querySelectorAll('header .list ul a');

window.onscroll = () => {
    const scrollPosition = window.scrollY+500;
    
    const sections = [
        { section: about, link: navLinks[0] },
        { section: events, link: navLinks[1] },
        { section: highlights, link: navLinks[2] },
        { section: contact, link: navLinks[3] },
    ];
    
    sections.forEach(({ section, link }) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        const offsetBottom = rect.bottom + window.scrollY;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};


// contact

const scriptURL = 'https://script.google.com/macros/s/AKfycby-MZOOfcaqybiTsSEGsOWTePIgVMzjsVNmnntZpAuKcnDz5cqJA1o3uX4Ga9O_M8fn/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
});

// loader
document.querySelector('.contact-form').addEventListener('submit', function(event) {
    document.querySelector('.loader-wrapper').style.display = 'flex';
});