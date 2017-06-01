import GameViewMainLayer  from "./gameview/GameViewMainLayer"
export default class GameViewScene extends cc.Scene{
    private _mainLayer:GameViewMainLayer;
   constructor  () {
        // 1. super init first
        super();
        super.ctor(); //always call this for compatibility with cocos2dx JS Javascript class system
   }
    onEnter () {
       super.onEnter();
       console.log("Hello game View Scene");
       this._mainLayer = new GameViewMainLayer();
       this.addChild( this._mainLayer);
       
    }
}