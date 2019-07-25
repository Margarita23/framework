import { Control } from "./control";

export class Label extends Control{
    public text: string = null;
    public maxLength: number = 50;
    public align: string = "left";
    public startX: number = 0;
    public startY: number = 0;

    constructor() { super(); }
}