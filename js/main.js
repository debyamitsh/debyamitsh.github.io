/**
 * about section tabs
 */
(() => {
    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");
    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            //deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("active", "outer-shadow");
            //activate new 'tab-item'
            event.target.classList.add("active"
                , "outer-shadow");
            
            //deactivate existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            //activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}

/**
 * filter and popup
 */
(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    
    let itemIndex, slideIndex, screenshots;

    /* filter portfolio items */
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") && 
            !event.target.classList.contains("active")) {
            //deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //activate new 'filter item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
       }
    })

    portfolioItemsContainer.addEventListener("click", (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").
                parentElement;
            // get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
                portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // convert screenshots into array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            //popupSlideshow();
            //popupDetails();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle;
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
        document.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // activate loader until the popupImg loaded */
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            //deactivate loader
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        document.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;

    }

    //next slide
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        //popupSlideshow();
    })

    //pre slide
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length+1
        } else {
            slideIndex--;
        }
        //popupSlideshow();
    })

    function popupDetails() {
        //get the project details
        if (!portfolioItems[itemIndex].
            querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        const details = portfolioItems[itemIndex].
            querySelector(".portfolio-item-details").innerHTML;
        //set the project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        //get the project title
        const title = portfolioItems[itemIndex].
            querySelector(".portfolio-item-title").innerHTML;
        //set the prject title
        popup.querySelector(".pp-title h2").innerHTML = title;
        //get the project category
        const category = portfolioItems[itemIndex].
            getAttribute("data-category");
        //set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.
        split("-").join(" ");
        
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if (projectDetailsContainer.classList.contains("active")) {
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.
                scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();

/**
 * testimonial slider
 */
(() => {
    const sliderContainer = document.querySelector(".testi-slider-container"),
        slides = sliderContainer.querySelectorAll(".testi-item");
    slideWidth = sliderContainer.offsetWidth;
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
        nextBtn = document.querySelector(".testi-slider-nav .next");
    activeslide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeslide.parentElement.children).indexOf(activeslide);
    //set width of all slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    //set width of the slide container
    sliderContainer.style.width = slideWidth + slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if (slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slider();
    })

    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }
        slider();
    })

    function slider() {
        //dectivate existing active slides
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // activate new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth - slideIndex) + "px";
    }

    slider();
})();

/*
* hide all sections except active
* */
(() =>{
    console.log("hello");
})();