import { Control } from "./control";
import { Subject } from "rxjs";

export class View {
    protected controls: Control[] = [];
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public width: number = document.body.offsetWidth;
    public height: number = document.body.offsetHeight;

    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    protected registerControl(control: Control): void{
        this.controls.push(control);
    }

    public run(){}

    public setSubject(globalEvent: Subject<any>){
        globalEvent.subscribe(event => {
            let onClickControls = this.controls.filter(control => this.onControl(control, event));
            

            if((onClickControls[onClickControls.length-1])){

                switch(event.type) {
                    case 'click' :
                        (onClickControls[onClickControls.length-1]).click();
                        return;
                    case 'mousedown' :
                        (onClickControls[onClickControls.length-1]).mousedown();
                        return;
                    case 'mouseup' :
                        (onClickControls[onClickControls.length-1]).mouseup();
                        return;
                    case 'mousemove' :
                        (onClickControls[onClickControls.length-1]).mousemove();
                        
                        return;
                }

            }

            
        });
    }

    private onControl(control: Control, event: any): boolean{
        let res = false;
        if ((control.x) <= event.x && control.y <= event.y &&
            (control.x + control.width) >= event.x &&
            (control.y + control.height) >= event.y){
                res = true;
            }
        return res;
    }

    public draw(): void {
        this.controls.sort((a,b) => a.zOrder <= b.zOrder ? 1 : -1);
        this.controls.forEach(control => {
            control.draw();
        });
    }
}