import { View } from "./view";
import { Subject } from "rxjs";
import { Context } from "./context";

export class Application {
    public views: View[] = [];
    public subject: Subject<Event> = new Subject<Event>();
    public ctx: Context = new Context();
    protected static instance = new Application();

    private constructor() {
        document.addEventListener("click", (evt)=>{
            this.subject.next(evt);
        });
        document.addEventListener("mouseup", (evt)=>{
            this.subject.next(evt);
        });
        document.addEventListener("mousedown", (evt)=>{
            this.subject.next(evt);
        });
        document.addEventListener("mousemove", (evt)=>{
            this.subject.next(evt);
        });

        document.addEventListener("keydown", (evt)=>{
            this.subject.next(evt);
        });
    }

    public static getInstance(): Application {
        return Application.instance;
    }

    public registerView(...views: View[]){
        views.forEach(view => {
            this.views.push(view);
        });
    }

    public run(){
        this.views[1].setSubject(this.subject);
        this.views[1].run();
        this.views[1].draw(this.ctx);
    }
}