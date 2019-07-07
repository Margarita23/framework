import { Controller } from "../controllers/controller";
import { View } from "../models/view";
import { Input } from "../models/input";

export class LoginController extends Controller{
    public submitLoginAndPassword(this: View){
        let inputControls = this.controls.filter((control)=>(<Object>control).constructor.name === "Input");
        
        console.log("login: " + (<Input>inputControls[0]).inputText.getText() + "; password: " + (<Input>inputControls[1]).inputText.text);
    }
}