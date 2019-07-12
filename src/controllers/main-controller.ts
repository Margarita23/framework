import { MainView } from "../views/main-view";
import { View } from "../models/view";

export class MainController{

    public view: MainView;

    constructor(view: View){
        this.view = <MainView>view;
    }

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