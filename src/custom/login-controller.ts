import { Controller } from "../controllers/controller";
import { View } from "../models/view";
import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";

export class LoginController extends Controller{

    public submitLoginAndPassword(this: View): void{
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
    }

    public checkedMaleOrFemale(radioButtChecked: RadioButton, radioButtElse: RadioButton): void{
        if(!radioButtChecked.checked) {
            radioButtChecked.isChecked();
            if(radioButtElse.checked){
                radioButtElse.isNotChecked();
            }
        }else {
            radioButtChecked.isNotChecked();
        }
    }
}