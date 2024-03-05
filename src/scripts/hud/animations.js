
export default class Animations {
    constructor() {
        this.animationTime = 400;
    }

    animateMinimize(headerBar, actionBar, skillSelector, otherElements) {
        // We're minimizing the HUD
        // Fade out all elements, including the action-bar
        actionBar.add(otherElements).animate({
            opacity: 0
        }, this.animationTime, 'swing', function() {
            $(this).css('display', 'none'); // Hide after animation
        });

        // Then, move the header bar and adjust the skill container
        setTimeout(() => {
            headerBar.addClass('sr5-hud-min').animate({
                bottom: "20px"
            }, this.animationTime, 'swing');

            // Apply the left style to the skill container only when minimizing
            skillSelector.css({
                display:'none' 
            });
        }, 100);
    }

    animateMaximize(headerBar, actionBar, skillSelector, otherElements) {
        // If so, we're expanding the HUD
        // Animate the header bar back to its original position
        headerBar.animate({
            top: "0px"
        }, this.animationTime, 'swing', function() {
            $(this).removeClass('sr5-hud-min').removeAttr('style'); // Remove inline styles after animation
        
            // Remove the inline style from the skill container as well
            skillSelector.removeAttr('style');
        });
    
        // Delay the action-bar animation until after the header bar has moved
        setTimeout(() => {
            actionBar.animate({
                opacity: 1
            }, this.animationTime, function() {
                $(this).removeAttr('style'); // Remove inline styles after animation
            });
        }, this.animationTime);
    
        // Other elements should fade in without delay
        otherElements.animate({
            opacity: 1
        }, this.animationTime, function() {
            $(this).removeAttr('style'); // Remove inline styles after animation
        });
    }
}