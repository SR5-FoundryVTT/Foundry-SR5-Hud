import Hud from "./hud.js";
import Settings from "./settings.js";


  Hooks.on("ready", () => {
    Settings.addAllSettings();
    ui.SR5HUD = new Hud();
  });

   Hooks.on('getSceneControlButtons', (controls) => {
     const tokenControls = controls.find((c) => c.name === 'token');

     tokenControls.tools.push({
         name: 'sr5-hud',
         title: 'HUD',
         icon: 'fas fa-street-view',
         button: true
     });
   });

    Hooks.on('renderApplication', async function(actor, html) {

      html.find('.sr5-hud-actors-box').on('click', async ev => {
         (await fromUuid(ev.currentTarget.attributes['actor-uuid'].value)).sheet?.render(true)
      })

   });