import { Actor } from "./Entity/Actors/Actor";
import { Tile } from "./tile";
import { GameObject } from "./Entity/GameObject";
import { Window } from "./window";
import { Room } from "./Entity/ROoms/room";
import { Camera } from "./camera";

export class Renderer {

    public static elementSize: number = 15;

    constructor() {}

    public updateGameObject(obj: GameObject, context: HTMLElement) {
        // Render the game object in its position
        this.updateTile(obj.x, obj.y, obj.getTile(), context);
    }

    // "Re-render a specific tile"
    public updateTile(x: number, y: number, tile: Tile, context: HTMLElement) {
        (<HTMLElement>context.children[x].children[y]).innerHTML = tile.ascii;
        (<HTMLElement>context.children[x].children[y]).style.backgroundColor = tile.bg;
        (<HTMLElement>context.children[x].children[y]).style.color = tile.fg;
    }

    public renderRoom(room: Room, context: HTMLElement) {
        for (let i = 0; i < room.getWidth(); i++) {
            for (let j = 0; j < room.getHeight(); j++) {
                this.updateTile(i, j, room.getObject(i, j).getTile(), context);
            }
        }
    }

    // More expenseive than simply updating the view of the camera
    public renderView(camera: Camera, window: Window) {

        let context = window.getContext();

        let room = camera.getRoom(); // the room that the camera is looking at

        let viewStartX = camera.getStartX();
        let viewStartY = camera.getStartY();

        // render everything to the "test overlay (white/room default bg color)"
        for (let i = 0; i < window.localWidth; i++) {
            for (let j = 0; j < window.localHeight; j++) {
                // this.updateTile(i, j, new Tile('+', 'black', 'white'), context);
                // this.updateTile(i, j, new Tile(''), context);
                // TEST: (just graying out what was there before)
                // FOG OF WAR: (TODO: have specific room store information about their fog color)
                this.updateTile(i, j, 
                    new Tile(room.getObject(i, j).getTile().ascii, room.defaultFogFg, room.defaultFogBg), 
                    context);
            }
        }

        // render everything in view of our camera
        for (let i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
            for (let j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
                this.updateTile(i, j, room.getObject(i, j).getTile(), context);
            }
        }
    }

    // public renderViewOblong(camera: Camera, window: Window) {
    //     let context = window.getContext();

    //     let room = camera.getRoom();

    //     // render everything to the fog color
    //     for (let i = 0; i < window.localWidth; i++) {
    //         for (let j = 0; j < window.localHeight; j++) {
    //             // FOG OF WAR: (TODO: have specific room store information about their fog color)
    //             this.updateTile(i, j, 
    //                 new Tile(room.getObject(i, j).getTile().ascii, room.defaultFogFg, room.defaultFogBg), 
    //                 context);
    //         }
    //     }

    //     // render everything in view, in an oblong shape

    //     let viewStartX = camera.getStartX();
    //     let viewStartY = camera.getStartY();

    //     let cx = camera.cx;//viewStartX + (camera.viewWidth / 2);
    //     let cy = camera.cy;//viewStartY + (camera.viewHeight / 2);

    //     for (let j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
    //         console.log(cx, j);
    //         this.updateTile(cx, j, room.getObject(cx, j).getTile(), context);


    //         if (j == cy || j == cy - 1 || j == cy + 1) {
    //             for (let i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);

    //             }
    //         }

    //         if ((j <= cy - 2 || j >= cy + 2)){// && (j < cy - 3 || j > cy + 3)) {
    //             for (let i = Math.max(viewStartX + 1, 1); i < Math.min(viewStartX + camera.viewWidth - 1, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }

    //         if ((j <= cy - 3 || j >= cy + 3)){// && (j < cy - 4 || j > cy + 4)) {
    //             for (let i = Math.max(viewStartX + 2, 2); i < Math.min(viewStartX + camera.viewWidth - 2, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }

    //         if ((j <= cy - 4 || j >= cy + 4)){//&& (j < cy - 4 || j > cy + 4)) {
    //             for (let i = Math.max(viewStartX + 3, 3); i < Math.min(viewStartX + camera.viewWidth - 3, window.localWidth); i++) {
    //                 this.updateTile(i, j, room.getObject(i, j).getTile(), context);
    //             }
    //         }
    //     }
    // }

    public updateCameraView (camera: Camera, window: Window) {

        let context = window.getContext();

        let room = camera.getRoom(); // the room that the camera is looking at

        let viewStartX = camera.getStartX();
        let viewEndX = camera.getEndX();
        let viewStartY = camera.getStartY();
        let viewEndY = camera.getEndY();

        // set the area around the camera view to white (or whatever background color the room is using)
        for (let i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
            this.updateTile(room.objects[i][viewStartY - 1].x, room.objects[i][viewStartY - 1].y, new Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[i][viewEndY + 1].x, room.objects[i][viewEndY + 1].y, new Tile('+', 'black', 'white'), context);
        }
        for (let j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
            this.updateTile(room.objects[viewStartX - 1][j].x, room.objects[viewStartX - 1][j].y, new Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[viewEndX + 1][j].x, room.objects[viewEndX + 1][j].y, new Tile('+', 'black', 'white'), context);
        }

        // acutally render the edges of the area in the updated view
        for (let i = Math.max(viewStartX, 0); i < Math.min(viewStartX + camera.viewWidth, window.localWidth); i++) {
            this.updateTile(room.objects[i][viewStartY].x, room.objects[i][viewStartY].y, new Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[i][viewEndY].x, room.objects[i][viewEndY].y, new Tile('+', 'black', 'white'), context);
        }
        for (let j = Math.max(viewStartY, 0); j < Math.min(viewStartY + camera.viewHeight, window.localHeight); j++) {
            this.updateTile(room.objects[viewStartX][j].x, room.objects[viewStartX][j].y, new Tile('+', 'black', 'white'), context);
            this.updateTile(room.objects[viewEndX][j].x, room.objects[viewEndX][j].y, new Tile('+', 'black', 'white'), context);
        }
    }

    public renderObjectContext(obj: GameObject, room: Room, context: HTMLElement) {
        // If the player is in debug render their movements and local contexts in yellow
        if (obj instanceof Actor && (<Actor>obj).debug) {
            this.updateTile(obj.x - 1, obj.y, new Tile(room.getObject(obj.x - 1, obj.y).getTile().ascii, room.getObject(obj.x - 1, obj.y).getTile().fg, 'yellow'), context);
            this.updateTile(obj.x + 1, obj.y, new Tile(room.getObject(obj.x + 1, obj.y).getTile().ascii, room.getObject(obj.x + 1, obj.y).getTile().fg, 'yellow'), context);
            this.updateTile(obj.x, obj.y - 1, new Tile(room.getObject(obj.x, obj.y - 1).getTile().ascii, room.getObject(obj.x, obj.y - 1).getTile().fg, 'yellow'), context);
            this.updateTile(obj.x, obj.y + 1, new Tile(room.getObject(obj.x, obj.y + 1).getTile().ascii, room.getObject(obj.x, obj.y + 1).getTile().fg, 'yellow'), context);
        }
        else {
            this.updateTile(obj.x - 1, obj.y, room.getObject(obj.x - 1, obj.y).getTile(), context);
            this.updateTile(obj.x + 1, obj.y, room.getObject(obj.x + 1, obj.y).getTile(), context);
            this.updateTile(obj.x, obj.y - 1, room.getObject(obj.x, obj.y - 1).getTile(), context);
            this.updateTile(obj.x, obj.y + 1, room.getObject(obj.x, obj.y + 1).getTile(), context);
        }
    }

    public addWindow(window: Window) {
        let context = window.getContext();
        this.bind(context);
    }

    private bind(windowContext: HTMLElement) {
        let body = document.body;
        body.style.margin = '0';

        body.appendChild(windowContext);
    }

    public static pxs(x: number): string {
        return x.toString() + 'px';
    }

}