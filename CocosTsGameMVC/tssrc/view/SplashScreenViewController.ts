import {ViewController} from "./../../tslib/dalste/ViewController";
import { ScreenTypes } from "./../types/ScreenTypes";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import  {Display}  from "./../../tslib/dalste/util/Display";

declare var ccui: any;
export  class SplashScreenViewController extends ViewController {


    //inject
    private _display: Display=undefined;

    onViewReady(): void {
        cc.log("SplashScreenViewController::onSplashScreenViewReady");

    
        var button = new ccui.Button();
        button.setTitleText("Load Game");
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.touchEvent, this);
        button.setName("mapTestButton");
        button.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y);
      
        this.getView().addChild(button, 0);
    }

    touchEvent (sender:cc.Node, type:any){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                    cc.log(sender.getName() + " pressed");
                switch(sender.getName()){
                    case "mapTestButton":
                    this._system.notify(ApplicationEvents.APP_GOTO_PLAY_SCENE);
                        break;
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;

        }
    }


}