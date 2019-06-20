import { Subject } from 'rxjs';
import { View } from '../views/view';

export class Application {
    public subject: Subject<MouseEvent>;
    public views: View[] = [];

    constructor(){
        this.subject = new Subject<MouseEvent>();
        document.addEventListener("click", (evt)=>{
            this.subject.next(evt);
        });
    }

    public registerView(view: View): void {
        this.views.push(view);
    }

}