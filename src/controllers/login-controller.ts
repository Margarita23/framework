import { Input } from "../models/input";
import { Checkbox } from "../models/checkbox";
import { RadioButton } from "../models/radioButton";
import { LoginView } from "../views/login-view";
import { Application } from "../models/application";
import { MainView } from "../views/main-view";
import { MainController } from "./main-controller";
import { Button } from "../models/button";
import { Control } from "../models/control";
import { Rgb } from "../models/rgb";
import { Panel } from "../models/panel";
export class LoginController{

    public view: LoginView;
    public login: string = "";
    public password: string = "";
    public gender: string = "no gender";
    public gamer: GamerProfile;

    constructor(view: LoginView){
        this.view = view;

        let checkboxShowPass = this.view.controls.find(c => c.name === "show");
        checkboxShowPass.click = this.checkedToShowPassword.bind(checkboxShowPass, this);
        let login: Input = (<Input>this.view.controls.find(c => c.name === "login"));
        login.click = login.focusOnMe;

        let pass: Input = (<Input>this.view.controls.find(c => c.name === "password"));
        pass.click = pass.focusOnMe;

        this.view.controls.find(c => c.name === "genderPanel").controls.forEach(radio => {
            if(!(<RadioButton>radio).disabled){
                radio.click = this.checkedMaleOrFemale.bind(radio, this);
            }
        });

        let submit = this.view.loginForm.controls.find(c => c.name === "submit");
        if(submit !== null){
            submit.click = this.submitRegister.bind(submit, this);
        }

        let submitColor = submit.backgroundColor;
        submit.mousedown = (submit) => {(<Control>submit).backgroundColor = new Rgb(230,230,230); };

        this.view.footer.mousemove = this.changeSizeOrPosition.bind(this.view.footer, 0, 850, this.view.footer.width, 150, this);
        this.view.footer.mouseleave = this.changeSizeOrPosition.bind(this.view.footer, 0, 950, this.view.footer.width, 50, this);
    }

    private changeSizeOrPosition(x: number, y: number, width?: number, height?: number, controller?: LoginController){
        if(this instanceof Panel){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.draw(controller.view.ctx);
        }
    }

    private goToMainPage(old: LoginView, gamer: GamerProfile): void{
        const mainView = new MainView();
        const mainContr = new MainController(mainView, gamer);
        (Application.getInstance()).unsubsrc(old);
        (Application.getInstance()).run(mainView);
    }

    public submitRegister(controller: LoginController): void{
        if (this instanceof Button){
            let inputControls = this.parent.controls.filter(control => control instanceof Input);
            controller.login = (<Input>inputControls.find(c => c.name === "login")).inputText.text;
            controller.password = (<Input>inputControls.find(c => c.name === "password")).inputText.text;
            let loginForm: GamerProfile = {
                login: controller.login,
                password: controller.password,
                gender: controller.gender
            };
            controller.gamer = loginForm;
            controller.goToMainPage(controller.view, loginForm);
        }
    }

    public checkedToShowPassword(controller: LoginController): void {
        let box: Checkbox = <any>this;
        if (this instanceof Checkbox){
            if(box.checked) {
                this.checked = false;
                (<Input>controller.view.loginForm.controls.find(c => c.name === "password" && c instanceof Input)).inputText.secret = true;
            } else {
                this.checked = true;
                (<Input>controller.view.loginForm.controls.find(c => c.name === "password" && c instanceof Input)).inputText.secret = false;
            }
        }
        (<Input>controller.view.loginForm.controls.find(c => c.name === "password" && c instanceof Input)).printText();
    }

    public checkedMaleOrFemale(controller: LoginController): void{
        let radio: RadioButton = <any>this;
        if(this instanceof RadioButton){
            if(radio.checked) {
                this.checked = false;
            } else {
                this.checked = true;
                controller.gender = this.name;
            }
        }
    }
}