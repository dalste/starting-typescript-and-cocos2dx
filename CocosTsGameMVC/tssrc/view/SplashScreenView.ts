import { View } from "./../../tslib/dalste/mvc/View";
import { Display } from "./../../tslib/dalste/util/Display";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import { SceneExtended } from "./../../tslib/dalste/mvc/SceneExtended";
import { SplashScreenViewScene } from "./scenes/SplashScreenViewScene";
declare var ccui: any;
export class SplashScreenView extends View {

    //inject
    protected _display: Display = undefined;

    show(parent?: cc.Node): void {
        this.setAsset(new SplashScreenViewScene());
        this.initLifecycleListeners();
        cc.director.runScene(this.getAsset());
    }

    protected onEnterHandler(): void {
        cc.log("SplashScreenView:onEnterHandler");
        var button = new ccui.Button();

        button.setTitleText("Play Game");
        button.setTouchEnabled(true);
        button.addTouchEventListener(this.touchEvent, this);
        button.setName("playGameButton");
        button.setPosition(this._display.middleMiddle().x, this._display.middleMiddle().y);

        button.setTitleColor(cc.color("#00ff00"));

        this.addChild(button, 0);


        var instructionLabel = new cc.LabelTTF("Swipe the screen to move the player. Click in the direction you wish to fire", "Arial", 30, cc.size(this._display.screenWidth()-100,200),cc.ALIGN_CENTER);
        // position the label on the center of the screen
        instructionLabel.x = this._display.middleMiddle().x;
        instructionLabel.y = this._display.middleMiddle().y + 200;
        // add the label as a child to this layer
        this.addChild(instructionLabel, 5);
    }

    protected onEnterTransitionDidFinishHandler(): void {
        cc.log("SplashScreenView::onEnterTransitionDidFinishHandler");
    }

    protected onExitHandler(): void {
        cc.log("SplashScreenView:onExitHandler");
        this.removeLifeCycleListeners();
        this.setAsset(null);
    }

    protected onExitTransitionDidStartHandler(): void {
        cc.log("SplashScreenView::onExitTransitionDidStartHandler");
    }

    protected touchEvent(sender: cc.Node, type: any) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                switch (sender.getName()) {
                    case "playGameButton":
                        this.getUIEventBus().dispatch("playGameButtonPressed");
                        break;
                }
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;

        }
    }
}