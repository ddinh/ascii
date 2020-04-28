import { Game } from "./Game";
import { World } from "./world";
import { Renderer } from "./Systems/renderer";
import { IO } from "./Systems/io";
import { Menu, MenuInfo, MenuTitle, MenuOption } from './Systems/Menu/Menu';
import { Room } from "./Rooms/Room";
import { Tile } from "./tile";
import { Player } from "./Actors/Player";
import { Level } from "./Level";
import { Mob } from "./Actors/Mob";

class game extends Game {

    menus: Record<string, Menu> = {};

    renderer: Renderer;

    world: World;

    funds: number; // How much cash the player has available

    load() {

        // TODO: Check for an existing save in localStorage
        this.renderer = new Renderer();

        // Create the world
        this.world = new World();
        this.world.init();

        this.funds = 500; // start with this much cash

        // Add some test orcs to the world
        for (let i = 0; i < 10; i++)
            this.world.getRoom().addActor(new Mob("Orc", 10, 10, new Tile('O', 'green', 'purple')));
        

        // Create windows
        this.renderer.addWindow('gameinfo', this.world.getRoom().getWidth(), 3);
        this.renderer.addWindow('game', this.world.getRoom().getWidth(), this.world.getRoom().getHeight(), true);
        this.renderer.addWindow('shop', this.world.getRoom().getWidth(), 8);
        this.renderer.hideAllWindows();

        // Create Menus for gameinfo and shop
        this.menus['gameinfo'] = new Menu();
        this.menus['gameinfo'].addElement(new MenuInfo('Wave: 0'));
        this.menus['gameinfo'].addElement(new MenuInfo('$ 500'));

        this.menus['shop'] = new Menu();
        this.menus['shop'].addElement(new MenuInfo('SHOP:'));
        this.menus['shop'].addElement(new MenuOption('Turret $50', 't'));

        // Render world and menus for the first time
        this.renderer.renderRoom(this.world.getRoom(), 'game');
        for (let key in this.menus) {
            this.renderer.renderMenu(this.menus[key], this.renderer.windows[key].getContext());
        }
        // Show all the windows
        this.renderer.showWindows(['gameinfo', 'game', 'shop']);

    }

    update(key: string) {

        // TODO: Improve IO validation
        if (!(IO.validGameControls.indexOf(key) > -1) && !(this.keyQueue.isHolding())) return;

        this.world.takeTurn();
    }

    draw() {

        // Draw everything around each actor (above, below, left, and right)
        this.world.getRoom().getActors().forEach(actor => {
            this.renderer.renderObjectContext(actor, this.world.getRoom(), this.renderer.windows['game'].getContext());
        });

        // Draw every actor (this drawing order makes sure actors contexts don't render over eachother)
        this.world.getRoom().getActors().forEach(actor => {
            this.renderer.renderGameObject(actor, this.renderer.windows['game'].getContext());
        });

        // Update Menus' content
        (<MenuInfo>this.menus['gameinfo'].elements[0]).content = 'Wave: ' + this.world.wave;
        (<MenuInfo>this.menus['gameinfo'].elements[1]).content = '$ ' + this.funds;
    
        // Render Menus
        for (let key in this.menus) {
            this.renderer.renderMenu(this.menus[key], this.renderer.windows[key].getContext());
        }
    }

}

let g = new game();
g.load();
IO.genericKeyBinding(function(key: string) {
    g.update(key);
    g.draw();
});

