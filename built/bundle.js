(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Action = /** @class */ (function () {
    function Action(actor) {
        this.actor = actor;
    }
    return Action;
}());
exports.Action = Action;

},{}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Action_1 = require("./Action");
var WaitAction = /** @class */ (function (_super) {
    __extends(WaitAction, _super);
    function WaitAction(actor) {
        return _super.call(this, actor) || this;
    }
    WaitAction.prototype.perform = function (world) {
        // Do nothing. Just wait.
    };
    return WaitAction;
}(Action_1.Action));
exports.WaitAction = WaitAction;

},{"./Action":1}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Action_1 = require("./Action");
var Environment_1 = require("../../Entity/Environment");
var WalkDirection;
(function (WalkDirection) {
    WalkDirection[WalkDirection["Up"] = 0] = "Up";
    WalkDirection[WalkDirection["Down"] = 1] = "Down";
    WalkDirection[WalkDirection["Left"] = 2] = "Left";
    WalkDirection[WalkDirection["Right"] = 3] = "Right";
})(WalkDirection = exports.WalkDirection || (exports.WalkDirection = {}));
var WalkAction = /** @class */ (function (_super) {
    __extends(WalkAction, _super);
    function WalkAction(dir, actor) {
        var _this = _super.call(this, actor) || this;
        _this.dir = dir;
        return _this;
    }
    WalkAction.prototype.perform = function (world) {
        var fromObject = world.getObject(this.actor.x, this.actor.y);
        if (this.dir == WalkDirection.Up) {
            var object = world.getObject(this.actor.x, this.actor.y - 1);
            if (!object.collides) {
                if (fromObject instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].removeOccupation();
                }
                this.actor.y = this.actor.y - 1;
                if (object instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].setOccupation(this.actor);
                }
            }
            else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        else if (this.dir == WalkDirection.Down) {
            var object = world.getObject(this.actor.x, this.actor.y + 1);
            if (!object.collides) {
                if (fromObject instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].removeOccupation();
                }
                this.actor.y = this.actor.y + 1;
                if (object instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].setOccupation(this.actor);
                }
            }
            else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        else if (this.dir == WalkDirection.Left) {
            var object = world.getObject(this.actor.x - 1, this.actor.y);
            if (!object.collides) {
                if (fromObject instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].removeOccupation();
                }
                this.actor.x = this.actor.x - 1;
                if (object instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].setOccupation(this.actor);
                }
            }
            else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        else if (this.dir == WalkDirection.Right) {
            var object = world.getObject(this.actor.x + 1, this.actor.y);
            if (!object.collides) {
                if (fromObject instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].removeOccupation();
                }
                this.actor.x = this.actor.x + 1;
                if (object instanceof Environment_1.Floor) {
                    world.objects[this.actor.x][this.actor.y].setOccupation(this.actor);
                }
            }
            else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        // In theory, if we DONT do the rendering update here, then the movement is completely independent of the renderer which is ideal
    };
    return WalkAction;
}(Action_1.Action));
exports.WalkAction = WalkAction;

},{"../../Entity/Environment":5,"./Action":1}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var GameObject_1 = require("./GameObject");
// essentially, "Actors" are GameObjects that are allowed to takeTurns and have names.
var Actor = /** @class */ (function (_super) {
    __extends(Actor, _super);
    function Actor(name, x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.debug = false;
        _this.name = name;
        return _this;
    }
    return Actor;
}(GameObject_1.GameObject));
exports.Actor = Actor;

},{"./GameObject":6}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var GameObject_1 = require("./GameObject");
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree(x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.collides = true;
        return _this;
    }
    return Tree;
}(GameObject_1.GameObject));
exports.Tree = Tree;
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor(x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.occupiedBy = null;
        _this.collides = false;
        return _this;
    }
    Floor.prototype.setOccupation = function (actor) {
        this.occupiedBy = actor;
        this.collides = true;
    };
    Floor.prototype.removeOccupation = function () {
        this.occupiedBy = null;
        this.collides = false;
    };
    return Floor;
}(GameObject_1.GameObject));
exports.Floor = Floor;
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(x, y, tile) {
        var _this = _super.call(this, x, y, tile) || this;
        _this.collides = true;
        return _this;
    }
    return Wall;
}(GameObject_1.GameObject));
exports.Wall = Wall;

},{"./GameObject":6}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var GameObject = /** @class */ (function () {
    function GameObject(x, y, tile) {
        this.x = x;
        this.y = y;
        this.tile = tile;
        this.collides = false;
    }
    GameObject.prototype.getTile = function () {
        return this.tile;
    };
    return GameObject;
}());
exports.GameObject = GameObject;

},{}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Actor_1 = require("./Actor");
var WalkAction_1 = require("../Components/Actions/WalkAction");
var WaitAction_1 = require("../Components/Actions/WaitAction");
var Mob = /** @class */ (function (_super) {
    __extends(Mob, _super);
    // public debug: boolean = true;
    function Mob(name, x, y, tile) {
        var _this = _super.call(this, name, x, y, tile) || this;
        _this.nextAction = new WaitAction_1.WaitAction(_this);
        _this.collides = true;
        return _this;
    }
    Mob.prototype.takeTurn = function (world) {
        var actionList = [
            new WaitAction_1.WaitAction(this),
            new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Up, this),
            new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Down, this),
            new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Left, this),
            new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Right, this)
        ];
        var r = Math.floor(Math.random() * (actionList.length));
        actionList[r].perform(world);
        // actionList[0].perform();
    };
    return Mob;
}(Actor_1.Actor));
exports.Mob = Mob;

},{"../Components/Actions/WaitAction":2,"../Components/Actions/WalkAction":3,"./Actor":4}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Actor_1 = require("./Actor");
var WaitAction_1 = require("../Components/Actions/WaitAction");
var WalkAction_1 = require("../Components/Actions/WalkAction");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    // public debug: boolean = true;
    function Player(x0, y0, tile) {
        var _this = _super.call(this, "Player", x0, y0, tile) || this;
        _this.nextAction = new WaitAction_1.WaitAction(_this);
        return _this;
    }
    Player.prototype.receiveKeyInput = function (key) {
        if (key == 'w') {
            this.nextAction = new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Up, this);
        }
        else if (key == 'a') {
            this.nextAction = new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Left, this);
        }
        else if (key == 's') {
            this.nextAction = new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Down, this);
        }
        else if (key == 'd') {
            this.nextAction = new WalkAction_1.WalkAction(WalkAction_1.WalkDirection.Right, this);
        }
        else {
            this.nextAction = new WaitAction_1.WaitAction(this);
        }
    };
    Player.prototype.takeTurn = function (world) {
        this.nextAction.perform(world);
    };
    return Player;
}(Actor_1.Actor));
exports.Player = Player;

},{"../Components/Actions/WaitAction":2,"../Components/Actions/WalkAction":3,"./Actor":4}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var IO = /** @class */ (function () {
    function IO() {
    }
    IO.validControl = function (key) {
        if (key == 'w' ||
            key == 'a' ||
            key == 's' ||
            key == 'd' ||
            key == 'j') // j - wait
            return true;
        return false;
    };
    IO.initKeyBindings = function () {
        document.addEventListener('keypress', function (event) {
            if (event.key == 'w') {
                console.log('w - up');
            }
            else if (event.key == 'a') {
                console.log('a - left');
            }
            else if (event.key == 's') {
                console.log('s - down');
            }
            else if (event.key == 'd') {
                console.log('d - right');
            }
            else {
                console.log('unknown keypress:', event.key);
            }
        });
    };
    IO.genericKeyBinding = function (func) {
        document.addEventListener('keypress', function (event) {
            func(event.key);
        });
    };
    return IO;
}());
exports.IO = IO;

},{}],10:[function(require,module,exports){
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

},{"./Entity/Mob":7,"./Entity/Player":8,"./io":9,"./renderer":11,"./tile":12,"./window":13,"./world":14}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Actor_1 = require("./Entity/Actor");
var tile_1 = require("./tile");
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    Renderer.prototype.updateGameObject = function (obj, context) {
        // Render the game object in its position
        this.updateTile(obj.x, obj.y, obj.getTile(), context);
    };
    // "Re-render a specific tile"
    Renderer.prototype.updateTile = function (x, y, tile, context) {
        context.children[y].children[x].innerHTML = tile.ascii;
        context.children[y].children[x].style.backgroundColor = tile.bg;
        context.children[y].children[x].style.color = tile.fg;
    };
    Renderer.prototype.renderLocalWorldContexts = function (objs, world, context) {
        // Update all locations around the game object to their initial world state
        for (var n = 0; n < objs.length; n++) {
            // If the player is in debug render their movements and local contexts in yellow
            if (objs[n] instanceof Actor_1.Actor && objs[n].debug) {
                this.updateTile(objs[n].x - 1, objs[n].y, new tile_1.Tile(world.getObject(objs[n].x - 1, objs[n].y).getTile().ascii, world.getObject(objs[n].x - 1, objs[n].y).getTile().fg, 'yellow'), context);
                this.updateTile(objs[n].x + 1, objs[n].y, new tile_1.Tile(world.getObject(objs[n].x + 1, objs[n].y).getTile().ascii, world.getObject(objs[n].x + 1, objs[n].y).getTile().fg, 'yellow'), context);
                this.updateTile(objs[n].x, objs[n].y - 1, new tile_1.Tile(world.getObject(objs[n].x, objs[n].y - 1).getTile().ascii, world.getObject(objs[n].x, objs[n].y - 1).getTile().fg, 'yellow'), context);
                this.updateTile(objs[n].x, objs[n].y + 1, new tile_1.Tile(world.getObject(objs[n].x, objs[n].y + 1).getTile().ascii, world.getObject(objs[n].x, objs[n].y + 1).getTile().fg, 'yellow'), context);
            }
            else {
                this.updateTile(objs[n].x - 1, objs[n].y, world.getObject(objs[n].x - 1, objs[n].y).getTile(), context);
                this.updateTile(objs[n].x + 1, objs[n].y, world.getObject(objs[n].x + 1, objs[n].y).getTile(), context);
                this.updateTile(objs[n].x, objs[n].y - 1, world.getObject(objs[n].x, objs[n].y - 1).getTile(), context);
                this.updateTile(objs[n].x, objs[n].y + 1, world.getObject(objs[n].x, objs[n].y + 1).getTile(), context);
            }
        }
    };
    Renderer.prototype.addWindow = function (window) {
        var context = window.getContext();
        this.bind(context);
    };
    // public updateWindow(window: Window, tiles: Tile[][]) {
    //     for (let i = 0; i < window.localHeight; i++) {
    //         for (let j = 0; j < window.localWidth; j++) {
    //             this.updateTile(i, j, tiles[i][j], window.getContext());
    //         }
    //     }
    // }
    Renderer.prototype.bind = function (windowContext) {
        var body = document.body;
        body.style.margin = '0';
        body.appendChild(windowContext);
    };
    Renderer.pxs = function (x) {
        return x.toString() + 'px';
    };
    Renderer.elementSize = 15;
    return Renderer;
}());
exports.Renderer = Renderer;

},{"./Entity/Actor":4,"./tile":12}],12:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Tile = /** @class */ (function () {
    function Tile(ascii, fg, bg) {
        this.ascii = '.';
        this.fg = 'black';
        this.bg = 'white';
        // Check for "empty constructor"
        if (typeof ascii === 'undefined' || ascii == null) {
            return;
        }
        this.ascii = ascii;
        if (fg != null && bg != null) {
            this.fg = fg;
            this.bg = bg;
            // console.log(this);
            return;
        }
        return;
    }
    return Tile;
}());
exports.Tile = Tile;

},{}],13:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var renderer_1 = require("./renderer");
// NOTE: windows should not contain gameobject representations, only tile based representations
// CONSIDERATION: do we want the windowing code to handle outlining the window itself?
var Window = /** @class */ (function () {
    function Window(startX, startY, localWidth, localHeight, tiles) {
        this.startX = startX;
        this.startY = startY;
        this.localWidth = localWidth;
        this.localHeight = localHeight;
        this.tiles = tiles;
        this.initContext(tiles);
    }
    Window.prototype.getTile = function (x, y) {
        return this.tiles[x][y];
    };
    Window.prototype.getContext = function () {
        return this.context;
    };
    Window.prototype.initContext = function (tiles) {
        // Loop over localWidth and localHeight to initialize the literal html elements that will be in this window
        this.context = document.createElement('div');
        this.context.style.height = renderer_1.Renderer.pxs(this.localHeight * renderer_1.Renderer.elementSize);
        this.context.style.width = renderer_1.Renderer.pxs(this.localWidth * renderer_1.Renderer.elementSize);
        if (this.startX == -1 && this.startY == -1) {
            this.context.style.margin = 'auto';
        }
        else {
            this.context.style.position = 'absolute';
            this.context.style.left = renderer_1.Renderer.pxs(this.startX);
            this.context.style.top = renderer_1.Renderer.pxs(this.startY);
        }
        for (var i = 0; i < this.localHeight; i++) {
            var rowDiv = document.createElement('div');
            rowDiv.style.height = renderer_1.Renderer.pxs(renderer_1.Renderer.elementSize);
            rowDiv.style.display = 'flex';
            for (var j = 0; j < this.localWidth; j++) {
                var element = document.createElement('div');
                element.style.height = renderer_1.Renderer.pxs(renderer_1.Renderer.elementSize);
                element.style.width = renderer_1.Renderer.pxs(renderer_1.Renderer.elementSize);
                element.style.textAlign = 'center';
                element.style.userSelect = 'none';
                /**
                 * TODO: figure out how to pass in the data that we want to display in this window
                                                                        */
                element.innerHTML = tiles[j][i].ascii;
                element.style.backgroundColor = tiles[j][i].bg;
                element.style.color = tiles[j][i].fg;
                rowDiv.appendChild(element);
            }
            this.context.appendChild(rowDiv);
        }
    };
    return Window;
}());
exports.Window = Window;

},{"./renderer":11}],14:[function(require,module,exports){
"use strict";
/* This is sort of kind of a world "system"

Notes about what this World class could or should be:

- keep things related to generating the initial world state (?)
- leave propagation of the simulation to another system
- in theory, if users are to specify custom "factors" into the way their world is generated,
    then those factors would be tweaked here... (maybe?)
    - but, maybe this would be better left for a "Generator" class
        - it could generate types of rooms/dungeons?

*/
exports.__esModule = true;
var Environment_1 = require("./Entity/Environment");
var tile_1 = require("./tile");
var World = /** @class */ (function () {
    function World(width, height) {
        this.width = width;
        this.height = height;
        this.objects = [];
        this.actors = [];
    }
    World.prototype.handleActorTurns = function () {
        var _this = this;
        this.actors.forEach(function (actor) {
            actor.takeTurn(_this);
        });
    };
    World.prototype.addActor = function (actor) {
        this.actors.push(actor);
        // this.objects[actor.x][actor.y] = actor;
    };
    World.prototype.getActors = function () {
        return this.actors;
    };
    World.prototype.getHeight = function () {
        return this.height;
    };
    World.prototype.getWidth = function () {
        return this.width;
    };
    // init generates the initial world state
    World.prototype.init = function () {
        var floors = [
            new tile_1.Tile('&#8283;', 'black', 'white'),
            new tile_1.Tile('&#775;', 'black', 'white'),
            new tile_1.Tile('&#803;', 'black', 'white'),
            new tile_1.Tile('&#856;', 'black', 'white')
        ];
        var trees = [
            // new Tile('&#8483;', 'green', 'white')
            new tile_1.Tile('Y', 'green', 'white')
        ];
        // set up wall tiles
        var botLeft = new tile_1.Tile('&#9562;', 'black', 'white');
        var botRight = new tile_1.Tile('&#9565;', 'black', 'white');
        var topLeft = new tile_1.Tile('&#9556;', 'black', 'white');
        var topRight = new tile_1.Tile('&#9559;', 'black', 'white');
        // let horizontal = new Tile('&#9552;&#9552;', 'black', 'white');
        var horizontal = new tile_1.Tile('==', 'black', 'white');
        var vertical = new tile_1.Tile('&#9553;', 'black', 'white');
        for (var i = 0; i < this.height; i++) {
            this.objects[i] = [];
            for (var j = 0; j < this.width; j++) {
                if (i == 0 && j == this.width - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, botLeft);
                    continue;
                }
                if (i == 0 && j == 0) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, topLeft);
                    continue;
                }
                if (i == this.height - 1 && j == this.width - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, botRight);
                    continue;
                }
                if (i == this.height - 1 && j == 0) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, topRight);
                    continue;
                }
                if (i == 0 || i == this.height - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, vertical);
                    continue;
                }
                if (j == 0 || j == this.width - 1) {
                    this.objects[i][j] = new Environment_1.Wall(i, j, horizontal);
                    continue;
                }
                var rand = Math.floor(Math.random() * 10);
                if (rand > 7) {
                    this.objects[i][j] = new Environment_1.Tree(i, j, trees[0]);
                }
                else {
                    this.objects[i][j] = new Environment_1.Floor(i, j, floors[Math.floor(Math.random() * 4)]);
                }
            }
        }
    };
    World.prototype.getObject = function (x, y) {
        return this.objects[x][y];
    };
    World.prototype.getTiles = function () {
        var tiles = [];
        for (var i = 0; i < this.height; i++) {
            tiles[i] = [];
            for (var j = 0; j < this.width; j++) {
                tiles[i][j] = this.getObject(i, j).getTile();
            }
        }
        return tiles;
    };
    return World;
}());
exports.World = World;

},{"./Entity/Environment":5,"./tile":12}]},{},[10]);
