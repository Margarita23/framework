//import { Subject } from "rxjs";
//import { Context } from "./context";
import { Controller } from "../controllers/controller";
import { View } from "./view";
import { Context } from "./context";
import { Subject } from "rxjs";

export class Application {
    protected static instance = new Application();
    public ctx: Context = new Context();
    public subject: Subject<Event> = new Subject<Event>();

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

    public run(view: View){
        view.setSubject(this.subject);
        view.run();
        view.draw(this.ctx);
    }
}