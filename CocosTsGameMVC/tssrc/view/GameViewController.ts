import { ViewController } from "./../../tslib/dalste/mvc/ViewController";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import { CharacterAssetTypes } from "./../types/AssetTypes";
import { CharacterAssetCreationOptions } from "./../factory/view/CharacterAssetFactory";
import { IFactory } from "./../factory/IFactory";
import { Display } from "./../../tslib/dalste/util/Display";

declare var ccui: any;
export class GameViewController extends ViewController {

    //inject
    private _characterAssetFactory: IFactory<CharacterAssetCreationOptions, cc.Node> = null;

    //inject
    private _display: Display = undefined;

    onViewReady(): void {
        this.getView().getUIEventBus().add(this.onViewUIEvent, this);
        this.getView().getEnterSignal().add(this.onViewEnter, this);
        this.getView().getExitSignal().add(this.onViewExit, this);
        this.getView().getEnterTransitionDidFinishSignal().add(this.onViewEnterTransitionDidFinish, this);
        this.getView().getExitTransitionDidStartSignal().add(this.onViewExitTransitionDidStart, this);

    }

    /**
     * @function onViewEnter 
     * @description recommended here that you initialise any resources required for the view
     * @see cc.Node onEnter
     */
    onViewEnter(): void {
        cc.log("GameViewController::onViewEnter");

        //create player and add to scene 
        var co = new CharacterAssetCreationOptions(CharacterAssetTypes.PLAYER,"player");
        var ca = this._characterAssetFactory.create(co);
        ca.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y);

        this.getView().addChild(ca, 0);

        //create enemy and add to scene
        var c2 = new CharacterAssetCreationOptions(CharacterAssetTypes.NPC,"enemy");
        var cb = this._characterAssetFactory.create(c2);
        cb.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y+100);

        this.getView().addChild(cb, 1);
    }
    onViewEnterTransitionDidFinish(): void {
        cc.log("GameViewController::onViewEnterTransitionDidFinish");
    }

    /**
     * @function onViewEnter 
     * @description recommended here that you free any resources allocated for the view
     * @see cc.Node onEnter
     */
    onViewExit(): void {
        cc.log("GameViewController::onViewExit");
    }

    onViewExitTransitionDidStart(): void {
        cc.log("GameViewController::onViewExitTransitionDidStart");
    }

    onViewUIEvent(event: string): void {
        switch (event) {
            case "exitGameButtonPressed":
                this._system.notify(ApplicationEvents.APP_GOTO_SPLASH_SCENE);
                break;
        }
    }
}