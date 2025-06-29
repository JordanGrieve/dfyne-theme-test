/* * Swatch Carousel JavaScript
 * This script handles the functionality of a swatch carousel, allowing users to scroll through swatches,
 * highlight selected swatches, and ensure the selected swatch is visible in the carousel.
 */
document.addEventListener('DOMContentLoaded', () => {
  setupAllSwatchCarousels();
  highlightSelectedSwatch();
  scrollSwatchIntoView();
  initSwatchScrollListeners();
});

/* * Setup all swatch carousels
 * This function initializes each swatch carousel, setting up the scroll behavior and arrow visibility.
 */
function setupAllSwatchCarousels() {
  const wrappers = document.querySelectorAll('.swatch-carousel-wrapper');

  wrappers.forEach((wrapper) => {
    /* Get the carousel, left arrow, right arrow, and swatch item elements. */
    const carousel = wrapper.querySelector('.swatch-carousel');
    const left = wrapper.querySelector('.carousel-arrow--left');
    const right = wrapper.querySelector('.carousel-arrow--right');
    const swatchItem = wrapper.querySelector('.swatch-item');
    /* Calculate the scroll distance based on the width of the swatch item. */
    const ITEMS_TO_SCROLL = 4;
    /* If swatchItem is not found, default to a fixed width of 264px. */
    const SCROLL_DISTANCE = swatchItem ? swatchItem.offsetWidth * ITEMS_TO_SCROLL : 264;

    if (!carousel) return;

    /* Function to update the visibility of the left and right arrows based on scroll position. */
    /* This function checks the current scroll position and adjusts the display of the arrows accordingly. */
    const updateArrowVisibility = () => {
      const scrollLeft = carousel.scrollLeft;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const OFFSET = 5;

      if (left) left.style.display = scrollLeft > OFFSET ? 'flex' : 'none';
      if (right) right.style.display = scrollLeft < maxScrollLeft - OFFSET ? 'flex' : 'none';
    };

    /* Remove existing event listeners to prevent duplicates */
    carousel.removeEventListener('scroll', wrapper._scrollHandler);
    left?.removeEventListener('click', wrapper._leftClickHandler);
    right?.removeEventListener('click', wrapper._rightClickHandler);

    /* Attach new event listeners to handle scrolling and arrow clicks */
    wrapper._scrollHandler = () => setTimeout(updateArrowVisibility, 100);
    wrapper._leftClickHandler = () => {
      carousel.scrollBy({ left: -SCROLL_DISTANCE, behavior: 'smooth' });
      setTimeout(updateArrowVisibility, 400);
    };
    wrapper._rightClickHandler = () => {
      carousel.scrollBy({ left: SCROLL_DISTANCE, behavior: 'smooth' });
      setTimeout(updateArrowVisibility, 400);
    };

    /* Bind the scroll and click handlers to the carousel and arrows */
    carousel.addEventListener('scroll', wrapper._scrollHandler);
    left?.addEventListener('click', wrapper._leftClickHandler);
    right?.addEventListener('click', wrapper._rightClickHandler);
    window.addEventListener('resize', updateArrowVisibility);

    /* Initial visibility check for arrows */
    setTimeout(updateArrowVisibility, 10);
  });
}

/* * Highlight Selected Swatch
 * This function adds an event listener to each swatch label to highlight the selected swatch.
 * When a swatch label is clicked, it removes the active class from all labels and adds it to the clicked one.
 */
function highlightSelectedSwatch() {
  document.querySelectorAll('.swatch-label').forEach((label) => {
    label.addEventListener('click', function () {
      document.querySelectorAll('.swatch-label-text').forEach((el) => {
        el.classList.remove('swatch-label--active');
      });
      /* Add the active class to the clicked label's text */
      const labelText = label.querySelector('.swatch-label-text');
      if (labelText) {
        labelText.classList.add('swatch-label--active');
      }
    });
  });
}

/* * Scroll Swatch Into View */
function scrollSwatchIntoView() {
  /* * This function scrolls the currently selected swatch into view within the carousel.
   * It finds the active swatch label and scrolls it into view smoothly.
   */
  if (!document.querySelector('.swatch-carousel')) return;
  const selected = document.querySelector('.swatch-label--active');
  const carousel = document.querySelector('.swatch-carousel');
  /* If no selected swatch or carousel found, exit early */
  if (selected && carousel) {
    selected.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });

    /* Update arrow visibility after scrolling */
    setTimeout(updateAllArrowVisibility, 400);
  }
}

/* * Update All Arrow Visibility */
function updateAllArrowVisibility() {
  const wrappers = document.querySelectorAll('.swatch-carousel-wrapper');

  wrappers.forEach((wrapper) => {
    const carousel = wrapper.querySelector('.swatch-carousel');
    const left = wrapper.querySelector('.carousel-arrow--left');
    const right = wrapper.querySelector('.carousel-arrow--right');
    const OFFSET = 5;

    if (!carousel) return;

    const scrollLeft = carousel.scrollLeft;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

    if (left) left.style.display = scrollLeft > OFFSET ? 'flex' : 'none';
    if (right) right.style.display = scrollLeft < maxScrollLeft - OFFSET ? 'flex' : 'none';
  });
}
/* * Initialize Swatch Scroll Listeners
 * This function sets up event listeners on swatch inputs to scroll the selected swatch into view
 * when the input changes (e.g., when a user selects a different variant).
 */
function initSwatchScrollListeners() {
  const inputs = document.querySelectorAll('.swatch-input__input');
  inputs.forEach((input) => {
    input.removeEventListener('change', scrollSwatchIntoView);
    input.addEventListener('change', () => {
      setTimeout(scrollSwatchIntoView, 50);
    });
  });
}

/* * Mutation Observer
 * This observer watches for changes in the DOM, such as when new swatch carousels are added,
 * and rebinds the necessary event listeners and functionality.
 */
const observer = new MutationObserver(() => {
  setupAllSwatchCarousels(); /* Rebind arrows */
  highlightSelectedSwatch(); /* Rebind active label clicks */
  initSwatchScrollListeners(); /* Rebind scroll on change */
  scrollSwatchIntoView(); /* Scroll to active on load */
});

/* Start observing the document body for changes */
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
