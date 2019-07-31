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

/*
                if(trueControl && trueControl.controlType !== 'Panel'){
                    console.log(trueControl);
                    console.log("trueControl.x" + trueControl.x);
                    console.log("trueControl.newX" + trueControl.newX);
                    console.log("trueControl.pX" + trueControl.pX);
                    console.log(trueControl.x + trueControl.newX + trueControl.pX)
                    console.log(event.x);
                    //console.log((trueControl.y + trueControl.newY + trueControl.pY) <= event.y);
                    //console.log((trueControl.x + trueControl.pX + trueControl.newW) >= event.x);
                    //console.log((trueControl.y + trueControl.pY + trueControl.newH) >= event.y);
                } else {
                    console.log("not here");
                }
*/


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
                    this.createNewHOLST(this.scrollWidget, this.scrollWidget.parent);
                    
                    
                    //this.moveVerticalScroll(this.scrollWidget, event.y);
                }
                return;
        }
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


        // console.log(shiftAtAll); // на сколько сдвинуть контент вниз или вверх.


        // this.ctx.clearRect(parent.x + parent.pX, parent.y + parent.pY, parent.newW, parent.newH);
        
        //this.createNewHOLST(widget, parent);
        //this.ctx.drawImage(this.canvas1, 0, shiftAtAll, parent.newW, parent.newH, parent.x + parent.pX, parent.y + parent.pY, parent.newW, parent.newH);
        //this.canvas1.remove();
    }

//---------------------------------
    private createNewHOLST(widget: Control, control: Control){

        this.canvas1.width = control.width;
        this.canvas1.height = (<Panel>control).wholeHeight;
        this.ctx1 = this.canvas1.getContext("2d");
        if(control.backgroundColor){
            this.ctx1.fillStyle = control.backgroundColor.getColor();
            this.ctx1.fillRect(0, 0, control.width, (<Panel>control).wholeHeight);
        }

        if(control.backgroundImage){
            this.ctx1.drawImage(control.backgroundImage, 0, 0, control.width, (<Panel>control).wholeHeight);
        }

        if(control.border){
            this.ctx1.strokeStyle = control.border.getColor();
            this.ctx1.strokeRect(0, 0, control.width, (<Panel>control).wholeHeight);
        };
        


        this.ctx1.fillStyle =( new Rgb(200,10,10)).getColor();
        this.ctx1.fillRect(700,700,200,200);

        
        //let f = widget.parent.controls.filter(c => c != widget);
        //this.draw(f, this.ctx1);

        //console.log(f);
        
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



    /*
    //-------------------------
    public drawPhotoContainerProperties(control: Panel) {
        let buffCtx = this.ctx;
        this.draw([control], this.ctx1);
        for(let i=0; i < 3; i ++) {
            for(let j=0; j < 5; j ++) {
                this.createPhotos(i, j, control);
            }
        }
        this.ctx = buffCtx;
    }

    private createPhotos(i: number, j: number, control: Panel){
        let photo = new Button;
        photo.x = 300*i + 50;
        photo.y = 300*j + 50;
        photo.width = 250;
        photo.height = 250;
        /*
        try {
            let im = new Image();
            im.src = require("../assets/photo"+ i + j + ".svg");
            im.onload = () => {
                photo.backgroundImage = im;
            }
        } catch (error) {
            let im = new Image();
            im.src = require("../assets/no-photo.svg");
            photo.backgroundImage = im;
            im.onload = () => {
                photo.backgroundImage = im;
            }
        }
        

        photo.name = "photo" + i + j;
        photo.text = photo.name;
        photo.parent = control;
        this.registerControl(photo);
    }
    */
}