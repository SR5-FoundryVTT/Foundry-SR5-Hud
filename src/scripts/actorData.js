
export default class ActorData{

    static getActor() {
        return ui.SR5HUD.actor ?? game.user.character;
    }

    static getActorData() {
        let actor = ActorData.getActor();
        return {
            actor: {
                name: actor.name,
                id: actor.uuid,
                image: ActorData.getImage(actor),
                physTrack: ActorData.getPhysicalTrack(actor),
                stunTrack: ActorData.getStunTrack(actor),
                statuses: ActorData.getStatus(actor),
            },
            weapons: ActorData.getWeapons(actor),
            spells: ActorData.getSpells(actor),
            adeptPowers: ActorData.getAdeptPowers(actor),
            actions: ActorData.getActions(actor)
        }
    }

    static getPhysicalTrack(actor) {
        return actor?.system.track?.physical
    }

    static getStunTrack(actor) {
        return actor?.system.track?.stun
    }

    static getStatus(actor) {
        let statusIds = actor?.statuses ?? []
        
        let status = [];
        statusIds.forEach(search => {
            let statusEffect = CONFIG.statusEffects.filter(effect => effect.id == search)[0]
            status.push({
                name: statusEffect.name,
                img: statusEffect.icon
            })
        });
        return status;
    }

    static getImage(actor) {
        return actor?.img ?? "icons/svg/mystery-man.svg"
    }

    static getWeapons(actor) {
        return actor.items.filter(item => item.type == "weapon").filter(weapon => weapon.system.technology.equipped)
    }

    static getSpells(actor) {
        let unsorted = actor.items.filter(item => item.type == "spell")

        let spells = {
            combat: unsorted.filter(spell => spell.system.category === "combat"),
            detection: unsorted.filter(spell => spell.system.category === "detection"),
            manipulation: unsorted.filter(spell => spell.system.category === "manipulation"),
            illusion: unsorted.filter(spell => spell.system.category === "illusion"),
            health: unsorted.filter(spell => spell.system.category === "health")
        }
        return spells;
    }

    static getAdeptPowers(actor) {
        return actor.items.filter(item => item.type == "adept_power").filter(power => power.system.type != "passive")
    }

    static getActions(actor) {
        return actor.items.filter(item => item.type == "action")
    }

}