import { Controller } from "../controllers/controller";
import { Control } from "../models/control";
import { Rgb } from "../models/rgb";

export class MainController extends Controller {
    public sayHi(){
        console.log("Hiii!!!");
    }

    public sayBye(){
        console.log('Bye');
    }

    public saySome(){
        console.log('Blah-blah-blah');
    }

    public changeColorToRed(control: Control){
        control.backgroundColor = new Rgb(250,0,0);
        control.draw();
    }

    public changeColorToGrey(control: Control){
        control.backgroundColor = new Rgb(190,190,190);
        control.draw();
    }
}