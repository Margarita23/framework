import { Control } from "../models/control";
import { Subject } from "rxjs";
import { Input } from "../models/input";
import { Context } from "../models/context";
import { Button } from "../models/button";

export class View {
    public controls: Control[] = [];
    public inputFocus: Input = null;
    public mainButtonPage = new Button();
    public contactsButtonPage = new Button();
    public playButtonPage = new Button();
    public ctx: CanvasRenderingContext2D;

    constructor(){
        this.goToContactPage();
        this.goToMainPage();
        this.goPlay();
    }

    public goToMainPage(){
        this.mainButtonPage.text = "Main page";
        this.registerControl(this.mainButtonPage);
    }

    public goToContactPage(){
        this.contactsButtonPage.text = "Contacts";
        this.contactsButtonPage.x = this.mainButtonPage.width;
        this.contactsButtonPage.y = 0;
        this.registerControl(this.contactsButtonPage);
    }

    public goPlay(){
        this.playButtonPage.text = "Go to play";
        this.playButtonPage.x = this.mainButtonPage.width*2;
        this.playButtonPage.y = 0;
        this.registerControl(this.playButtonPage);
    }

    public cleanView(context: Context){
        context.ctx.clearRect(0, 0, context.width, context.height);
    }
    public registerControl(control: Control): void{
        this.controls.push(control);
        this.controls.sort((a,b) => a.zOrder >= b.zOrder ? 1 : -1);
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
        let onControls = this.controls.filter(control => this.onControl(control, event.x, event.y))
        .sort((a,b) => a.zOrder <= b.zOrder ? 1 : -1)
        let trueControl = onControls[0];
        if(trueControl){
            switch(event.type) {
                case 'mousedown' :
                        if(trueControl.mousedown){
                            trueControl.mousedown(trueControl);
                        }
                    return;
                case 'mouseup' :
                        if(trueControl.mouseup){
                            trueControl.mouseup(trueControl);
                        }
                    return;
                case 'click' :

                    if(trueControl.click){
                        this.controls.map(c => { if(c instanceof Input){c.unfocus();}});
                        if (trueControl instanceof Input) {
                            (<Input>trueControl).focusOnMe();
                            this.inputFocus = <Input>trueControl;
                        }
                        else{
                            this.inputFocus = null;
                        }
                        trueControl.click(trueControl);
                    }
                    return;
                case 'mousemove' :
                        if(trueControl.mousemove){
                            trueControl.mousemove(trueControl);
                        }
                    return;
            }
        }
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
        if ((control.x) <= clickX && control.y <= clickY &&
            (control.x + control.width) >= clickX &&
            (control.y + control.height) >= clickY){
                res = true;
        }
        return res;
    }

    public draw(ctx: Context): void {
        this.ctx = ctx.ctx;
        this.controls.forEach(control => {
            control.draw(ctx.ctx);
        });
    }

}