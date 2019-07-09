import { Controller } from "../controllers/controller";
import { View } from "../models/view";
import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";

export class LoginController extends Controller{
    public submitLoginAndPassword(this: View){
        let inputControls = this.controls.filter((control)=> control.getControlType() === "Input");
        console.log("login: " + (<Input>inputControls[0]).inputText.getText() + "; password: " + (<Input>inputControls[1]).inputText.text);
    }

    public checkedToShowPassword(this: Checkbox, passwordInput: Input): void {
        if(!this.checked) {
            this.isChecked();
            passwordInput.inputText.secret = false;
        }else {
            this.isNotChecked();
            passwordInput.inputText.secret = true;
        }
        passwordInput.printText();
        console.log(passwordInput.inputText.getText());
    }
}