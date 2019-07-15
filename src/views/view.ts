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

    //добавить указание ошибки, когда у контролов в одной панели одинаковый zOrder!! иначе есть несоответствие отрисовки и фокусировки на input

    public cleanView(context: Context){
        context.ctx.clearRect(0, 0, context.width, context.height);
    }
    public registerControl(control: Control): void{
        this.controls.push(control);
        this.controls.sort((a,b) => a.zOrder >= b.zOrder ? 1 : -1); //пересмотри способ сортировки, возможно есть лучше.
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
        let onClickControls = this.controls.filter(control => this.onControl(control, event.x, event.y));
        let firstElementMustClick = (onClickControls[onClickControls.length-1]);
        if(firstElementMustClick){
            switch(event.type) {
                case 'click' :
                    this.controls.map(c => { if(c instanceof Input){c.unfocus();}});
                    if (firstElementMustClick instanceof Input) {
                        (<Input>firstElementMustClick).focusOnMe();
                        this.inputFocus = <Input>firstElementMustClick;
                    }
                    else{
                        this.inputFocus = null;
                    }
//ПРОВЕРИТЬ НА СУЩЕСТВОВАНИЕ ФУНКЦИИ, а дефолтное значение убрать!!!!!
                    //if(firstElementMustClick.click){
                        //console.log(this);
                        firstElementMustClick.click(firstElementMustClick)
                    //};
                    return;
                case 'mousedown' :
                        firstElementMustClick.mousedown();
                    return;
                case 'mouseup' :
                        firstElementMustClick.mouseup();
                    return;
                case 'mousemove' :
                        firstElementMustClick.mousemove();
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

    private onControl(control: Input | Control, clickX: number, clickY: number): boolean{
        let res = false;
        if ((control.x) <= clickX && control.y <= clickY &&
            (control.x + control.width) >= clickX &&
            (control.y + control.height) >= clickY){
                res = true;
        }
        return res;
    }

    public draw(ctx: Context): void {
        this.controls.forEach(control => {
            control.draw(ctx.ctx);
        });
    }

}