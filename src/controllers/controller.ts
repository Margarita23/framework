import { View } from "../models/view";
import { Context } from "../models/context";
import { Subject } from "rxjs";

export class Controller {
    private _localController: Controller;
    public view: View;
    public ctx: Context = new Context();
    public subject: Subject<Event> = new Subject<Event>();

    constructor(){}

    get localController() { return this._localController };
    set localController(contrl: Controller) {
        this._localController = contrl;
    }

    public run(): void {
        this.localController.view.setSubject(this.subject);
        this.view.run();

        console.log(this.view);
        this.view.draw(this.ctx);
    }

}