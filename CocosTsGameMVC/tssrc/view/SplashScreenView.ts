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

        this.addChild(button, 0);
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