import { Controller } from "../controllers/controller";

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
}