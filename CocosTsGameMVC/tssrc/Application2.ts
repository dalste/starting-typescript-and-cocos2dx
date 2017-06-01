import {IApplication}  from "./IApplication";
import  GameView  from "./view/GameView";
import  GameController  from "./controller/GameController";
import  GameViewController  from "./view/GameViewController";

export default class Application2 implements IApplication { 


    /**
     * our ioc container
     */
    _system:dijon.System;


    _config: {
        isdebug:boolean
    }
    
    startUp() {
        this._system = new dijon.System();


        /**
         * map the game controller as a singleton 
         * the game controller will provide application wide functionality
         */
        this._system.mapSingleton("GameController", GameController);
        var gc = this._system.getObject("GameController");


        /**
         * map the dijion containner to a global outlet named system so that it may be injected into any class
         * that has the system mapping
         */
        this._system.mapValue("system", this._system);
        /**
         * initialise the game view and its contoller
         * first we map our GameView and GameViewController classes to class identifiers holding the same name 
         * then we map the GameViews _viewcontroller to GameViewController
         * When an instance of game view is created a corresponding instance of GameViewController is injected into its _viewController property
         */
        this._system.mapClass("GameView", GameView);
        this._system.mapClass("GameViewController", GameViewController);
        this._system.mapOutlet("GameViewController","GameView", "_viewController");   

        var gv:GameView = this._system.getObject("GameView") as GameView;
    }
}

