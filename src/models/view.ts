import { Control } from "../controls/control";
import { Subject } from "rxjs";
import { Input } from "../controls/input";
import { Context } from "./context";

export abstract class View {
    public controls: Control[] = [];
    public inputFocus: Input = null;
    public ctx: CanvasRenderingContext2D;
    public hoverControl: Control;
    public bufferForHoverControl: Control;

    constructor(){}

    public registerControl(control: Control): void{
        if(control.parent){
            control.parent.controls.push(control);
        } else {
            this.controls.push(control);
        }
    }

    public setSubject(globalEvent: Subject<any>){
        globalEvent.subscribe(event => {
            switch(this.whichEvent(event.type)){
                case 'MouseEvent': this.reactionOnMouseEvent(event); break;
                case 'KeyBoard': this.reactionOnKeyBoardEvent(event); break;
                default : break;
            }
        });
    }

    private reactionOnMouseEvent(event: MouseEvent): void{
        let res = new Array<Control>();
        this.searchNeededControl(res, this.controls, event.x, event.y);

        let trueControl = res[res.length - 1];
        switch(event.type) {
            case 'mousedown' :
                    if(trueControl && trueControl.mousedown){
                        trueControl.mousedown(trueControl);
                    }
                return;
            case 'mouseup' :
                if( trueControl && trueControl.mouseup){
                    setTimeout(this.runAfterUpWithSlowerReaction, 200, trueControl);
                }
                return;
            case 'click' :
                if(trueControl && trueControl.click){
                    setTimeout(this.runAfterClickWithSlowerReaction, 300, this, trueControl);
                }
                return;
            case 'mousemove' :
                if(trueControl){
                    if(trueControl.mousemove){
                        if(trueControl !== this.hoverControl) {
                            if(this.hoverControl && this.hoverControl.mouseover){
                                this.hoverControl.mouseover(this.hoverControl);
                            }
                            this.hoverControl = trueControl;
                        }
                        trueControl.mousemove(trueControl);
                    } else {
                        if(this.hoverControl && this.hoverControl.mouseover){
                            this.hoverControl.mouseover(this.hoverControl);
                        }
                        this.hoverControl = null;
                    }
                } else {
                    if(this.hoverControl && this.hoverControl.mouseover){
                        this.hoverControl.mouseover(this.hoverControl);
                    }
                    this.hoverControl = null;
                }
                return;
        }
    }

    private searchNeededControl(ret: Control[], controls: Control[], eX: number, eY: number): void{
        controls.forEach(control => {
            if(this.onControl(control, eX, eY)){
                if(control.controls.length === 0){
                    ret.pop();
                }
                ret.push(control);
            }
            if(control.controls.length !== 0){
                this.searchNeededControl(ret, control.controls, eX, eY);
            }
        });
    }

    private runAfterUpWithSlowerReaction(trueControl: Control){
        trueControl.mouseup(trueControl);
    }

    private runAfterClickWithSlowerReaction(view: View, trueControl: Control){
        view.allInputUnFocus(view.controls)
        if (trueControl instanceof Input) {
            trueControl.focusOnMe();
            view.inputFocus = <Input>trueControl;
        }
        else{
            view.inputFocus = null;
        }
        trueControl.click(trueControl);
    }

    private allInputUnFocus(controls: Control[]){
        controls.forEach(control => {
            if(control instanceof Input){
                control.unfocus();
            }
            if(control.controls.length !== 0){
                this.allInputUnFocus(control.controls);
            }
        });
    }

    private reactionOnKeyBoardEvent(event: KeyboardEvent): void {
        if(this.inputFocus !== null && this.checkInputKye(event)){
            this.inputFocus.inputText.addText(event.key);
            this.inputFocus.printText();
        }
    }

    private checkInputKye(e: KeyboardEvent): boolean{
        let res = false;
        if(e.key !== "Tab" && e.key !== "Shift" && e.key !== "CapsLock" &&
            e.key !== "Control" && e.key !== "Alt" && e.key !== "Meta" &&
            e.key !== "Enter" && e.key !== "Escape" && e.key !== "Unidentified"){
            res =true;
        }
        return res;
    }

    private whichEvent(ev: string): string{
        let res = '';
        if(ev === 'click' || ev === 'mousedown' || ev === 'mouseup' || ev === 'mousemove'){
            res = 'MouseEvent';
        }else if(ev === 'keydown' || ev === 'keyup'){
            res = 'KeyBoard';
        }
        return res;
    }

    private onControl(control: Control, clickX: number, clickY: number): boolean{
        let res = false;
        if((control.x + control.pX) <= clickX && (control.y + control.pY) <= clickY &&
            (control.x + control.pX + control.newW) >= clickX &&
            (control.y + control.pY + control.newH) >= clickY){
            res = true;
        }
        return res;
    }

    public draw(controls: Control[], ctx: Context): void {
        this.ctx = ctx.ctx;
        controls.forEach(control => {
            control.draw(this.ctx);
            if(control.controls.length !== 0){
                this.draw(control.controls, ctx);
            }
        });
    }
}