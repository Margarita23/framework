import { Controller } from "../controllers/controller";
import { View } from "../models/view";
import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { LoginView } from "./login-view";
import { MainView } from "./main-view";
import { MainController } from "./main-controller";
import { Application } from "../models/application";

export class LoginController extends Controller{

    constructor(view: View){
        super(view);
    }

    public run(){
        (<LoginView>this.view).submitButton.click = this.goToMainPage.bind(null);
        (<LoginView>this.view).mainPage.click = this.goToMainPage.bind(null);
    }

    private goToMainPage(): void{
        const mainView = new MainView();
        const mainController = new MainController(mainView);
        (Application.getInstance()).run(mainView);
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