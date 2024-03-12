import ActorData from '../data/actorData.js'
import ElementFunctions from './elementFunctions.js';

export default class Hud extends Application {
    constructor() {
        super();
        this.setHooks();
        this.actor = null;
        this.tokenActor = null;
        this.actorData = new ActorData();
        
        this.elementFunctions = new ElementFunctions();
    }

    static get defaultOptions() {
        return {
          ...super.defaultOptions,
          id: "sr5hud",
          title: "SR5-Hud",
          template: "modules/sr5-hud/templates/sr-hud.hbs",
          popOut: true,
          bottom: 380,
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

        this.elementFunctions.toggleCheckboxes(html);
        this.elementFunctions.minimizeMaximize(html)
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