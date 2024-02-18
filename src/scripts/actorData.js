
export default class ActorData{

    static getActor() {
        return ui.SR5HUD.actor;
    }

    static getTokenActor() {
        return ui.SR5HUD.tokenActor;
    }

    static getActorData() {
        let actor = ActorData.getActor();
        return {
            actor: {
                name: actor.name,
                id: actor.uuid,
                image: ActorData.getImage(actor),
                physTrack: ActorData.getPhysicalTrack(),
                stunTrack: ActorData.getStunTrack(),
                statuses: ActorData.getStatus(),
            },
            data: {
                skills: ActorData.getSkills(actor),
                weapons: ActorData.getWeapons(actor),
                spells: ActorData.getSpells(actor),
                adeptPowers: ActorData.getAdeptPowers(actor),
                actions: ActorData.getActions(actor)
            }
        }
    }

    static getPhysicalTrack() {
        if(ActorData.getTokenActor().actorLink) {
            return ActorData.getActor()?.system.track?.physical
        }
        if(!ActorData.getTokenActor().actorLink) {
            return ActorData.getTokenActor()?.delta.system.track?.physical ?? {value: 0}
        }
    }

    static getStunTrack() {
        if(ActorData.getTokenActor().actorLink) {
            return ActorData.getActor()?.system.track?.stun
        }
        if(!ActorData.getTokenActor().actorLink) {
            return ActorData.getTokenActor()?.delta.system.track?.stun ?? {value: 0}
        }
    }

    static getStatus(actor) {
        let statusIds;
        if(ActorData.getTokenActor().actorLink) {
            statusIds = ActorData.getActor()?.statuses ?? []
        }
        if(!ActorData.getTokenActor().actorLink) {
            statusIds = ActorData.getTokenActor()?.delta.statuses ?? []
        }
        
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

    static getSkills(actor) {
        let skills = {
            ...actor.system.skills.active,
            ...actor.system.skills.knowledge,
            ...actor.system.skills.language,
        }

        let skillsWithRating = [];
        for (var skill in skills) {
            if(skills[skill].value > 0) {
                skillsWithRating.push({
                    [skill]: skills[skill]
                })
            }
         }

         return skillsWithRating
    }

}