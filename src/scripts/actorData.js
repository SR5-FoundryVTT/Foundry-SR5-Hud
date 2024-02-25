
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
                actions: ActorData.getActions(actor),
                contacts: ActorData.getContacts(actor),
                qualitys: ActorData.getQualitys(actor),
                /*matrixs: ActorData.getMatrix(actor)*/
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
        let unsorted = actor.items.filter(item => item.type == "weapon" && item.system.technology.equipped);

        let weapons = {
            rangedWeapons: unsorted.filter(weapon => weapon.system.action.test === "RangedAttackTest"),
            meleeWeapons: unsorted.filter(weapon => weapon.system.action.test === "MeleeAttackTest")
        };
        return weapons;
    }

    static getSpells(actor) {
        let unsorted = actor.items.filter(item => item.type == "spell");
    
        let spells = {
            combat: unsorted.filter(spell => spell.system.category === "combat"),
            detection: unsorted.filter(spell => spell.system.category === "detection"),
            manipulation: unsorted.filter(spell => spell.system.category === "manipulation"),
            illusion: unsorted.filter(spell => spell.system.category === "illusion"),
            health: unsorted.filter(spell => spell.system.category === "health"),
            // Directly compute hasSpells based on the presence of spells in any category
            hasSpells: false // Default to false, will update next
        };
    
        // Update hasSpells based on the presence of spells in any category
        spells.hasSpells = Object.values(spells).some(category => Array.isArray(category) && category.length > 0);
    
        return spells;
    }
    static getContacts(actor) {
        return actor.items.filter(item => item.type == "contact")
    }
    static getQualitys(actor) {
        let unsorted = actor.items.filter(item => item.type == "quality");
    
        let qualitys = {
            negative: unsorted.filter(quality => quality.system.type === "negative"),
            positive: unsorted.filter(quality => quality.system.type === "positive"),
            // Initially set hasQualities to false; this will be updated below
            hasQualitys: false
        };
    
        // Update hasQualities based on the presence of qualities in either category
        qualitys.hasQualitys = qualitys.negative.length > 0 || qualitys.positive.length > 0;
    
        return qualitys;
    }
    //Matrix Section still needs work
    /*
    static getMatrix(actor) {
        let unsortedProgramms = actor.items.filter(item => item.type == "programm");
    
        let matrixs = {
            negative: unsortedProgramms.filter(programm => programm.system.type === "negative"),
            positive: unsortedProgramms.filter(programm => programm.system.type === "positive"),
            // Initially set hasProgramms to false; this will be updated below
            hasProgramms: false
        };
    
        // Update hasProgramms based on the presence of programms in either category
        programms.hasProgramms = programms.negative.length > 0 || programms.positive.length > 0;
    
        return matrixs;
    }
    */

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