import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
import { MapsView } from "../views/maps-view";
import { WrapperView } from "../views/wrapper-view";
import { WrapperController } from "./wrapper-controller";
export class MapsController {
    public view: MapsView;
    public gamer: GamerProfile;

    constructor(view: MapsView){
        this.view = view;
    }
}