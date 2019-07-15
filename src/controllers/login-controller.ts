import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { LoginView } from "../views/login-view";
import { Application } from "../models/application";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
export class LoginController{

    public view: LoginView;
    public login: string = "";
    public password: string = "";
    public gender: string = "no gender";
    public gamer: GamerProfile;

    constructor(view: LoginView){
        this.view = view;
        this.view.checkboxShowPass.click = this.checkedToShowPassword.bind(this.view.checkboxShowPass, this);
        this.view.genderRadios.forEach(radio => {
            radio.click = this.checkedMaleOrFemale.bind(radio, this.view.genderRadios.filter(r => r.name !== radio.name && !r.disabled), this);
        });
        this.view.submitButton.click = this.submitRegister.bind(null, this);
    }

    private goToMainPage(old: LoginView, gamer: GamerProfile): void{
        const mainView = new MainView();
        const mainContr = new MainController(mainView, gamer);
        (Application.getInstance()).unsubsrc(old);
        (Application.getInstance()).run(mainView);
    }

    public submitRegister(controller: LoginController): void{
        let inputControls = controller.view.controls.filter(control => control instanceof Input);
        controller.login = (<Input>inputControls[0]).inputText.text;
        controller.password = (<Input>inputControls[1]).inputText.text;
        let loginForm: GamerProfile = {
            login: controller.login,
            password: controller.password,
            gender: controller.gender
        };
        controller.gamer = loginForm;
        controller.goToMainPage(controller.view, loginForm);
    }

    public checkedToShowPassword(controller: LoginController): void {
        let box: Checkbox = <any>this;
        if(box.checked) {
            (<Checkbox>(<any>this)).checked = false;
            controller.view.pass.inputText.secret = true;
        } else {
            (<Checkbox>(<any>this)).checked = true;
            controller.view.pass.inputText.secret = false;
        }
        controller.view.pass.printText();
    }

    public checkedMaleOrFemale(radioElse: RadioButton[], controller: LoginController): void{
        let radio: RadioButton = <any>this;
        if(radio.checked) {
            (<RadioButton>(<any>this)).checked = false;
        } else {
            (<RadioButton>(<any>this)).checked = true;
            controller.gender = (<RadioButton>(<any>this)).name;
            radioElse.forEach(radio => {
                radio.checked = false;
            });
        }
    }
}