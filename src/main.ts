import { World } from './world';
import { Window } from './window';
import { Renderer } from './renderer';
import { Tile } from './tile';
import { IO } from './io';

import { Player } from './Entity/Actors/Player';
import { Mob } from './Entity/Actors/Mob';
import { Cave } from './Entity/Rooms/Cave';
import { Forest } from './Entity/Rooms/Forest';
import { DoorType, Door } from './Entity/Door';

// TODO - load in a world config (parse a json file?) then pass it into the World constructor

let world = new World();

const FOREST_HEIGHT = 82;
const FOREST_WIDTH = 50;

//let room = new Forest(FOREST_WIDTH / 2, FOREST_HEIGHT / 2, 'Forest');
//room.init();

let cave = new Cave(FOREST_WIDTH, FOREST_HEIGHT, 'Cave');
cave.init();
cave.addActor(new Mob("Cave Mob 1", 10, 10, new Tile('O', 'white', 'purple')));
cave.addActor(new Mob("Cave Mob 2", 10, 10, new Tile('A', 'white', 'red')));

// let cave2 = new Cave(FOREST_WIDTH / 2, FOREST_HEIGHT / 2, 'Cave 2');
// cave2.init();
// cave2.addActor(new Mob('Cave2 Mob 1', 12, 12, new Tile('A', 'white', 'red')));
// cave2.addActor(new Mob('Cave2 Mob 2', 12, 20, new Tile('A', 'white', 'red')));


// Add our forest to the world
//world.addRoom(room); 
world.addRoom(cave);
// world.addRoom(cave2);


// Add doors to rooms
//let { x, y } = room.placeDoor(cave, DoorType.TrapDoor); // Place a TrapDoor from the forest to the cave
//console.log(x, y);
//cave.placeDoor(room, DoorType.LadderDoor, x, y);



// Add a player to the forest
let player = new Player(10, 10, new Tile('@', 'red', 'white'));
// room.addActor(player);
cave.addActor(player);

// add some test mobs to the forest
/*let mob1 = new Mob("Mob1 (F)", 20, 6, new Tile('F', 'blue', 'white'));
let mob2 = new Mob("Mob2 (O)", 6, 14, new Tile('O', 'blue', 'white'));
let mob3 = new Mob("Mob3 (A)", 20, 20, new Tile('A', 'purple', 'white'));
let mob4 = new Mob("Mob4 (P)", 6, 20, new Tile('P', 'yellow', 'white'));

room.addActor(mob1);
room.addActor(mob2);
room.addActor(mob3);
room.addActor(mob4);*/

// room.addActor(player);


let renderer = new Renderer();

let gameWindow = new Window(-1, -1, world.getActiveRoom().getHeight(), world.getActiveRoom().getWidth(), world.getActiveRoom().getTiles());
renderer.addWindow(gameWindow);


/** 
 *  __TODO__: 
 * replace this with a more robust turn system, or a main game loop sort of thing  
                                             */
IO.genericKeyBinding(function(key: string) {
    
    if (!IO.validControl(key)) return;

    player.receiveKeyInput(key);

    world.takeTurn();

    // Check if we should be rendering a new room
    if (world.getActiveRoomChanged()) {
        renderer.renderRoom(world.getActiveRoom(), gameWindow.getContext());
    }

    // Grab all the actors in the active room
    let actors = world.getActiveRoom().getActors();

    // Render everything /around/ each actor
    renderer.renderLocalRoomContexts(actors, world.getActiveRoom(), gameWindow.getContext());

    // Render each actor
    actors.forEach(actor => {
        renderer.updateGameObject(actor, gameWindow.getContext());
    });

});

// // Testing the window system by creating a new window:
// let winTiles: Tile[][] = [
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
//     [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
// ];

// let testWin = new Window(50, 800, 5, 5, winTiles);
// renderer.addWindow(testWin);




