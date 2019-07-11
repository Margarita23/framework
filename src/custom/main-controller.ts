import { Controller } from "../controllers/controller";
import { MainView } from "./main-view";
import { View } from "../models/view";

export class MainController extends Controller {

    public view: View = new MainView();

    public sayHi(){
        console.log("Hiii!!!");
    }

    public sayBye(){
        console.log('Bye');
    }

    public saySome(){
        console.log('Blah-blah-blah');
    }
}