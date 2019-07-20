import { MapsView } from "../views/maps-view";
export class MapsController {
    public view: MapsView;
    public gamer: GamerProfile;

    constructor(view: MapsView){
        this.view = view;
    }
}