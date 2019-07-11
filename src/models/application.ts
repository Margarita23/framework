import { Subject } from "rxjs";
import { Context } from "./context";
import { Controller } from "../controllers/controller";

export class Application {
    private mainController: Controller = new Controller();
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

    public registerControllers(controllers: Controller[]){
        this.mainController.controllers = controllers;
        if(controllers[0]){
            this.mainController.localController = controllers[0];
        }
    }

    public run(){
        if(this.mainController.localController){
            this.mainController.localController.view.setSubject(this.subject);
            this.mainController.localController.view.run();
            this.mainController.localController.view.draw(this.ctx);
        }
    }
}