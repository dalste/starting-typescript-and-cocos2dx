import { GameViewMainLayer } from "./gameview/GameViewMainLayer"
import { SceneExtensions } from "./../../../tslib/dalste/util/SceneExtensions";
export class GameViewScene extends SceneExtensions {
    private _mainLayer: GameViewMainLayer;
    constructor() {
        // 1. super init first
        super();
        //super.ctor(); //always call this for compatibility with cocos2dx JS Javascript class system
    }
}