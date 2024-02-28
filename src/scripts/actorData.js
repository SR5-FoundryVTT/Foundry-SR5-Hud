export default class ActorData{

    actor = null;
    tokenActor = null;

    set actor(actor) {
        this.actor = actor;
    }

    set tokenActor(tokenActor) {
        this.tokenActor = tokenActor;
    }

    get actorData() {
        return {
            actor: {
                name: this.actor.name,
                id: this.actor.uuid,
                image: this.image,
                physTrack: this.physicalTrack,
                stunTrack: this.stunTrack,
                statuses: this.status,
            },
            data: {
                skills: this.skills,
                weapons: this.weapons,
                spells: this.spells,
                adeptPowers: this.adeptPowers,
                actions: this.actions,
                contacts: this.contacts,
                qualities: this.qualities,
                /*matrixs: ActorData.getMatrix(actor)*/
            }
        }
    }

    get physicalTrack() {
        if(this.tokenActor.actorLink) {
            return this.actor?.system.track?.physical
        }
        if(!this.tokenActor.actorLink) {
            return this.tokenActor?.delta.system.track?.physical ?? {value: 0}
        }
    }

    get stunTrack() {
        if(this.tokenActor.actorLink) {
            return this.actor?.system.track?.stun
        }
        if(!this.tokenActor.actorLink) {
            return this.tokenActor?.delta.system.track?.stun ?? {value: 0}
        }
    }

    get status() {
        let statusIds;
        if(this.tokenActor.actorLink) {
            statusIds = this.actor?.statuses ?? []
        }
        if(!this.tokenActor.actorLink) {
            statusIds = this.tokenActor?.delta.statuses ?? []
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

    get image() {
        return this.actor?.img ?? "icons/svg/mystery-man.svg"
    }

    get weapons() {
        let unsorted = this.actor.items.filter(item => item.type == "weapon").filter(weapon => weapon.system.technology.equipped)
        return {
            rangedWeapons: unsorted.filter(weapon => weapon.system.action.test === "RangedAttackTest"),
            meleeWeapons: unsorted.filter(weapon => weapon.system.action.test === "MeleeAttackTest")
        };
    }

    get spells() {
        let unsorted = this.actor.items.filter(item => item.type == "spell");
        if(!unsorted || unsorted.length == 0) {
            return null;
        }

        return {
            combat: unsorted.filter(spell => spell.system.category === "combat"),
            detection: unsorted.filter(spell => spell.system.category === "detection"),
            manipulation: unsorted.filter(spell => spell.system.category === "manipulation"),
            illusion: unsorted.filter(spell => spell.system.category === "illusion"),
            health: unsorted.filter(spell => spell.system.category === "health"),
        };
    }
    get contacts() {
        return this.actor.items.filter(item => item.type == "contact")
    }

    get qualities() {
        let unsorted = this.actor.items.filter(item => item.type == "quality");

        if(!unsorted || unsorted.length == 0) {
            return null;
        }

        return {
            negative: unsorted.filter(quality => quality.system.type === "negative"),
            positive: unsorted.filter(quality => quality.system.type === "positive"),
        };
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

    get adeptPowers() {
        return this.actor.items.filter(item => item.type == "adept_power").filter(power => power.system.type != "passive")
    }

    get actions() {
        return this.actor.items.filter(item => item.type == "action")
    }

    get skills() {
        let skills = {
            ...this.actor.system.skills.active,
            ...this.actor.system.skills.knowledge,
            ...this.actor.system.skills.language,
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