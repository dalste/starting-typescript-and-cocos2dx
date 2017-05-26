declare var res:any;
import HelloWorldMainLayer  from "./helloworld/HelloWorldMainLayer";
export default class HelloWorldScene extends cc.Scene{
    _mainLayer:HelloWorldMainLayer;
   constructor  () {
        // 1. super init first
        super();
        super.ctor(); //always call this 
   }
    onEnter () {
       super.onEnter();
       console.log("Hello World Scene");
       this._mainLayer = new HelloWorldMainLayer();
       this.addChild( this._mainLayer);
       
    }
}