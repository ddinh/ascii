import { Renderer } from './renderer';
import { MenuInfo, MenuOption, MenuTitle } from './Menu/Menu';
import { IO } from './io';
import { Tile } from '../tile';

// Think of Windows as rendering contexts

export class Window {
    
    public localWidth: number;
    public localHeight: number;

    public startX: number;
    public startY: number;

    public bordered: boolean = false;

    public tiles: Tile[][];

    public context: HTMLElement;

    
    constructor(startX?: number, startY?: number, localWidth?: number, localHeight?: number, tiles?: Tile[][]) {
        this.startX = startX || -1;
        this.startY = startY || -1;

        this.localWidth = localWidth;
        this.localHeight = localHeight;

        this.tiles = tiles || null;
    }

    public getContext() {
        return this.context;
    }

    show() {
        if (this.tiles) this.context.style.display = 'flex';
        else this.context.style.display = 'block';
    }

    hide() {
        this.context.style.display = 'none';
    }

    public initContext() {
        // Loop over localWidth and localHeight to initialize the literal html elements that will be in this window
        this.context = document.createElement('div');
        this.context.style.height = Renderer.pxs(this.localHeight * Renderer.elementSize);
        this.context.style.width = Renderer.pxs(this.localWidth * Renderer.elementSize);

        if (this.tiles) this.context.style.display = 'flex'; 
        else this.context.style.display = 'block';

        if (this.startX == -1 && this.startY == -1) {
            this.context.style.margin = 'auto';
            this.context.style.marginTop = Renderer.pxs(5);
        }else {
            this.context.style.position = 'absolute';
            this.context.style.left = Renderer.pxs(this.startX);
            this.context.style.top = Renderer.pxs(this.startY);
        }

        if (this.bordered) {
            this.context.style.border = 'solid';
            this.context.style.borderWidth = Renderer.pxs(2);
        }

        // Only continue for a tile based window
        if (!this.tiles) return;

        for (let i = 0; i < this.localWidth; i++) {

            let colDiv = document.createElement('div');
            colDiv.style.width = Renderer.pxs(Renderer.elementSize * this.localHeight);
        
            for (let j = 0; j < this.localHeight; j++) {
                var element = document.createElement('div');
                element.style.height = Renderer.pxs(Renderer.elementSize);
                element.style.width = Renderer.pxs(Renderer.elementSize);
                element.style.textAlign = 'center';
                element.style.userSelect = 'none';

                // element.innerHTML = tiles[i][j].ascii;
                // element.style.backgroundColor = tiles[i][j].bg;
                // element.style.color = tiles[i][j].fg;

                // IO.defineMouseOver(element, function(e, c, t) {
                    
                //     let parent = (<HTMLElement>e.target).parentNode;
                //     console.log('parent', parent);
                //     // console.log('index:', c.children.indexOf(parent));
                //     let nodes = Array.prototype.slice.call(c.children);
                //     let x_index = nodes.indexOf(parent);
                //     let y_index = Array.prototype.slice.call(nodes[x_index].children).indexOf(<HTMLElement>e.target);
                //     console.log('x-index:', x_index);
                //     console.log('y-index:', y_index);

                //     (<HTMLElement>c.children[x_index].children[y_index]).innerHTML = 'X';
                //     (<HTMLElement>c.children[x_index].children[y_index]).style.color = 'black';
                //     (<HTMLElement>c.children[x_index].children[y_index]).style.backgroundColor = 'yellow';

                // }, this.context, this.tiles);

                // IO.defineMouseOut(element, function(e, c, t) {
                    

                //     let parent = (<HTMLElement>e.target).parentNode;
                //     console.log('parent', parent);
                //     // console.log('index:', c.children.indexOf(parent));
                //     let nodes = Array.prototype.slice.call(c.children);
                //     let x_index = nodes.indexOf(parent);
                //     let y_index = Array.prototype.slice.call(nodes[x_index].children).indexOf(<HTMLElement>e.target);
                //     console.log('x-index:', x_index);
                //     console.log('y-index:', y_index);

                //     (<HTMLElement>c.children[x_index].children[y_index]).innerHTML = (<Tile>t[x_index][y_index]).ascii;
                //     (<HTMLElement>c.children[x_index].children[y_index]).style.color = (<Tile>t[x_index][y_index]).fg;
                //     (<HTMLElement>c.children[x_index].children[y_index]).style.backgroundColor = (<Tile>t[x_index][y_index]).bg;

                //     let target = e.target;
                //     target.innerHTML = (<Tile>t[x_index][y_index]).ascii

                // }, this.context, this.tiles);

                colDiv.appendChild(element);
            }
            this.context.appendChild(colDiv);
        }
    }

    /** 
    public static createGameTiles(localWidth: number, localHeight: number) {
        let containingDiv = document.createElement('div');
        containingDiv.style.display = 'flex';

        for (let i = 0; i < localWidth; i++) {

            let colDiv = document.createElement('div');
            colDiv.style.width = Renderer.pxs(Renderer.elementSize * localHeight);
        
            for (let j = 0; j < localHeight; j++) {
                var element = document.createElement('div');
                element.style.height = Renderer.pxs(Renderer.elementSize);
                element.style.width = Renderer.pxs(Renderer.elementSize);
                element.style.textAlign = 'center';
                element.style.userSelect = 'none';

                // element.innerHTML = tiles[i][j].ascii;
                // element.style.backgroundColor = tiles[i][j].bg;
                // element.style.color = tiles[i][j].fg;

                colDiv.appendChild(element);
            }
            containingDiv.appendChild(colDiv);
        }

        return containingDiv;
    } */

    public static createMenuTitle(menuTitle: MenuTitle) {
        let child = document.createElement('div');
        child.style.height = Renderer.pxs(menuTitle.rowSize * Renderer.elementSize);
        child.style.lineHeight = Renderer.pxs(menuTitle.rowSize * Renderer.elementSize);
        child.style.fontSize = '30px';
        child.style.fontStyle = 'italic';
        child.style.textAlign = 'center';
        return child;
    }

    public static createMenuOption(menuOption: MenuOption) {
        let child = document.createElement('div');
        child.style.height = Renderer.pxs(menuOption.rowSize * Renderer.elementSize);
        child.style.lineHeight = Renderer.pxs(menuOption.rowSize * Renderer.elementSize);
        child.style.margin = 'auto';
        child.style.fontSize = '18px';
        child.style.textAlign = 'left';
        child.style.width = '300px';
        child.style.height = null;
        child.style.lineHeight = null;
        return child;
    }

    public static createMenuInfo(menuInfo: MenuInfo) {
        let child = document.createElement('div');
        // child.style.height = Renderer.pxs(menuInfo.rowSize * Renderer.elementSize);
        // child.style.lineHeight = Renderer.pxs(menuInfo.rowSize * Renderer.elementSize);
        child.style.margin = 'auto';
        child.style.fontSize = '20px';
        child.style.textAlign = 'left';
        child.style.height = null;
        child.style.lineHeight = null;
        return child;
    }

}