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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HelloWorldScene_1 = __webpack_require__(5);
var Application1 = (function () {
    function Application1() {
    }
    Application1.prototype.startUp = function () {
        console.log("Hello Application1");
        cc.director.runScene(new HelloWorldScene_1.default());
    };
    return Application1;
}());
exports.default = Application1;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Application1_1 = __webpack_require__(1);
exports.App = new Application1_1.default();
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AssetTypes_1 = __webpack_require__(0);
var MockAsset_1 = __webpack_require__(4);
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
/* 4 */
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
        _this._circleNode.drawCircle(cc.p(radius, radius), radius, 0, 1, true, 8, _this.getColour(COLOUR));
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
var HelloWorldMainLayer_1 = __webpack_require__(6);
var HelloWorldScene = (function (_super) {
    __extends(HelloWorldScene, _super);
    function HelloWorldScene() {
        var _this = 
        // 1. super init first
        _super.call(this) || this;
        _super.prototype.ctor.call(_this); //always call this 
        return _this;
    }
    HelloWorldScene.prototype.onEnter = function () {
        _super.prototype.onEnter.call(this);
        console.log("Hello World Scene");
        this._mainLayer = new HelloWorldMainLayer_1.default();
        this.addChild(this._mainLayer);
    };
    return HelloWorldScene;
}(cc.Scene));
exports.default = HelloWorldScene;


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
var AssetTypes_1 = __webpack_require__(0);
var CharacterAssetFactory_1 = __webpack_require__(3);
var HelloWorldMainLayer = (function (_super) {
    __extends(HelloWorldMainLayer, _super);
    function HelloWorldMainLayer() {
        var _this = 
        //////////////////////////////
        // 1. super init first
        _super.call(this) || this;
        _super.prototype.ctor.call(_this); // call the cocos super method in JS  this would be this._super()
        console.log("Hello World Layer");
        _this.assetFactory = new CharacterAssetFactory_1.CharacterAssetFactory();
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        _this.addChild(helloLabel, 5);
        // add "HelloWorld" splash screen"
        _this.sprite = new cc.Sprite(res.HelloWorld_png);
        _this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        _this.addChild(_this.sprite, 0);
        var co = new CharacterAssetFactory_1.CharacterAssetCreationOptions(AssetTypes_1.CharacterAssetTypes.PLAYER);
        var ca = _this.assetFactory.create(co);
        ca.setPosition(10, 20);
        _this.addChild(ca, 0);
        return _this;
    }
    return HelloWorldMainLayer;
}(cc.Layer));
exports.default = HelloWorldMainLayer;


/***/ })
/******/ ]);