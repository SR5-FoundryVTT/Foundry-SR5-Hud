import Hud from "./hud.js";
import Settings from "./settings.js";

const symbol = 'fa-street-view'


  Hooks.on("ready", () => {
    Settings.addAllSettings();
    ui.SR5HUD = new Hud();
  });

   Hooks.on("renderTokenHUD", (app, html, data) => {
      if(data.actorLink) {
         html = html[0];
         const button = document.createElement("div");
         button.classList.add("control-icon");
         button.innerHTML = '<i class="fa-duotone ' + symbol + '"></i>';
         html.querySelector(".col.left").prepend(button);
         button.onclick = (event) => {
            if(ui.SR5HUD.rendered) {
               ui.SR5HUD.close();
            }
            else {
               ui.SR5HUD.tokenActor = data;
               ui.SR5HUD.actor = game.actors.get(data.actorId);
               ui.SR5HUD.render(true);
            }
         };
      }
   });

   Hooks.on('renderSceneControls', (controls, html) => {
    html.find('[data-tool="sr5-hud"]').on('click', (event) => {
         event.preventDefault();
         if(ui.SR5HUD.rendered) {
            ui.SR5HUD.close();
         }
         else {
            ui.SR5HUD.render(true);
         }
      });
   });

   Hooks.on('renderApplication', async function(actor, html) {
      html.find('.sr5-hud-actors-box').on('click', async ev => {
         (await fromUuid(ev.currentTarget.attributes['actor-uuid'].value)).sheet?.render(true)
      })
   });
