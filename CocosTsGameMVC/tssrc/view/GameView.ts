import { View } from "./../../tslib/dalste/View";
import { SceneExtensions } from "./../../tslib/dalste/util/SceneExtensions";
import { GameViewScene } from "./scenes/GameViewScene";
export class GameView extends View {

    onInitView(): void {
        this.setAsset(new GameViewScene());
        console.log("onInitGameView");
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
        console.log("GameView::onEnterHandler");
    }

    private onEnterTransitionDidFinishHandler(): void {
        console.log("GameView::onEnterTransitionDidFinishHandler");
    }

    private onExitHandler(): void {
        console.log("GameView::onExitHandler");
    }
    
    private onExitTransitionDidStartHandler(): void {
        console.log("GameView::onExitTransitionDidStartHandler");
    }
}