import { View } from "./../../tslib/dalste/View";
import { SceneView } from "./../../tslib/dalste/SceneView";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import { Display } from "./../../tslib/dalste/util/Display";
import { IFactory } from "./../factory/IFactory";
import { SceneExtended } from "./../../tslib/dalste/SceneExtended";
import { GameViewScene } from "./scenes/GameViewScene";

declare var ccui: any;
export class GameView extends SceneView {

    //inject
    private _display: Display=undefined;
  

    show(parent?: cc.Node): void {
        this.setAsset(new GameViewScene());
        this.initLifecycleListeners();
        cc.director.runScene(this.getAsset());
    }

    protected onEnterHandler(): void {

        cc.log("GameView:onEnterHandler");
        

        var button = new ccui.Button();
        button.setTitleText("Exit Game");
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.touchEvent, this);
        button.setName("exitGameButton");
        button.setPosition(this._display.topRight().x-50,this._display.topRight().y-50);
      
        this.addChild(button, 0);
    }

    protected touchEvent (sender:cc.Node, type:any){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                    cc.log(sender.getName() + " pressed");
                switch(sender.getName()){
                    case "exitGameButton":
                        this._viewEventBus.dispatch("exitGameButtonPressed");
                        break;
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;

        }
    }

    protected onEnterTransitionDidFinishHandler(): void {
        
    }

    protected onExitHandler(): void {
        cc.log("GameView:onExithandler");
        this.removeLifeCycleListeners();
        this.setAsset(null);
    }

    protected onExitTransitionDidStartHandler(): void {
    }
}