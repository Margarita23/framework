import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { LoginView } from "../views/login-view";
import { Application } from "../models/application";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
import { ContactsView } from "../views/contacts-view";
import { ContactsController } from "./contacts-controller";

export class LoginController{

    public view: LoginView;
    public login: string = "";
    public password: string = "";
    public gender: string = "no gender";

    constructor(view: LoginView){
        this.view = view;
        this.view.mainButtonPage.click = this.goToMainPage.bind(this.view.mainButtonPage, this.view);
        this.view.contactsButtonPage.click = this.goToContactPage.bind(this.view.contactsButtonPage, this.view);
        this.view.checkboxShowPass.click = this.checkedToShowPassword.bind(this.view.checkboxShowPass, this);
        this.view.genderRadios.forEach(radio => {
            radio.click = this.checkedMaleOrFemale.bind(radio, this.view.genderRadios.filter(r => r.name !== radio.name), this);
        });
        this.view.submitButton.click = this.submitLoginAndPassword.bind(null, this);
    }

    private goToMainPage(old: LoginView, loginForm: LoginForm): void{
        const mainView = new MainView();
        const mainContr = new MainController(mainView);
        (Application.getInstance()).unsubsrc(old);
        (Application.getInstance()).run(mainView);
    }
    private goToContactPage(oldView: LoginView): void{
        const contactsView = new ContactsView();
        const contactsContr = new ContactsController(contactsView);
        (Application.getInstance()).unsubsrc(oldView);
        (Application.getInstance()).run(contactsView);
    }

    public submitLoginAndPassword(controller: LoginController): void{
        let inputControls = controller.view.controls.filter(control => control instanceof Input);
        controller.login = (<Input>inputControls[0]).inputText.text;
        controller.password = (<Input>inputControls[1]).inputText.text;
        let loginForm = {login: controller.login, password: controller.password, gender: controller.gender};
        controller.goToMainPage(controller.view, loginForm);
        console.log(loginForm);
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