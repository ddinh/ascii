import { Actor, Corpse } from './Actor';
import { ActionDirection } from '../Actions/Action';
import { WalkAction } from '../Actions/WalkAction';
import { WaitAction } from '../Actions/WaitAction';
import { GameObject } from '../GameObject'
import { Tile } from '../tile';
import { Action } from '../Actions/Action';
import { World } from '../world';
import { Sword } from '../Items/Sword';
import { Mob } from './Mob';
import { Shovel } from '../Items/Shovel';

// Breadth first search
function bfs(world: World, start: GameObject, goal: GameObject) {
    const room = world.getActiveRoom();

    const frontier: GameObject[] = [];
    frontier.push(start);
    const cameFrom = {};

    while (frontier.length > 0) {
        const current = frontier.shift();

        if (current == goal) {
            break;
        }

        for (var next of room.getNeighboringSpaces(current.x, current.y)) {
            if (cameFrom[next.key()] == null) {
                frontier.push(next);
                cameFrom[next.key()] = current;
            }
        }
    }

    return cameFrom;
}

export class Orc extends Mob {

    public health = 2;

    constructor(name: string, x: number, y: number, tile: Tile) {
        super(name, x, y, tile, true);
        this.nextAction = new WaitAction(this);
        // Give Orcs a shovel so they can break down walls
        this.equipt = new Shovel(this.x, this.y, new Tile('/', 'black', 'black'));
    }

    takeTurn(world: World) {

        if (this.dead) return;
        if (this.debug) console.log('DEBUG:', this.name, "taking turn.", this.x, this.y);

        const nexus = world.getPlayer();
        const room = world.getActiveRoom();
        const start = room.objects[this.x][this.y];
        const cameFrom = bfs(world, start, nexus);

        let current = nexus;
        const path = []
        while (current != start) {
            path.push(current);
            current = cameFrom[current.key()];
        }

        const next = path.pop();

        let dx = this.x - next.x;
        let dy = this.y - next.y;

        let action = new WaitAction(this);
        if (dy > 0) {
            // Move down towards the player
            action = new WalkAction(ActionDirection.Up, this);
        }
        else if (dy < 0) {
            // Move up towards the player
            action = new WalkAction(ActionDirection.Down, this);
        }
        else if (dx > 0) {
            // Move left towards the player
            action = new WalkAction(ActionDirection.Left, this);
        }
        else if (dx < 0) {
            // Move right towards the player
            action = new WalkAction(ActionDirection.Right, this);
        }

        action.perform(world);
        return;
    }

    death(world: World) {

        this.dead = true;
        let objects = [];
        objects.push(new Corpse(this));

        // TODO: randomly select things from this mob's inventory to be dropped

        return objects;
    }
}
