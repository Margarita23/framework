import { Controller } from "../controllers/controller";
import { View } from "../models/view";
import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { LoginView } from "./login-view";
import { MainController } from "./main-controller";

export class LoginController extends Controller{
    public view: View = new LoginView();

    constructor(){
        super();
        console.log(this);
    }

    public run(){
        console.log(this);
        //super.run();
        //(<LoginView>this.view).submitButton.click = this.goToMainPage.bind(null);
        //this.view.registerControl( (<LoginView>this.view).submitButton);
        //console.log(this.view);
    }

    private goToMainPage(): void{
        super.localController = new MainController();
    }

    public submitLoginAndPassword(this: View): void{
        let inputControls = this.controls.filter(control => control.getControlType() === "Input");
        let maleOrFemale = this.controls.filter( control => control.getControlType() === "RadioButton" && (<RadioButton>control).checked);
        let gender = "no gender";
        if(<RadioButton>maleOrFemale[0]){
            gender = (<RadioButton>maleOrFemale[0]).name;
        }
        //console.log("login: " + (<Input>inputControls[0]).inputText.getText() + "; password: " + (<Input>inputControls[1]).inputText.text + "; gender: " + gender);
    }
//УБРАТЬ ЭТУ ФУНКЦИЮ и сделать это
    public checkedToShowPassword(checkbox: Checkbox, passwordInput: Input): void {
        if(!checkbox.checked) {
            checkbox.checked = true;
            passwordInput.inputText.secret = true;
        }else {
            checkbox.checked = false;
            passwordInput.inputText.secret = true;
        }

        passwordInput.printText();
    }

    public checkedMaleOrFemale(radioChecked: RadioButton, ...radioButtsElse: RadioButton[]): void{
        console.log(radioChecked);
        /*
        if(!radioButtChecked.checked) {
            radioButtChecked.isChecked();

            radioButtsElse.forEach( radButt => {
                if(radButt.checked){
                    radButt.isNotChecked();
                }
            });
        }else {
            radioButtChecked.isNotChecked();
        }
        */
    }
}