import { MainView } from "../views/main-view";
import { WrapperView } from "../views/wrapper-view";
import { WrapperController } from "./wrapper-controller";

export class MainController{

    public view: MainView;
    public gamer: GamerProfile;
    public layoutView: WrapperView;
    public layoutController: WrapperController;

    constructor(view: MainView, layoutController: WrapperController){
        this.view = view;
        this.layoutController = layoutController;
        this.layoutView = layoutController.view;

        let gamer = this.layoutController.gamer;

        if(gamer){
            this.gamer = gamer;
            this.view.helloPanel.innerText.text = "Hello, " + this.gamer.login + " !";
        } else {
            this.view.helloPanel.innerText.text = "Hello!";
        }
        console.log(this.layoutController.gamer);

    }
}