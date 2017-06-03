import { GameViewMainLayer } from "./gameview/GameViewMainLayer"
import {  SceneExtended } from "./../../../tslib/dalste/SceneExtended";
export class GameViewScene extends SceneExtended {
    private _mainLayer: GameViewMainLayer;
    constructor() {
        // 1. super init first
        super();
        //super.ctor(); //always call this for compatibility with cocos2dx JS Javascript class system
    }
}