import Animations from './animations.js';

export default class ElementFunctions {
    constructor() {
        this.animations = new Animations();
    }

    toggleCheckboxes(html) {
        // Setup the toggle functionality for checkboxes
        const checkboxes = html.find('.sr5-hud-checkbox'); // Adjust the selector as needed for your checkboxes.
    
        checkboxes.on('click', (event) => {
            const currentCheckbox = event.currentTarget;
    
            // If the clicked checkbox is already checked, uncheck it.
            if (currentCheckbox.checked && currentCheckbox.dataset.checked === "true") {
                currentCheckbox.checked = false;
                currentCheckbox.dataset.checked = "false";
                return; // Exit the function early as we've unchecked the box.
            }
    
            // Loop through all checkboxes to enforce that only the clicked checkbox is checked.
            checkboxes.each((_, checkbox) => {
                if (checkbox === currentCheckbox) {
                    checkbox.dataset.checked = "true";
                } else {
                    checkbox.checked = false;
                    checkbox.dataset.checked = "false";
                }
            });
        });
    }

    minimizeMaximize(html) {
        // Toggle functionality for minimizing and expanding elements with animation
        html.find('.fa-minimize').click(() => {
            const actionBar = html.find('.actions-bar');
            const otherElements = html.find('.effects-icons-bar, .avatar');
            const headerBar = html.find('.header-bar');
            const skillSelector = html.find('.skill-list-active');

            // Check if we are currently minimized
            const isMinimized = headerBar.hasClass('sr5-hud-min');

            if (isMinimized) {
                this.animations.animateMaximize(headerBar, actionBar, skillSelector, otherElements)

            } else {
                this.animations.animateMinimize(headerBar, actionBar, skillSelector, otherElements)
            }
        });
    }
}