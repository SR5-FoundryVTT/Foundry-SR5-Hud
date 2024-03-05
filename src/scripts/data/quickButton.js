import ActorData from "./actorData";

export default class QuickButton{

    static moduleName = "sr5-hud";
    static buttonFlag = "quickButton" 

    static addNewButton(button) {
        let actor = ActorData.getActor()

        console.log(button)

        let existingButtons = actor.getFlag(this.moduleName, this.buttonFlag) ?? []
        console.log(existingButtons)
        existingButtons.push(button);
        actor.setFlag(this.moduleName, this.buttonFlag, existingButtons)
    }

}