"use strict";
exports.__esModule = true;
var world_1 = require("./world");
var window_1 = require("./window");
var renderer_1 = require("./renderer");
var tile_1 = require("./tile");
var io_1 = require("./io");
var Player_1 = require("./Entity/Player");
var Mob_1 = require("./Entity/Mob");
// TODO - load in a world config (parse a json file?) then pass it into the World constructor
var WORLD_HEIGHT = 50;
var WORLD_WIDTH = 50;
var world = new world_1.World(WORLD_WIDTH, WORLD_HEIGHT);
world.init();
var player = new Player_1.Player(10, 10, new tile_1.Tile('@', 'red', 'white'));
world.addActor(player);
// add two test mobs to the world
var mob1 = new Mob_1.Mob("Mob1 (F)", 20, 6, new tile_1.Tile('F', 'blue', 'white'));
var mob2 = new Mob_1.Mob("Mob2 (O)", 6, 34, new tile_1.Tile('O', 'blue', 'white'));
var mob3 = new Mob_1.Mob("Mob3 (A)", 20, 20, new tile_1.Tile('A', 'purple', 'white'));
world.addActor(mob1);
world.addActor(mob2);
world.addActor(mob3);
// Set up rendering and create a game window to render the world to
var renderer = new renderer_1.Renderer();
var gameWindow = new window_1.Window(-1, -1, world.getHeight(), world.getWidth(), world.getTiles());
renderer.addWindow(gameWindow);
/**
 *  __TODO__:
 * replace this with a more robust turn system, or a main game loop sort of thing
                                             */
io_1.IO.genericKeyBinding(function (key) {
    if (!io_1.IO.validControl(key))
        return;
    player.receiveKeyInput(key);
    world.handleActorTurns();
    var actors = world.getActors();
    renderer.renderLocalWorldContexts(actors, world, gameWindow.getContext());
    actors.forEach(function (actor) {
        renderer.updateGameObject(actor, gameWindow.getContext());
    });
});
// Testing the window system by creating a new window:
var winTiles = [
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
    [new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white'), new tile_1.Tile('*', 'black', 'white')],
];
var testWin = new window_1.Window(50, 800, 5, 5, winTiles);
renderer.addWindow(testWin);
console.log(testWin);
// let colors = ['purple', 'green', 'red', 'yellow', 'orange', 'blue']
// for (let i = 0; i < 10; i++) {
//     let color = colors[Math.floor(Math.random() * 4)];
//     let x = Math.floor(Math.random() * testWin.localWidth);
//     let y = Math.floor(Math.random() * testWin.localHeight);
//     renderer.updateTile(x, y, new Tile('*', color, 'white'), testWin.getContext())
// }
