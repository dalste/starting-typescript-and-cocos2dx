import { View } from "./../../tslib/dalste/View";
import { SceneExtensions } from "./../../tslib/dalste/util/SceneExtensions";
import { SplashScreenViewScene } from "./scenes/SplashScreenViewScene";
export class SplashScreenView extends View {

    onInitView(): void {
        this.setAsset(new SplashScreenViewScene());
        cc.log("onInitGameView");
    }

    show(parent?: cc.Node): void {
        var ass = this.getAsset() as SceneExtensions;

        ass.onEnterSignal.add(this.onEnterHandler, this);
        ass.onEnterTransitionDidFinishSignal.add(this.onEnterTransitionDidFinishHandler, this);
        ass.onExitSignal.add(this.onExitHandler, this);
        ass.onExitTransitionDidStartSignal.add(this.onExitTransitionDidStartHandler, this);

        cc.director.runScene(this.getAsset());
    }

    private onEnterHandler(): void {
        cc.log("SplashScreenView::onEnterHandler");
    }

    private onEnterTransitionDidFinishHandler(): void {
        cc.log("SplashScreenView::onEnterTransitionDidFinishHandler");
    }

    private onExitHandler(): void {
        cc.log("SplashScreenView::onExitHandler");
    }
    
    private onExitTransitionDidStartHandler(): void {
        cc.log("SplashScreenView::onExitTransitionDidStartHandler");
    }
}