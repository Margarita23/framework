//import { Subject } from "rxjs";
//import { Context } from "./context";
import { Controller } from "../controllers/controller";

export class Application {
    private mainController: Controller = new Controller();
    protected static instance = new Application();

    private constructor() {
        document.addEventListener("click", (evt)=>{
            this.mainController.subject.next(evt);
        });
        document.addEventListener("mouseup", (evt)=>{
            this.mainController.subject.next(evt);
        });
        document.addEventListener("mousedown", (evt)=>{
            this.mainController.subject.next(evt);
        });
        document.addEventListener("mousemove", (evt)=>{
            this.mainController.subject.next(evt);
        });

        document.addEventListener("keydown", (evt)=>{
            this.mainController.subject.next(evt);
        });

    }

    public static getInstance(): Application {
        return Application.instance;
    }

    public setStartController(controller: Controller){
        if(controller){
            this.mainController.localController = controller;
        }
    }

    public run(){
        if(this.mainController.localController){
            this.mainController.localController.view.run();
        }
    }
}