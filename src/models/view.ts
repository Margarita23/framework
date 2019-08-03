import { Control } from "../controls/control";
import { Subject } from "rxjs";
import { Input } from "../controls/input";
import { Panel } from "../controls/panel";
import { Button } from "../controls/button";
import { Rgb } from "./rgb";

export abstract class View {
    public controls: Control[] = [];
    public inputFocus: Input = null;
    public ctx: CanvasRenderingContext2D;
    public hoverControl: Control;
    public bufferForHoverControl: Control;
    public scrollPanel: Control;
    public scrollWidget: Control;
    public cutImage: ImageData;
    public ctx1: CanvasRenderingContext2D;
    public canvas1 = document.createElement("canvas");

    public shiftAtAll: number = 0;
    public isDown: boolean = false;

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
                if(trueControl && trueControl.parent instanceof Panel
                    && trueControl.parent.widgetVertical === trueControl
                    && trueControl.parent.isScroll){
                        this.scrollWidget = trueControl;
                        this.scrollPanel = trueControl.parent;
                } else {
                    this.scrollWidget = null;
                    this.scrollPanel = null;
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

                if(this.scrollWidget && this.scrollPanel){

                    this.canvas1.width = this.scrollPanel.x + this.scrollPanel.width;
                    this.canvas1.height = this.scrollPanel.y + (<Panel>this.scrollWidget.parent).wholeHeight;
                    this.ctx1 = this.canvas1.getContext("2d");
                    
                    



                    this.createNewHOLST(this.scrollWidget, this.scrollWidget.parent, this.ctx1);
                    this.moveVerticalScroll(this.scrollWidget, event.y);
                }
                return;
        }
    }

    //---------------------------------
    private createNewHOLST(widget: Control, control: Control, ctx: CanvasRenderingContext2D){

        if(control.backgroundColor){
            this.ctx1.fillStyle = control.backgroundColor.getColor();
            this.ctx1.fillRect(control.x + control.pX, control.y + control.pY, control.width, (<Panel>control).wholeHeight);
        }

        if(control.backgroundImage){
            this.ctx1.drawImage(control.backgroundImage, control.x + control.pX, control.y + control.pY, control.width, (<Panel>control).wholeHeight);
        }
        if(control.border){
            this.ctx1.strokeStyle = control.border.getColor();
            this.ctx1.strokeRect(control.x + control.pX, control.y + control.pY, control.width, (<Panel>control).wholeHeight);
        };

        let f = this.scrollWidget.parent.controls.filter(c => c ! = this.scrollWidget);
            this.reDraw(f, this.ctx1);
    }

    public reDraw(controls: Control[], ctx: CanvasRenderingContext2D): void {
        controls.forEach(control => {
            control.ctx1 = ctx;
            control.draw(ctx);
            if(control.controls.length !== 0){
                this.reDraw(control.controls, ctx);
            }
        });
    }

    private searchNeededControl(ret: Control[], controls: Control[], eX: number, eY: number): void {
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

    private moveVerticalScroll(widget: Control, y: number): void{
        this.calculateShowYPos(<Button>widget, <Panel>widget.parent);


        this.redrawWidget(widget, y);
    }

    redrawWidget(widget: Control, y: number): void{
        if(y <= widget.pY){
            widget.y = 0;
        } else if(y >= widget.pY + widget.parent.newH){
            widget.y = widget.parent.newH - widget.newH;
        } else if(y >= widget.pY + widget.newH && y <= widget.pY + widget.parent.newH){
            widget.y = y - widget.pY - widget.newH;
        }

        this.ctx.fillStyle = (new Rgb(255,255,255)).getColor();
        this.ctx.fillRect(widget.parent.newW - widget.newW + widget.pX, widget.parent.y + widget.parent.pY , widget.newW, widget.parent.newH);
        this.ctx.strokeStyle = (new Rgb(0,0,0)).getColor();
        this.ctx.strokeRect(widget.parent.newW - widget.newW + widget.pX, widget.parent.y + widget.parent.pY , widget.newW, widget.parent.newH);
        this.draw([widget], this.ctx);
    }

    private calculateShowYPos(widget: Button, parent: Panel){
        let persentOfRoad = widget.y * 100 / parent.newH;
        let moveOnY = parent.wholeHeight - parent.newH;
        let newPanelY = (moveOnY*persentOfRoad) / 100;

        let littleRoadPercent = (widget.y * 100) / parent.newH;
        let shiftAtAll = ((parent.wholeHeight - parent.newH) * littleRoadPercent) / 100;
        //shiftAtAll - на сколько сдвинуть контент вниз или вверх.
        this.ctx.clearRect(parent.x + parent.pX, parent.y + parent.pY, parent.newW, parent.newH);
        this.scrollPanel.draw(this.ctx);
        let f = this.scrollPanel.controls.filter(c => c ! = this.scrollWidget);

        if(this.shiftAtAll < shiftAtAll){
            this.isDown = true;
        } else if (this.shiftAtAll > shiftAtAll){
            this.isDown = false;
        } else{
            this.isDown = null;
        }

        console.log("button.x before = " + f[2].newX);
        if(this.isDown !== null){
            let shift = this.shiftAtAll - shiftAtAll;
            f.map(c => {c.y = c.y + shift});
            this.shiftAtAll = shiftAtAll;
        }
        console.log("button.x after = " + f[2].newX);

        

        this.ctx.clearRect(parent.x + parent.pX, parent.y + parent.pY, parent.newW, parent.newH);
        this.draw(f, this.ctx);
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
            e.key !== "Enter" && e.key !== "Escape" && e.key !== "Unidentified" &&
            e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "ArrowUp" &&
            e.key !== "ArrowDown"){
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
        //-------- checking for over control --------
        if(control.x < 0 && control.y < 0) {
            if( (control.x + control.newX + control.pX) <= clickX && (control.y + control.newY + control.pY) <= clickY &&
            (control.x + control.pX + control.newW) >= clickX &&
            (control.y + control.pY + control.newH) >= clickY) {
                res = true;
            }
            return res;
        } else if (control.x < 0) {
            if( (control.x + control.newX + control.pX) <= clickX && (control.y + control.pY) <= clickY &&
            (control.x + control.pX + control.newW) >= clickX &&
            (control.y + control.pY + control.newH) >= clickY) {
                res = true;
            }
            return res;
        } else if (control.y < 0) {
            if( (control.x + control.pX) <= clickX && (control.y + control.newY + control.pY) <= clickY &&
            (control.x + control.pX + control.newW) >= clickX &&
            (control.y + control.pY + control.newH) >= clickY) {
                res = true;
            }
            return res;
        }
        //----------------

        if( (control.x + control.pX) <= clickX && (control.y + control.pY) <= clickY &&
            (control.x + control.pX + control.newW) >= clickX &&
            (control.y + control.pY + control.newH) >= clickY) {
            res = true;
        }
        return res;
    }

    public draw(controls: Control[], ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
        controls.forEach(control => {
            control.draw(this.ctx);
            if(control.controls.length !== 0){
                this.draw(control.controls, ctx);
            }
        });
    }
}