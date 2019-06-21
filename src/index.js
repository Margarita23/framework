var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("models/control", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var Control = /** @class */ (function () {
        function Control() {
            this.controls = [];
        }
        return Control;
    }());
    exports.Control = Control;
});
define("models/view", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var View = /** @class */ (function () {
        function View() {
            this.controls = [];
            this.width = document.body.offsetWidth;
            this.height = document.body.offsetHeight;
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.ctx.fillStyle = "rgb(0,0,250)";
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
        return View;
    }());
    exports.View = View;
});
define("custom/main-view", ["require", "exports", "models/view"], function (require, exports, view_1) {
    "use strict";
    exports.__esModule = true;
    var MainView = /** @class */ (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            return _super.call(this) || this;
        }
        MainView.prototype.getInstance = function () {
            return MainView.instance;
        };
        MainView.instance = new MainView();
        return MainView;
    }(view_1.View));
    exports.MainView = MainView;
});
define("models/application", ["require", "exports", "custom/main-view"], function (require, exports, main_view_1) {
    "use strict";
    exports.__esModule = true;
    var Application = /** @class */ (function () {
        function Application() {
            this.views = [];
            this.registerView();
        }
        Application.getInstance = function () {
            return Application.instance;
        };
        Application.prototype.registerView = function () {
            this.views.push(main_view_1.MainView.instance);
        };
        Application.instance = new Application;
        return Application;
    }());
    exports.Application = Application;
});
define("index", ["require", "exports", "models/application"], function (require, exports, application_1) {
    "use strict";
    exports.__esModule = true;
    var app = application_1.Application.getInstance();
    console.log(app);
});
