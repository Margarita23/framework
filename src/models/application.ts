import { View } from "./view";
import { MainView } from "../custom/main-view";
import { Subject } from "rxjs";

export class Application {

    public views: View[] = [];
    public subject: Subject<MouseEvent> = new Subject<MouseEvent>();
    protected static instance = new Application();

    private constructor() {
        document.addEventListener("click", (evt)=>{
            this.subject.next(evt);
        });
        this.registerViews();
    }

    public static getInstance(): Application {
        return Application.instance;
    }

    private registerViews(){
        this.views.push(MainView.getInstance());
    }

    public run(){
        this.views[0].setSubject(this.subject);
        this.views[0].run();
        this.views[0].draw();
    }
}