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