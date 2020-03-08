import { Importer } from "./importer";
import { Game } from "./Game";
import { World } from "./world";
import { Window } from './Systems/window';
import { Renderer } from "./Systems/renderer";
import { Player } from "./Actors/Player";
import { IO } from "./Systems/io";
import { Menu, MenuTitle, MenuOption, MenuInfo } from './Systems/Menu/Menu';
import { InventoryMenu } from './Systems/Menu/InventoryMenu';
import { GameObject } from './GameObject';
import { Tile } from './tile';

import * as worldConfig from "./world.json";
import * as menusConfig from "./menus.json";
import { Floor } from "./Rooms/Environment";

enum GameState {
    Play,
    Look,
    Menu
}
class game extends Game {

    // menuWindows: Record<string, MenuWindow> = {};
    menus: Record<string, Menu> = {};
    activeMenu: string = null;

    // menusNew: Record<string, Menu> = {};

    renderer: Renderer;

    world: World;

    state: GameState;
    lookCursor: GameObject;

    load() {
        this.state = GameState.Menu;
        this.world = Importer.importWorld(worldConfig);
        this.menus = Importer.importMenus(menusConfig);

        this.activeMenu = 'start';

        this.lookCursor = new GameObject(0, 0, new Tile('X', 'white','black'));

        // create a message box
        this.menus['messagebox'] = new Menu();
        this.menus['messagebox'].addElement(new MenuInfo('You feel tired.', ''));

        // Create an inventory menu
        this.menus['inventory'] = new InventoryMenu(this.world.getActiveRoom().getWidth(), this.world.getActiveRoom().getHeight(), 'Inventory');
        this.menus['inventory'].options['Escape'] = new MenuOption("Exit", "Escape");
        this.menus['inventory'].options['Escape'].toState = 'Play';

        this.menus['status_info'] = new Menu();
        this.menus['status_info'].addElement(new MenuInfo('Turns: 0'));

        this.renderer = new Renderer();

        this.renderer.addWindow('start', Menu.width, Menu.height);
        this.renderer.addWindow('create_game', Menu.width, Menu.height);
        this.renderer.addWindow('about_game', Menu.width, Menu.height);
        
        this.renderer.addWindow('messagebox', Menu.width, 2);
        this.renderer.addWindow('game', Menu.width, Menu.height, true);
        this.renderer.addWindow('inventory', Menu.width, Menu.height);
        this.renderer.addWindow('status_info', Menu.width, 3);

        this.renderer.hideAllWindows();
        this.renderer.windows['start'].show();

        this.renderer.renderRoom(this.world.getActiveRoom(), this.renderer.windows['game'].getContext());

        this.renderer.renderMenu(this.menus['start'], this.renderer.windows['start'].getContext());
        

        this.world.getActiveRoom().getActors().forEach(actor => {
            if (actor instanceof Player && this.world.getPlayer() == null) 
            {
                this.world.setPlayer(actor);
                (<InventoryMenu>this.menus['inventory']).establishInventory(this.world.getPlayer().inventory);

                // this.renderer.renderArea(this.world.getPlayer().x - 6,  this.world.getPlayer().y - 6, 12, 12, this.world.getActiveRoom(), this.window.getContext());

                this.renderer.renderGameObject(actor, this.renderer.windows['game'].getContext());
                this.renderer.renderObjectContext(actor, this.world.getActiveRoom(), this.renderer.windows['game'].getContext());
                return;
            }
        });

    }

    update(key: string) {

        if (this.state == GameState.Menu) {
            if (!(IO.validMenuControls.indexOf(key) > -1)) return;

            // TODO: Check for an existing save in localStorage

            /*if (key == 'ArrowUp') {
                this.menus[this.activeMenu].selectedElement -= 1;

                if (this.menus[this.activeMenu].selectedElement < 1) {
                    this.menus[this.activeMenu].selectedElement = this.menus[this.activeMenu].elements.length - 1;
                }

                return;
            }

            if (key == 'ArrowDown') {
                this.menus[this.activeMenu].selectedElement += 1;

                if (this.menus[this.activeMenu].selectedElement > this.menus[this.activeMenu].elements.length - 1) {
                    this.menus[this.activeMenu].selectedElement = 1;
                }

                return;
            }*/

            let i = Object.keys(this.menus[this.activeMenu].options).indexOf(key);
            if (i > -1) {

                // toMenu
                if (this.menus[this.activeMenu].options[key].toMenu != null) {
                    this.activeMenu = this.menus[this.activeMenu].options[key].toMenu;
                    this.renderer.showWindows([this.activeMenu]);
                    return;
                }

                // toState
                let toState = this.menus[this.activeMenu].options[key].toState;
                if (toState != null) {
                    if (toState == 'Play') {
                        this.state = GameState.Play;
                        
                        this.activeMenu = null;
                        this.renderer.showWindows(['game', 'status_info', 'messagebox']);
                        return;
                    }
                }
            }

        }

        if (this.state == GameState.Look) {
            if (!(IO.validLookControls.indexOf(key) > -1)) return;

            if (key == 'ArrowUp') {
                if (this.lookCursor.y - 1 < 0) return;
                this.lookCursor.y -= 1;
            }

            if (key == 'ArrowDown') {
                if (this.lookCursor.y + 1 > this.world.getActiveRoom().getHeight() - 1) return;
                this.lookCursor.y += 1;
            }

            if (key == 'ArrowRight') {
                if (this.lookCursor.x + 1 > this.world.getActiveRoom().getWidth() - 1) return;
                this.lookCursor.x += 1;
            }

            if (key == 'ArrowLeft') {
                if (this.lookCursor.x - 1 < 0) return;
                this.lookCursor.x -= 1;
            }

            if (key == 'Escape') {
                this.state = GameState.Play;
            }

            let obj = this.world.getActiveRoom().objects[this.lookCursor.x][this.lookCursor.y];
            let name = obj.name;
            if (obj instanceof Floor && (<Floor>obj).getOccupation() != null) {
                name = (<Floor>obj).getOccupation().name;
            }
            (<MenuInfo>this.menus['messagebox'].elements[0]).content = name;

        }

        if (this.state == GameState.Play) {

            if (!(IO.validGameControls.indexOf(key) > -1)) return;

             // switch state to "viewing inventory"
            if (key == 'i') {

                this.renderer.showWindows(['inventory']);

                this.activeMenu = 'inventory';
                this.state = GameState.Menu;
                return;
            }

            if (key == 'L') {

                this.state = GameState.Look;
                this.lookCursor.x = this.world.getPlayer().x;
                this.lookCursor.y = this.world.getPlayer().y;

                // this.renderer.renderLookCursor(this.lookCursor, this.renderer.windows['game'].getContext());

            }

            this.world.getPlayer().receiveKeyInput(key);
            this.world.takeTurn();
        }
    }

    draw() {

        if (this.state == GameState.Menu) {
            if (this.activeMenu == 'inventory') (<InventoryMenu>this.menus['inventory']).establishInventory(this.world.getPlayer().inventory);
            this.renderer.renderMenu(this.menus[this.activeMenu], this.renderer.windows[this.activeMenu].getContext());
        }

        if (this.state == GameState.Look) {

                
                this.renderer.renderObjectContext(this.lookCursor, this.world.getActiveRoom(), this.renderer.windows['game'].getContext());

                this.world.getActiveRoom().getActors().forEach(actor => {
                    this.renderer.renderGameObject(actor, this.renderer.windows['game'].getContext());    
                });

                this.renderer.renderGameObject(this.lookCursor, this.renderer.windows['game'].getContext());

                this.renderer.renderMenu(this.menus['messagebox'], this.renderer.windows['messagebox'].getContext());

        }


        if (this.state == GameState.Play) {
            // this.renderer.renderRoom(this.world.getActiveRoom(), this.window.getContext());
            // this.renderer.renderView(this.world.getPlayer(), this.world.getActiveRoom(), this.window.getContext());

            (<MenuInfo>this.menus['messagebox'].elements[0]).content = this.world.getCurrentMessages().join(" ");            
            this.renderer.renderMenu(this.menus['messagebox'], this.renderer.windows['messagebox'].getContext());

            // Draw everything /around/ each actor
            this.world.getActiveRoom().getActors().forEach(actor => {
                this.renderer.renderObjectContext(actor, this.world.getActiveRoom(), this.renderer.windows['game'].getContext());
            });

            // Draw every actor (this drawing order makes sure actors contexts don't render over eachother)
            this.world.getActiveRoom().getActors().forEach(actor => {
                this.renderer.renderGameObject(actor, this.renderer.windows['game'].getContext());
            });
            

            let vd = this.world.getPlayer().visionDistance;
            for (let i = 0; i < 4; i++) {
                // i == 0 --> up

                // i == 1 --> right

                // i == 2 --> down

                // i == 3 --> left

            }

            // display status info
            (<MenuInfo>this.menus['status_info'].elements[0]).content = 'Turns: ' + this.world.getTurnsPassed();
            this.renderer.renderMenu(this.menus['status_info'], this.renderer.windows['status_info'].getContext());

        }
        
    }
}

let g = new game();
g.load();
IO.genericKeyBinding(function(key: string) {
    g.update(key);
    g.draw();
})
