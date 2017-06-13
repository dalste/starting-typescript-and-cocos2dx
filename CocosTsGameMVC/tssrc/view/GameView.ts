
import { View } from "./../../tslib/dalste/mvc/View";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import { Display } from "./../../tslib/dalste/util/Display";
import { IFactory } from "./../factory/IFactory";



declare var ccui: any;
export class GameView extends View {

    //inject
    private _display: Display = undefined;

    protected _playerScoreText: any = null;
    protected _npcScoreText: any = null;


    show(parent?: cc.Node): void {
        this.setAsset(new dalste.mvc.SceneExtended());
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
        button.setPosition(this._display.topRight().x - 50, this._display.topRight().y - 50);
        button.setTitleColor(cc.color("#ff0000"));

        this.addChild(button, 0);

        this._playerScoreText = new ccui.Text();
        this._playerScoreText.boundingWidth = 100;
        this._playerScoreText.boundingHeight = 30;
        this._playerScoreText.attr({
            textAlign: cc.TEXT_ALIGNMENT_LEFT,
            string: "player Score",
            font: "20px Ariel",
            x: this._display.topLeft().x + this._playerScoreText.boundingWidth
        });
        this._playerScoreText.y = this._display.topLeft().y - this._playerScoreText.height;

        this.addChild(this._playerScoreText, 0);

        this._npcScoreText = new ccui.Text();
        this._npcScoreText.boundingWidth = 100;
        this._npcScoreText.boundingHeight = 30;
        this._npcScoreText.attr({
            textAlign: cc.TEXT_ALIGNMENT_LEFT,
            string: "NPC Score",
            font: "20px Ariel",
            x: this._display.topLeft().x + this._npcScoreText.boundingWidth
        });
        this._npcScoreText.y = this._playerScoreText.y - 30;//this._display.topLeft().y + this._npcScoreText.height;
        this.addChild(this._npcScoreText, 0);
    }

    setNpcScore(val: number) {
        this._npcScoreText.attr({

            string: "NPC Score: " + val,

        });
    }

    setPlayerScore(val: number) {
        this._playerScoreText.attr({

            string: "Player Score: " + val,

        });
    }

    protected touchEvent(sender: cc.Node, type: any) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:

                this.getUIEventBus().dispatch("exitGameButtonPressed");


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
        this._npcScoreText = null;
        this._playerScoreText = null;
        this.setAsset(null);
    }

    protected onExitTransitionDidStartHandler(): void {
    }
}