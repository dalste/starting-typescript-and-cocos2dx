import { HelloWorldMainLayer } from "./helloworld/HelloWorldMainLayer";
export class HelloWorldScene extends cc.Scene {
    _mainLayer: HelloWorldMainLayer;
    constructor() {
        // 1. super init first
        super();
        super.ctor(); //always call this for compatibility with cocos2dx JS Javascript class system
    }
    onEnter() {
        super.onEnter();
        cc.log("Hello World Scene");
        this._mainLayer = new HelloWorldMainLayer();
        this.addChild(this._mainLayer);

    }
}