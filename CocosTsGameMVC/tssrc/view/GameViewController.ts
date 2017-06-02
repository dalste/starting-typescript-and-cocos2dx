import {ViewController} from "./../../tslib/dalste/ViewController";
import { CharacterAssetTypes } from "./../types/AssetTypes";
import { CharacterAssetCreationOptions } from "./../factory/view/CharacterAssetFactory";
import { IFactory } from "./../factory/IFactory";
import  {Display}  from "./../../tslib/dalste/util/Display";
export  class GameViewController extends ViewController {

    //inject
    private _characterAssetFactory:IFactory<CharacterAssetCreationOptions,cc.Node> = null;

    //inject
    private _display: Display=undefined;

    onViewReady(): void {
        console.log("GameViewController::onInitGameView");

        var co = new CharacterAssetCreationOptions(CharacterAssetTypes.PLAYER);
        var ca = this._characterAssetFactory.create(co);
        ca.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y);
        
        this.getView().addChild(ca, 0);
    }


}