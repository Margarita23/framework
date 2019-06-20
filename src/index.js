define("controllers/controller", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Controller = /** @class */ (function () {
        function Controller() {
        }
        return Controller;
    }());
    exports.Controller = Controller;
});
define("services/control", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Control = /** @class */ (function () {
        function Control(x, y, width, height, parent) {
            this.parent = parent;
            if (this.parent != null) {
                this.x = this.parent.x + x;
                this.y = this.parent.y + y;
            }
            else {
                this.x = x;
                this.y = y;
            }
            this.width = width;
            this.height = height;
        }
        return Control;
    }());
    exports.Control = Control;
});
define("views/view", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var View = /** @class */ (function () {
        function View() {
            this.canvas = new HTMLCanvasElement();
            this.context = this.canvas.getContext('2d');
        }
        View.prototype.createControl = function (control) {
            this.controls.push(control);
        };
        return View;
    }());
    exports.View = View;
});
define("models/application", ["require", "exports", "rxjs"], function (require, exports, rxjs_1) {
    "use strict";
    exports.__esModule = true;
    var Application = /** @class */ (function () {
        function Application() {
            var _this = this;
            this.views = [];
            this.subject = new rxjs_1.Subject();
            document.addEventListener("click", function (evt) {
                _this.subject.next(evt);
            });
        }
        ///public static getInstance():Application {
        //return Application.instance;
        //}
        Application.prototype.registerView = function (view) {
            this.views.push(view);
        };
        return Application;
    }());
    exports.Application = Application;
});
define("models/my-app", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MyApp = /** @class */ (function () {
        function MyApp() {
        }
        MyApp.getInstance = function () {
            return MyApp.instance;
        };
        MyApp.instance = new MyApp();
        return MyApp;
    }());
    exports.MyApp = MyApp;
});
define("index", ["require", "exports", "models/my-app"], function (require, exports, my_app_1) {
    "use strict";
    exports.__esModule = true;
    var button = document.querySelector("button");
    //button.addEventListener("click", () => {
    //    console.log("Button clicked.");
    //});
    var myApp = my_app_1.MyApp.getInstance();
});
//console.log(myApp);
