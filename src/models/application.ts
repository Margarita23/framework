import { Subject } from "rxjs";
import { Context } from "./context";
import { Controller } from "../controllers/controller";

export class Application {
    private localController: Controller;
    public subject: Subject<Event> = new Subject<Event>();
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

    public setStartController(controller: Controller){
        if(controller){
            this.localController = controller;
        }
    }

    public run(){
        if(this.localController){
            this.localController.view.setSubject(this.subject);
            this.localController.run();
        }
    }
}