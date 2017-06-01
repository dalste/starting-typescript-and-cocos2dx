var CocosTSGame =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameView_1 = __webpack_require__(5);
var GameController_1 = __webpack_require__(4);
var GameViewController_1 = __webpack_require__(6);
var Application2 = (function () {
    function Application2() {
    }
    Application2.prototype.startUp = function () {
        this._system = new dijon.System();
        /**
         * map the game controller as a singleton
         * the game controller will provide application wide functionality
         */
        this._system.mapSingleton("GameController", GameController_1.default);
        var gc = this._system.getObject("GameController");
        /**
         * map the dijion containner to a global outlet named system so that it may be injected into any class
         * that has the system mapping
         */
        this._system.mapValue("system", this._system);
        /**
         * initialise the game view and its contoller
         * first we map our GameView and GameViewController classes to class identifiers holding the same name
         * then we map the GameViews _viewcontroller to GameViewController
         * When an instance of game view is created a corresponding instance of GameViewController is injected into its _viewController property
         */
        this._system.mapClass("GameView", GameView_1.default);
        this._system.mapClass("GameViewController", GameViewController_1.default);
        this._system.mapOutlet("GameViewController", "GameView", "_viewController");
        var gv = this._system.getObject("GameView");
    };
    return Application2;
}());
exports.default = Application2;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Virtual class - must be subclassed, the onInitView function must be overriden
 */
var View = (function () {
    function View() {
        /**
         * @description the _viewController will be injected by the IOC container when this view is instantiated
         */
        //inject
        this._viewController = undefined;
        //inject      
        this._viewModel = undefined;
    }
    /**
     * @description setup. this function is called after the class is instantiaved via the IOC container
     */
    View.prototype.setup = function () {
        this._viewEventBus = new signals.Signal();
        this.onInitView();
        this._viewController.viewReady(this, this._viewModel);
    };
    /**
     * @description returns the signals.Signal that represents this views eventBus, you may use this Signal to subscribe to view events
     */
    View.prototype.getEventBus = function () {
        return this._viewEventBus;
    };
    /**
     * @description Virtual function that is called after the view is instantiated, it is here that you should create the views assets
     */
    View.prototype.onInitView = function () {
        throw (new Error("View:onInitView is an abstract function. It must be overridden"));
    };
    /**
     * @description returns the main asset for this view
     * @returns cc.Node
     */
    View.prototype.getAsset = function () {
        return this._asset;
    };
    /**
    * @description sets the main asset for this view
    * @param cc.Node
    */
    View.prototype.setAsset = function (node) {
        this._asset = node;
    };
    return View;
}());
exports.default = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Virtual class - must be subclassed, the onViewReady function must be overriden
 */
var ViewController = (function () {
    function ViewController() {
        /**
         * the view associated with this controller, is assigned in viewReady(view:IView) function
          */
        this._view = undefined;
        this._model = undefined;
        //inject 
        this.system = undefined;
    }
    /**
     * function called by the IOC container when this class is instantiated
     */
    ViewController.prototype.setup = function () {
    };
    /**
     * @description only override if you need to, this function assigns the associated view to _view class variable and calls onViewReady()
     * @param view:IView
     */
    ViewController.prototype.viewReady = function (view, model) {
        this._view = view;
        this._model = model;
        this.onViewReady();
    };
    ViewController.prototype.getView = function () {
        return this._view;
    };
    /**
        * @description Virtual function that is called after the view is assigned to teh controllers _view,
        *  it is here that you should initialise listeners and do futher view setup
        */
    ViewController.prototype.onViewReady = function () {
        throw (new Error("ViewController:onViewReady is an abstract function. It must be overridden"));
    };
    return ViewController;
}());
exports.default = ViewController;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Application2_1 = __webpack_require__(0);
exports.App = new Application2_1.default();
/**
 * @desc exposed directly to the globally scoped library variable configured in your webpack options
 * called by the cocos2dx entry scene
 * @see webpackconfig.js  {library:"CocosTSGame"}
 *
 */
function start() {
    exports.App.startUp();
}
exports.start = start;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameController = (function () {
    function GameController() {
    }
    GameController.prototype.onEnter = function () {
    };
    return GameController;
}());
exports.default = GameController;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = __webpack_require__(1);
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameView.prototype.onInitView = function () {
        console.log("onInitGameView");
    };
    return GameView;
}(View_1.default));
exports.default = GameView;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewController_1 = __webpack_require__(2);
var GameViewController = (function (_super) {
    __extends(GameViewController, _super);
    function GameViewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameViewController.prototype.onViewReady = function () {
        console.log("GameViewController::onInitGameView");
    };
    return GameViewController;
}(ViewController_1.default));
exports.default = GameViewController;


/***/ })
/******/ ]);