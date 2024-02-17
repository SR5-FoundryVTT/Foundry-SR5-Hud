
export default class ActorData{

    static getActor() {
        return game.user.character;
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

}