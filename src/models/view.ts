import { Control } from "./control";
import { Subject } from "rxjs";
import { Input } from "./input";

export class View {
    protected controls: Control[] = [];
    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public width: number = document.body.offsetWidth;
    public height: number = document.body.offsetHeight;
    public inputFocus: Input = null;

    //добавить указание ошибки, когда у контролов в одной панели одинаковый zOrder!! иначе есть несоответствие отрисовки и фокусировки на input

    constructor(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    protected registerControl(control: Control): void{
        this.controls.push(control);
        this.controls.sort((a,b) => a.zOrder <= b.zOrder ? 1 : -1); //пересмотри способ сортировки, возможно есть лучше.
    }

    public run(){}

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
                    this.controls.map(c => { if(c.constructor.name === "Input"){(<Input>c).unfocus();}});
                    if (firstElementMustClick.constructor.name === "Input") {
                        (<Input>firstElementMustClick).focusOnMe();
                        this.inputFocus = <Input>firstElementMustClick;
                    }
                    else{
                        this.inputFocus = null;
                    }
                    firstElementMustClick.click();
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

    private reactionOnKeyBoardEvent(event: KeyboardEvent): void{
        if(this.inputFocus !== null){
            
            this.inputFocus.text += event.key;
            this.inputFocus.printText();

            console.log(this.inputFocus.text);

        }else{
            console.log('There is no input with focus');
        }
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

    public draw(): void {
        //this.controls.sort((a,b) => a.zOrder <= b.zOrder ? 1 : -1); //пересмотри способ сортировки, возможно есть лучше.
        this.controls.forEach(control => {
            control.draw();
        });
    }
}