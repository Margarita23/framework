import { View } from "../views/view";
import { Context } from "./context";
import { Subject } from "rxjs";

export class Application {
    protected static instance = new Application();
    public ctx: Context = new Context();
    public subject: Subject<Event> = new Subject<Event>();

    private constructor() {
        this.createSub(this.subject);
    }

    private createSub(subject: Subject<Event>){
        document.addEventListener("click", (evt)=>{
            subject.next(evt);
        });
        document.addEventListener("mouseup", (evt)=>{
            subject.next(evt);
        });
        document.addEventListener("mousedown", (evt)=>{
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