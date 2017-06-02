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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    /**
     * @description adds a node as a child to this views _asset
    * @param {cc.Node} child  A child node
    * @param {number} [localZOrder]  Z order for drawing priority. Please refer to setZOrder(int)
    * @param {number|string} [tag]  An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     */
    View.prototype.addChild = function (child, localZOrder, tag) {
        this._asset.addChild(child, localZOrder, tag);
    };
    /**
     * @description displays the view on screen
     *
     * @param cc.Node  - optional parent node
     */
    View.prototype.show = function (parent) {
        throw (new Error("View:show is an abstract function. It must be overridden"));
    };
    return View;
}());
exports.View = View;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Virtual class - must be subclassed, the onViewReady function must be overriden
 */
var ViewController = (function () {
    function ViewController() {
        /**
         * @description the view associated with this controller, is assigned in viewReady(view:IView) function
          */
        this._view = undefined;
        this._model = undefined;
        //inject 
        this._system = undefined;
    }
    /**
     * @description function called by the IOC container when this class is instantiated
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
exports.ViewController = ViewController;


/***/ }),
/* 2 */
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
/**
 * @class SceneExtensions -  providis subscribable signal wrappers around scene events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */
var SceneExtensions = (function (_super) {
    __extends(SceneExtensions, _super);
    function SceneExtensions() {
        var _this = _super.call(this) || this;
        _super.prototype.ctor.call(_this); //always call this for compatibility with cocos2dx JS Javascript class system
        _this.onEnterSignal = new signals.Signal();
        _this.onEnterTransitionDidFinishSignal = new signals.Signal();
        _this.onExitSignal = new signals.Signal();
        _this.onExitTransitionDidStartSignal = new signals.Signal();
        return _this;
    }
    SceneExtensions.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.onEnterSignal.dispatch();
    };
    SceneExtensions.prototype.onEnterTransitionDidFinish = function () {
        _super.prototype.onEnterTransitionDidFinish.call(this);
        this.onEnterTransitionDidFinishSignal.dispatch();
    };
    SceneExtensions.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        this.onExitSignal.dispatch();
    };
    SceneExtensions.prototype.onExitTransitionDidStart = function () {
        _super.prototype.onExitTransitionDidStart.call(this);
        this.onExitTransitionDidStartSignal.dispatch();
    };
    return SceneExtensions;
}(cc.Scene));
exports.SceneExtensions = SceneExtensions;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationEvents = (function () {
    function ApplicationEvents() {
    }
    return ApplicationEvents;
}());
ApplicationEvents.APP_STARTUP = "App:startup";
ApplicationEvents.APP_STARTUP_COMPLETE = "App:startupComplete";
ApplicationEvents.APP_GOTO_PLAY_SCENE = "App:goto:play:scene";
exports.ApplicationEvents = ApplicationEvents;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AssetTypes_1 = __webpack_require__(5);
var MockAsset_1 = __webpack_require__(10);
/**
 * @class CharacterAssetCreationOptions
 * @description provides creation options to CharacterAssetFactory
 */
var CharacterAssetCreationOptions = (function () {
    function CharacterAssetCreationOptions(type) {
        this._type = type;
    }
    CharacterAssetCreationOptions.prototype.getType = function () {
        return this._type;
    };
    return CharacterAssetCreationOptions;
}());
exports.CharacterAssetCreationOptions = CharacterAssetCreationOptions;
/**
 * @class CharacterAssetFactory
 * @param CharacterAssetCreationOptions
 * Uses the returned type from character creation options to create the appropriate cc.Node derived asset
 *
 */
var CharacterAssetFactory = (function () {
    function CharacterAssetFactory() {
    }
    CharacterAssetFactory.prototype.create = function (options) {
        switch (options.getType()) {
            case AssetTypes_1.CharacterAssetTypes.NPC:
                return new MockAsset_1.MockAsset(AssetTypes_1.CharacterAssetTypes.NPC, {}, 50, MockAsset_1.MockAssetColours.PINK, "NPC");
            case AssetTypes_1.CharacterAssetTypes.NPC_MOCK:
                return new MockAsset_1.MockAsset(AssetTypes_1.CharacterAssetTypes.NPC_MOCK, {}, 50, MockAsset_1.MockAssetColours.PINK, "NPC MOCK");
            case AssetTypes_1.CharacterAssetTypes.PLAYER:
                return new MockAsset_1.MockAsset(AssetTypes_1.CharacterAssetTypes.NPC, {}, 50, MockAsset_1.MockAssetColours.GREEN, "PLAYER");
            case AssetTypes_1.CharacterAssetTypes.PLAYER_MOCK:
                return new MockAsset_1.MockAsset(AssetTypes_1.CharacterAssetTypes.NPC, {}, 50, MockAsset_1.MockAssetColours.GREEN, "PLAYER MOCK");
        }
    };
    return CharacterAssetFactory;
}());
exports.CharacterAssetFactory = CharacterAssetFactory;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CharacterAssetTypes;
(function (CharacterAssetTypes) {
    CharacterAssetTypes[CharacterAssetTypes["PLAYER"] = 0] = "PLAYER";
    CharacterAssetTypes[CharacterAssetTypes["NPC"] = 1] = "NPC";
    CharacterAssetTypes[CharacterAssetTypes["PLAYER_MOCK"] = 2] = "PLAYER_MOCK";
    CharacterAssetTypes[CharacterAssetTypes["NPC_MOCK"] = 3] = "NPC_MOCK";
})(CharacterAssetTypes = exports.CharacterAssetTypes || (exports.CharacterAssetTypes = {}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationEvents_1 = __webpack_require__(3);
var SplashScreenViewController_1 = __webpack_require__(15);
var SplashScreenView_1 = __webpack_require__(14);
var Display_1 = __webpack_require__(7);
var GameView_1 = __webpack_require__(12);
var GameController_1 = __webpack_require__(9);
var GameViewController_1 = __webpack_require__(13);
var CharacterAssetFactory_1 = __webpack_require__(4);
var Application2 = (function () {
    function Application2() {
    }
    Application2.prototype.startUp = function () {
        this._system = new dijon.System();
        this._system.autoMapOutlets = true;
        /**
         * map the dijion containner to a global outlet named _system so that it may be injected into any class
         * that has the "_system" mapping
         */
        this._system.mapValue("_system", this._system);
        //this._system.mapOutlet('_system');
        /**
         * map the game controller as a singleton
         * the game controller will provide application wide functionality
         */
        this._system.mapSingleton("GameController", GameController_1.GameController);
        var gc = this._system.getObject("GameController");
        /**
         * map the character asset factory as a singleton
         *
         */
        this._system.mapSingleton("_characterAssetFactory", CharacterAssetFactory_1.CharacterAssetFactory);
        /**
        * map the display utility class as a singleton
        *
        */
        this._system.mapSingleton("_display", Display_1.Display);
        /**
         * initialise the splash screen view and its contoller
         * first we map our SplashScreenView and SplashScreenViewController classes to class identifiers holding the same name
         * then we map the SplashScreenViews _viewcontroller to SplashScreenViewController
         * When an instance of game view is created a corresponding instance of SplashScreenViewController is injected into its _viewController property
         */
        this._system.mapClass("SplashScreenView", SplashScreenView_1.SplashScreenView);
        this._system.mapClass("SplashScreenViewController", SplashScreenViewController_1.SplashScreenViewController);
        this._system.mapOutlet("SplashScreenViewController", "SplashScreenView", "_viewController");
        /**
         * initialise the game view and its contoller
         * first we map our GameView and GameViewController classes to class identifiers holding the same name
         * then we map the GameViews _viewcontroller to GameViewController
         * When an instance of game view is created a corresponding instance of GameViewController is injected into its _viewController property
         */
        this._system.mapClass("GameView", GameView_1.GameView);
        this._system.mapClass("GameViewController", GameViewController_1.GameViewController);
        this._system.mapOutlet("GameViewController", "GameView", "_viewController");
        /**
         * map the GameController::onAppStartupComplete function as a handler for the ApplicationEvents.APP_STARTUP_COMPLETE event
         */
        this._system.mapHandler(ApplicationEvents_1.ApplicationEvents.APP_STARTUP_COMPLETE, 'GameController', 'onAppStartupComplete');
        /**
         * map the GameController::onAppGoToPlayScene function as a handler for the ApplicationEvents.APP_GOTO_PLAY_SCENE event
         */
        this._system.mapHandler(ApplicationEvents_1.ApplicationEvents.APP_GOTO_PLAY_SCENE, 'GameController', 'onAppGoToPlayScene');
        /**
         * fire app:startup event
         */
        this._system.notify(ApplicationEvents_1.ApplicationEvents.APP_STARTUP);
        /**
      * fire app:startupComplete event
      */
        this._system.notify(ApplicationEvents_1.ApplicationEvents.APP_STARTUP_COMPLETE);
    };
    return Application2;
}());
exports.Application2 = Application2;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description utility class for obtaining information about the the cocos2d-x display
 *
 */
var Display = (function () {
    function Display() {
    }
    /**
     * @returns {cc.Point} - the top left of the visible portion of the screen
     */
    Display.prototype.topLeft = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x, porigin.y + sz.height);
    };
    /**
     * @returns {cc.Point} - the top right of the visible portion of the screen
     */
    Display.prototype.topRight = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x + sz.width, porigin.y + sz.height);
    };
    /**
     * @returns {cc.Point} - the top middle of the visible portion of the screen
     */
    Display.prototype.topMiddle = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x + (sz.width / 2), porigin.y + sz.height);
    };
    /**
     * @returns {cc.Point} - the middle left of the visible portion of the screen
     */
    Display.prototype.middleLeft = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x, porigin.y + (sz.height / 2));
    };
    /**
     * @returns {cc.Point} - the middle middle of the visible portion of the screen
     */
    Display.prototype.middleMiddle = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x + (sz.width / 2), porigin.y + (sz.height / 2));
    };
    /**
   * @returns {cc.Point} - the middle right of the visible portion of the screen
   */
    Display.prototype.middleRight = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x + (sz.width), porigin.y + (sz.height / 2));
    };
    /**
     * @returns {cc.Point} - the bottom left of the visible portion of the screen
     */
    Display.prototype.bottomLeft = function () {
        return cc.director.getVisibleOrigin();
    };
    /**
     * @returns {cc.Point} - the bottom middle of the visible portion of the screen
     */
    Display.prototype.bottomMiddle = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x + (sz.width / 2), porigin.y);
    };
    /**
     * @returns {cc.Point} - the bottom right of the visible portion of the screen
     */
    Display.prototype.bottomRight = function () {
        var porigin = cc.director.getVisibleOrigin();
        var sz = cc.director.getVisibleSize();
        return cc.p(porigin.x + (sz.width), porigin.y);
    };
    /**
     * @returns {Number} - the height of the visible portion of the screen
     */
    Display.prototype.screenHeight = function () {
        var sz = cc.director.getVisibleSize();
        return sz.height;
    };
    /**
    * @returns {Number} - the width of the visible portion of the screen
    */
    Display.prototype.screenWidth = function () {
        var sz = cc.director.getVisibleSize();
        return sz.width;
    };
    /**
     * @returns {Number} - the design resolution height
     */
    Display.prototype.designResolutionHeight = function () {
        var sz = cc.view.getDesignResolutionSize();
        return sz.height;
    };
    /**
     * @returns {Number} - the design resolution width
     */
    Display.prototype.designResolutionWidth = function () {
        var sz = cc.view.getDesignResolutionSize();
        return sz.width;
    };
    /**
     * @param {Number} id - the constant representing the desired position on screen for example Display.BOTTOM_RIGHT | Display.MIDDLE_LEFT etc.
     * @returns {Number} - the design resolution width
     */
    Display.prototype.getPosition = function (id) {
        switch (id) {
            case Display.BOTTOM_RIGHT:
                return this.bottomRight();
            case Display.BOTTOM_MIDDLE:
                return this.bottomMiddle();
            case Display.BOTTOM_LEFT:
                return this.bottomLeft();
            case Display.MIDDLE_RIGHT:
                return this.middleRight();
            case Display.MIDDLE_MIDDLE:
                return this.middleMiddle();
            case Display.MIDDLE_LEFT:
                return this.middleLeft();
            case Display.TOP_MIDDLE:
                return this.topMiddle();
            case Display.TOP_RIGHT:
                return this.topRight();
            case Display.TOP_LEFT:
                return this.topLeft();
        }
    };
    return Display;
}());
Display.BOTTOM_RIGHT = 0;
Display.BOTTOM_MIDDLE = 1;
Display.BOTTOM_LEFT = 2;
Display.MIDDLE_RIGHT = 3;
Display.MIDDLE_MIDDLE = 4;
Display.MIDDLE_LEFT = 5;
Display.TOP_MIDDLE = 6;
Display.TOP_RIGHT = 7;
Display.TOP_LEFT = 8;
exports.Display = Display;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Application2_1 = __webpack_require__(6);
exports.App = new Application2_1.Application2();
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScreenTypes_1 = __webpack_require__(11);
var GameController = (function () {
    function GameController() {
        //inject
        this._system = undefined;
    }
    /**
     *  handler for the ApplicationEvents.APP_STARTUP_COMPLETE event
     */
    GameController.prototype.onAppStartupComplete = function () {
        console.log("GameController::onAppStartupComplete");
        this.onDoNavigation(ScreenTypes_1.ScreenTypes.SPLASH_SCREEN);
    };
    /**
     *  handler for the ApplicationEvents.APP_GOTO_PLAY_SCENE event
     */
    GameController.prototype.onAppGoToPlayScene = function () {
        this.onDoNavigation(ScreenTypes_1.ScreenTypes.GAMEPLAY_SCREEN);
    };
    /**
     *  handler for the app:doNavigation event
     */
    GameController.prototype.onDoNavigation = function (gotoScreen) {
        switch (gotoScreen) {
            case ScreenTypes_1.ScreenTypes.SPLASH_SCREEN:
                if (this._splashScreenView == null)
                    this._splashScreenView = this._system.getObject("SplashScreenView");
                this._splashScreenView.show();
                break;
            case ScreenTypes_1.ScreenTypes.GAMEPLAY_SCREEN:
                if (this._gameView == null)
                    this._gameView = this._system.getObject("GameView");
                this._gameView.show();
                break;
        }
    };
    return GameController;
}());
exports.GameController = GameController;


/***/ }),
/* 10 */
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
/**
 * @description emum providing identifyable colour options for MockAsset
 */
var MockAssetColours;
(function (MockAssetColours) {
    MockAssetColours[MockAssetColours["RED"] = 0] = "RED";
    MockAssetColours[MockAssetColours["BLUE"] = 1] = "BLUE";
    MockAssetColours[MockAssetColours["YELLOW"] = 2] = "YELLOW";
    MockAssetColours[MockAssetColours["GREEN"] = 3] = "GREEN";
    MockAssetColours[MockAssetColours["PINK"] = 4] = "PINK";
    MockAssetColours[MockAssetColours["NONE"] = 5] = "NONE";
})(MockAssetColours = exports.MockAssetColours || (exports.MockAssetColours = {}));
;
/**
 * @class MockAsset
 * @description a cc.Node derived class for creating mock assets ,creates a circle with given radius, containing a label with optionalgiven text
 * Templater option T is for the Type used to describe type generally string | int | enumtype
 *
 */
var MockAsset = (function (_super) {
    __extends(MockAsset, _super);
    function MockAsset(type, config, radius, COLOUR, text) {
        if (radius === void 0) { radius = 20; }
        if (COLOUR === void 0) { COLOUR = MockAssetColours.BLUE; }
        if (text === void 0) { text = "Text"; }
        var _this = _super.call(this) || this;
        _this._visibleNode = null;
        _this._objecttype = null;
        _this.ctor();
        _this._objecttype = type;
        _this.setContentSize(radius * 2, radius * 2);
        _this.setAnchorPoint(0.5, 0.5);
        _this._circleNode = new cc.DrawNode();
        _this._circleNode.drawDot(cc.p(radius, radius), radius, _this.getColour(COLOUR));
        _this.addChild(_this._circleNode);
        var textF = new ccui.Text();
        textF.boundingWidth = radius * 2;
        textF.boundingHeight = 30;
        textF.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: text,
            font: "20px Ariel",
            x: radius
        });
        textF.y = radius - textF.height / 8;
        _this.addChild(textF);
        return _this;
    }
    MockAsset.prototype.getColour = function (colour) {
        switch (colour) {
            case MockAssetColours.RED:
                return new cc.Color(187, 56, 10, 255);
            case MockAssetColours.GREEN:
                return new cc.Color(12, 123, 2, 255);
            case MockAssetColours.BLUE:
                return new cc.Color(27, 68, 174, 255);
            case MockAssetColours.PINK:
                return new cc.Color(211, 62, 109, 255);
            case MockAssetColours.YELLOW:
                return new cc.Color(242, 171, 52, 255);
            case MockAssetColours.NONE:
                return new cc.Color(255, 255, 255, 255);
        }
    };
    return MockAsset;
}(cc.Node));
exports.MockAsset = MockAsset;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScreenTypes;
(function (ScreenTypes) {
    ScreenTypes[ScreenTypes["SPLASH_SCREEN"] = 0] = "SPLASH_SCREEN";
    ScreenTypes[ScreenTypes["GAMEPLAY_SCREEN"] = 1] = "GAMEPLAY_SCREEN";
})(ScreenTypes = exports.ScreenTypes || (exports.ScreenTypes = {}));


/***/ }),
/* 12 */
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
var View_1 = __webpack_require__(0);
var GameViewScene_1 = __webpack_require__(16);
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameView.prototype.onInitView = function () {
        this.setAsset(new GameViewScene_1.GameViewScene());
        console.log("onInitGameView");
    };
    GameView.prototype.show = function (parent) {
        var ass = this.getAsset();
        ass.onEnterSignal.add(this.onEnterHandler, this);
        ass.onEnterTransitionDidFinishSignal.add(this.onEnterTransitionDidFinishHandler, this);
        ass.onExitSignal.add(this.onExitHandler, this);
        ass.onExitTransitionDidStartSignal.add(this.onExitTransitionDidStartHandler, this);
        cc.director.runScene(this.getAsset());
    };
    GameView.prototype.onEnterHandler = function () {
        console.log("GameView::onEnterHandler");
    };
    GameView.prototype.onEnterTransitionDidFinishHandler = function () {
        console.log("GameView::onEnterTransitionDidFinishHandler");
    };
    GameView.prototype.onExitHandler = function () {
        console.log("GameView::onExitHandler");
    };
    GameView.prototype.onExitTransitionDidStartHandler = function () {
        console.log("GameView::onExitTransitionDidStartHandler");
    };
    return GameView;
}(View_1.View));
exports.GameView = GameView;


/***/ }),
/* 13 */
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
var ViewController_1 = __webpack_require__(1);
var AssetTypes_1 = __webpack_require__(5);
var CharacterAssetFactory_1 = __webpack_require__(4);
var GameViewController = (function (_super) {
    __extends(GameViewController, _super);
    function GameViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //inject
        _this._characterAssetFactory = null;
        //inject
        _this._display = undefined;
        return _this;
    }
    GameViewController.prototype.onViewReady = function () {
        console.log("GameViewController::onInitGameView");
        var co = new CharacterAssetFactory_1.CharacterAssetCreationOptions(AssetTypes_1.CharacterAssetTypes.PLAYER);
        var ca = this._characterAssetFactory.create(co);
        ca.setPosition(this._display.middleMiddle().x, this._display.middleMiddle().y);
        this.getView().addChild(ca, 0);
    };
    return GameViewController;
}(ViewController_1.ViewController));
exports.GameViewController = GameViewController;


/***/ }),
/* 14 */
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
var View_1 = __webpack_require__(0);
var SplashScreenViewScene_1 = __webpack_require__(17);
var SplashScreenView = (function (_super) {
    __extends(SplashScreenView, _super);
    function SplashScreenView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplashScreenView.prototype.onInitView = function () {
        this.setAsset(new SplashScreenViewScene_1.SplashScreenViewScene());
        cc.log("onInitGameView");
    };
    SplashScreenView.prototype.show = function (parent) {
        var ass = this.getAsset();
        ass.onEnterSignal.add(this.onEnterHandler, this);
        ass.onEnterTransitionDidFinishSignal.add(this.onEnterTransitionDidFinishHandler, this);
        ass.onExitSignal.add(this.onExitHandler, this);
        ass.onExitTransitionDidStartSignal.add(this.onExitTransitionDidStartHandler, this);
        cc.director.runScene(this.getAsset());
    };
    SplashScreenView.prototype.onEnterHandler = function () {
        cc.log("SplashScreenView::onEnterHandler");
    };
    SplashScreenView.prototype.onEnterTransitionDidFinishHandler = function () {
        cc.log("SplashScreenView::onEnterTransitionDidFinishHandler");
    };
    SplashScreenView.prototype.onExitHandler = function () {
        cc.log("SplashScreenView::onExitHandler");
    };
    SplashScreenView.prototype.onExitTransitionDidStartHandler = function () {
        cc.log("SplashScreenView::onExitTransitionDidStartHandler");
    };
    return SplashScreenView;
}(View_1.View));
exports.SplashScreenView = SplashScreenView;


/***/ }),
/* 15 */
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
var ViewController_1 = __webpack_require__(1);
var ApplicationEvents_1 = __webpack_require__(3);
var SplashScreenViewController = (function (_super) {
    __extends(SplashScreenViewController, _super);
    function SplashScreenViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //inject
        _this._display = undefined;
        return _this;
    }
    SplashScreenViewController.prototype.onViewReady = function () {
        cc.log("SplashScreenViewController::onSplashScreenViewReady");
        var button = new ccui.Button();
        button.setTitleText("Load Game");
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.touchEvent, this);
        button.setName("mapTestButton");
        button.setPosition(this._display.middleMiddle().x, this._display.middleMiddle().y);
        this.getView().addChild(button, 0);
    };
    SplashScreenViewController.prototype.touchEvent = function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log(sender.getName() + " pressed");
                switch (sender.getName()) {
                    case "mapTestButton":
                        this._system.notify(ApplicationEvents_1.ApplicationEvents.APP_GOTO_PLAY_SCENE);
                        break;
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    };
    return SplashScreenViewController;
}(ViewController_1.ViewController));
exports.SplashScreenViewController = SplashScreenViewController;


/***/ }),
/* 16 */
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
var SceneExtensions_1 = __webpack_require__(2);
var GameViewScene = (function (_super) {
    __extends(GameViewScene, _super);
    function GameViewScene() {
        // 1. super init first
        return _super.call(this) || this;
        //super.ctor(); //always call this for compatibility with cocos2dx JS Javascript class system
    }
    return GameViewScene;
}(SceneExtensions_1.SceneExtensions));
exports.GameViewScene = GameViewScene;


/***/ }),
/* 17 */
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
var SceneExtensions_1 = __webpack_require__(2);
var SplashScreenViewScene = (function (_super) {
    __extends(SplashScreenViewScene, _super);
    function SplashScreenViewScene() {
        return _super.call(this) || this;
    }
    return SplashScreenViewScene;
}(SceneExtensions_1.SceneExtensions));
exports.SplashScreenViewScene = SplashScreenViewScene;


/***/ })
/******/ ]);