import { View } from "../views/view";
import { Context } from "./context";
import { Subject } from "rxjs";
import { Rgb } from "./rgb";

export class Application {
    protected static instance = new Application();
    public ctx: Context = new Context();
    public subject: Subject<Event> = new Subject<Event>();

    private constructor() {
        this.createSub(this.subject);
        this.ctx.ctx.strokeStyle = new Rgb(0, 0, 0).getColor();
        this.ctx.ctx.strokeRect(0, 0, this.ctx.width, this.ctx.height);
    }

    private createSub(subject: Subject<Event>){
        document.addEventListener("mousedown", (evt)=>{
            subject.next(evt);
        });
        document.addEventListener("mouseup", (evt)=>{
            subject.next(evt);
        });
        document.addEventListener("click", (evt)=>{
            subject.next(evt);
        });
        document.addEventListener("mousemove", (evt)=>{
            subject.next(evt);
        });
        document.addEventListener("keydown", (evt)=>{
            subject.next(evt);
        });
    }

    public static getInstance(): Application {
        return Application.instance;
    }

    public unsubsrc(oldView: View){
        oldView.cleanView(this.ctx);
        this.subject.observers.shift();
    }

    public run(view: View){
        view.setSubject(this.subject);
        view.draw(this.ctx);
    }
}