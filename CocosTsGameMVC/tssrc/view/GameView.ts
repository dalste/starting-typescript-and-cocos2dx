import  View  from "./../../tslib/dalste/View";
import  GameViewScene  from "./scenes/GameViewScene";
export default class GameView extends View{

    onInitView():void{
       console.log("onInitGameView");
    }

    show(parent?:cc.Node):void{
        this.setAsset( new GameViewScene());
        cc.director.runScene(this.getAsset());
    }
   
}