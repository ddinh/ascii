import { Action, ActionDirection } from "./Action";
import { Actor }  from "../Actors/Actor";
import { Floor } from "../Rooms/Environment";
import { World } from "../world";

export class WalkAction extends Action {
    
    private dir: ActionDirection;

    constructor(dir: ActionDirection, actor: Actor) {
        super(actor);
        this.dir = dir;
    }

    perform(world: World) {

        let room = world.getActiveRoom();

        let fromObject = room.getObject(this.actor.x, this.actor.y);

        if (this.dir == ActionDirection.Up) {
            let object = room.getObject(this.actor.x, this.actor.y - 1);
            // IF OBJECT IS A DOOR, PERFORM A DoorAction (or something similar) ON THIS ACTOR, and return.
            if (!object.collides) {

                if (fromObject instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).removeOccupation();
                }

                this.actor.y = this.actor.y - 1;

                if (object instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).setOccupation(this.actor);
                }
                
            } else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        else if (this.dir == ActionDirection.Down) {
            let object = room.getObject(this.actor.x, this.actor.y + 1);
            if (!object.collides) {           
                
                if (fromObject instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).removeOccupation();
                }

                this.actor.y = this.actor.y + 1;

                if (object instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).setOccupation(this.actor);
                }
            } else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        else if (this.dir == ActionDirection.Left) {
            let object = room.getObject(this.actor.x - 1, this.actor.y);
            if (!object.collides) {
                if (fromObject instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).removeOccupation();
                }

                this.actor.x = this.actor.x - 1;

                if (object instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).setOccupation(this.actor);
                }
                
            } else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }
        else if (this.dir == ActionDirection.Right) {
            
            let object = room.getObject(this.actor.x + 1, this.actor.y);
            if (!object.collides) {
                if (fromObject instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).removeOccupation();
                }

                this.actor.x = this.actor.x + 1;

                if (object instanceof Floor) {
                    (<Floor>room.objects[this.actor.x][this.actor.y]).setOccupation(this.actor);
                }
                
            } else {
                if (this.actor.debug) {
                    console.log('COLLISION: ', this.actor);
                }
            }
        }

        // In theory, if we DONT do the rendering update here, then the movement is completely independent of the renderer which is ideal

    }
}

