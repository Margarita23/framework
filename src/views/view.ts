import { Controller } from "../controllers/controller";
import { Control } from "../services/control";

export abstract class View {

    public controller: Controller;
    public controls: Control[];
    public canvas: HTMLCanvasElement = new HTMLCanvasElement();
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');

    public createControl(control: Control){
        this.controls.push(control);
    }
}