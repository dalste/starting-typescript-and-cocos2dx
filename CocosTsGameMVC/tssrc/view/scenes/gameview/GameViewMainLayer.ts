
import { CharacterAssetTypes } from "./../../../types/AssetTypes";
import {CharacterAssetFactory, CharacterAssetCreationOptions} from "../../../factory/view/CharacterAssetFactory";
import {Display} from "./../../../../tslib/dalste/util/Display";
declare var res:any;
export class GameViewMainLayer extends cc.Layer{
    sprite:cc.Sprite;
    signal: signals.Signal;
    //inject
    private _assetFactory:CharacterAssetFactory = undefined;
    constructor  () {
        //////////////////////////////
        // 1. super init first
        super();
        super.ctor(); // call the cocos super method in JS  this would be this._super()

    }
}
