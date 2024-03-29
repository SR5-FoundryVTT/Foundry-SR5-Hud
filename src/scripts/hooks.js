import Hud from "./hud/hud.js";
import Settings from "./config/settings.js";

Hooks.on("init", () => {
   loadTemplates(["modules/sr5-hud/templates/partials/rangedWeaponPartial.hbs"])
 });

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
