import { World } from './world';
import { Window } from './window';
import { Renderer } from './renderer';
import { Tile } from './tile';
import { IO } from './io';

import { Player } from './Entity/Actors/Player';
import { Mob } from './Entity/Actors/Mob';
import { Cave } from './Entity/Rooms/Cave';
import { Forest } from './Entity/Rooms/Forest';

// TODO - load in a world config (parse a json file?) then pass it into the World constructor

let world = new World();

const FOREST_HEIGHT = 140;
const FOREST_WIDTH = 70;

// let room = new Forest(FOREST_WIDTH / 2, FOREST_HEIGHT / 2);
let room = new Cave(FOREST_WIDTH / 2, FOREST_HEIGHT / 2);
room.init();

// Add our forest to the world
world.addRoom(room);

// Add a player to the forest
let player = new Player(10, 10, new Tile('@', 'red', 'white'));
room.addActor(player);

// add some test mobs to the forest
let mob1 = new Mob("Mob1 (F)", 20, 6, new Tile('F', 'blue', 'white'));
let mob2 = new Mob("Mob2 (O)", 6, 14, new Tile('O', 'blue', 'white'));
let mob3 = new Mob("Mob3 (A)", 20, 20, new Tile('A', 'purple', 'white'));

room.addActor(mob1);
room.addActor(mob2);
room.addActor(mob3);


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

    let actors = world.getActiveRoom().getActors();
    renderer.renderLocalRoomContexts(actors, world.getActiveRoom(), gameWindow.getContext());
    actors.forEach(actor => {
        renderer.updateGameObject(actor, gameWindow.getContext());
    });

});

// Testing the window system by creating a new window:
let winTiles: Tile[][] = [
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
    [new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white'), new Tile('*', 'black', 'white')],
];

let testWin = new Window(50, 800, 5, 5, winTiles);
renderer.addWindow(testWin);




