import ActorData from './actorData.js'

export default class Hud extends Application {
    constructor() {
        super();
        this.setHooks();
    }

    static get defaultOptions() {
        return {
          ...super.defaultOptions,
          id: "sr5hud",
          title: "SR5-Hud",
          template: "modules/sr5-hud/templates/sr-hud.hbs",
          popOut: true,
          top: 500,
          left: 15,
          resizable: true,
          dragDrop: [{dragSelector: null, dropSelector: null}],
          classes: ["sr5-hud"]
        }
      }

    setHooks() {
        this.hooks = [
            {
                hook: "updateActor",
                fn: this.updateHud.bind(this),
            },
            {
                hook: "deleteActiveEffect",
                fn: this.updateHud.bind(this),
            },
            {
                hook: "createActiveEffect",
                fn: this.updateHud.bind(this),
            },
        ];
        for (let hook of this.hooks) {
            hook.id = Hooks.on(hook.hook, hook.fn);
        }
    }

    updateHud() {
        this.render()
    }

    removeHooks() {
        for (let hook of this.hooks) {
            Hooks.off(hook.hook, hook.id);
        }
    }

    getData() {
        let actor = ActorData.getActor()

        let hudData ={
            name: actor.name,
            id: actor.uuid,
            image: ActorData.getImage(actor),
            physTrack: ActorData.getPhysicalTrack(actor),
            stunTrack: ActorData.getStunTrack(actor),
            statuses: ActorData.getStatus(actor)
        };

        return { actor: hudData };
    }

    async close(...args) {
        this.removeHooks();
        this._closed = true;
        return super.close(...args);
    }
}