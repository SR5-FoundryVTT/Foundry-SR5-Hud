import ActorData from './actorData.js'

export default class Hud extends Application {
    constructor() {
        super();
        this.setHooks();
        this.actor = null;
        this.tokenActor = null;
        this.actorData = new ActorData();
    }

    static get defaultOptions() {
        return {
          ...super.defaultOptions,
          id: "sr5hud",
          title: "SR5-Hud",
          template: "modules/sr5-hud/templates/sr-hud.hbs",
          popOut: true,
          top: 632,
          left: 5,
          resizable: false,
          dragDrop: [{dragSelector: null, dropSelector: null}],
          classes: ["sr5-hud"]
        }
      }

    renderTokenHud(html, tokenActor) {
        if(tokenActor.actorLink) {
            html = html[0];
            const button = document.createElement("div");
            button.classList.add("control-icon");
            button.innerHTML = '<i class="fa-duotone fa-street-view"></i>';
            html.querySelector(".col.left").prepend(button);
            button.onclick = (event) => {
               if(this.rendered) {
                this.close();
               }
               else {
                this.updateActor(tokenActor);
                this.render(true);
               }
            };
         }
    }

    activateListeners(html) {
        console.log(html[0])
        let bar = html.find('.actions-bar')
        console.log(bar)
        
        super.activateListeners(html); // Ensure any inherited listeners are also activated.
    
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
        // Toggle functionality for minimizing and expanding elements with animation
        html.find('.fa-minimize').click(() => {
            const actionBar = html.find('.actions-bar');
            const otherElements = html.find('.effects-icons-bar, .avatar');
            const headerBar = html.find('.header-bar');
            const skillSelector = html.find('.skill-list-active');

            // Check if we are currently minimized
        const isMinimized = headerBar.hasClass('sr5-hud-min');

        if (isMinimized) {
            // If so, we're expanding the HUD
            // Animate the header bar back to its original position
            headerBar.animate({
                top: "0px"
            }, 400, 'swing', function() {
                $(this).removeClass('sr5-hud-min').removeAttr('style'); // Remove inline styles after animation

                // Remove the inline style from the skill container as well
                skillSelector.removeAttr('style');
            });

            // Delay the action-bar animation until after the header bar has moved
            setTimeout(() => {
                actionBar.animate({
                    opacity: 1
                }, 400, function() {
                    $(this).removeAttr('style'); // Remove inline styles after animation
                });
            }, 400);

            // Other elements should fade in without delay
            otherElements.animate({
                opacity: 1
            }, 400, function() {
                $(this).removeAttr('style'); // Remove inline styles after animation
            });

        } else {
            // We're minimizing the HUD
            // Fade out all elements, including the action-bar
            actionBar.add(otherElements).animate({
                opacity: 0
            }, 400, 'swing', function() {
                $(this).css('display', 'none'); // Hide after animation
            });

            // Then, move the header bar and adjust the skill container
            setTimeout(() => {
                headerBar.addClass('sr5-hud-min').animate({
                    bottom: "20px"
                }, 400, 'swing');

                // Apply the left style to the skill container only when minimizing
                skillSelector.css({
                    display:'none' 
                });
            }, 100);
        }
    });
}

    updateActor(tokenActor) {
        this.tokenActor = tokenActor;
        this.actor = game.actors.get(tokenActor.actorId);
        this.actorData.actor = this.actor;
        this.actorData.tokenActor = this.tokenActor;
    }

    setHooks() {
        this.hooks = [
            {
                hook: "updateActor",
                fn: this.updateHudActor.bind(this),
            },
            {
                hook: "deleteActiveEffect",
                fn: this.updateHudEffect.bind(this),
            },
            {
                hook: "createActiveEffect",
                fn: this.updateHudEffect.bind(this),
            },
        ];
        for (let hook of this.hooks) {
            hook.id = Hooks.on(hook.hook, hook.fn);
        }
    }

    updateHudActor(actor) {
        if(actor.id === this.actor?.id) {
            console.log("rerendered")
            this.render()
        }
    }

    updateHudEffect(effect) {
        if(effect.parent.id === this.actor?.id) {
            console.log("rerendered")
            this.render()
        }
    }

    removeHooks() {
        for (let hook of this.hooks) {
            Hooks.off(hook.hook, hook.id);
        }
    }

    getData() {
        return this.actorData.actorData;
    }

    async close(...args) {
        this.removeHooks();
        this._closed = true;
        return super.close(...args);
    }
}