import Hud from "./hud.js";
import Settings from "./settings.js";

  Hooks.on("ready", () => {
    Settings.addAllSettings();
    ui.SR5HUD = new Hud();
  });

   Hooks.on("renderTokenHUD", (app, html, data) => {
      ui.SR5HUD.renderTokenHud(html, data);
   });

   Hooks.on('renderApplication', async function(actor, html) {
      html.find('.sr5-hud-actors-box').on('click', async ev => {
         (await fromUuid(ev.currentTarget.attributes['actor-uuid'].value)).sheet?.render(true)
      })
   });
