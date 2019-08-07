import { MapsView } from "./maps-view";
import { WrapperController } from "../layout/wrapper-controller";
export class MapsController{
    public view: MapsView;
    public gamer: GamerProfile;

    constructor(view: MapsView, layoutController: WrapperController){
        this.view = view;
    }
}