// Actors
export { Actor } from './Actors/Actor';
export { Mob } from './Actors/Mob';
export { Player } from './Actors/Player';

// Actions
export { Action, ActionDirection } from './Actions/Action';
export { WaitAction } from './Actions/WaitAction';
export { ChopAction } from './Actions/ChopAction';
export { DoorAction } from './Actions/DoorAction';
export { WalkAction } from './Actions/WalkAction';


// Rooms
export { Room, Area } from './Rooms/Room';
/*consider leaving out of module*/export { Cave } from './Rooms/Cave';
/*consider leaving out of module*/export { Forest } from './Rooms/Forest';
export { Door, DoorType } from './Rooms/Door';
export { Tree, Floor, Wall } from './Rooms/Environment';

// Systems
export { Renderer } from './Systems/renderer';
export { Window } from './Systems/window';
export { IO } from './Systems/io';
export { Camera } from './Systems/camera'; 

// Misc Base Objects
export { BSPTree } from './util';
export { Tile } from './tile';
export { GameObject } from './GameObject';
export { World } from './world';




export class Engine {


    public run() {
        console.log('ascii engine running!');
    }
}


export abstract class Game {

    abstract load(): void;
    abstract update(): void;
    abstract draw(): void;


}