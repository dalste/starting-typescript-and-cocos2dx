

import { IApplication } from "./IApplication";
import { PhysicsSystem } from "./system/PhysicsSystem";
import { GameObjectEntityCreationOptions } from "./factory/entity/GameObjectEntityFactory";
import { GameObjectAssetCreationOptions } from "./factory/view/GameObjectAssetFactory";
import { NPCAISystem } from "./system/NPCAISystem";
import { GameplaySystem } from "./system/GameplaySystem";
import { CharacterEntityFactory } from "./factory/entity/CharacterEntityFactory";
import { GameObjectEntityFactory } from "./factory/entity/GameObjectEntityFactory";
import { GameModel } from "./model/GameModel";
import { ApplicationEvents } from "./events/ApplicationEvents";
import { SplashScreenViewController } from "./view/SplashScreenViewController";
import { SplashScreenView } from "./view/SplashScreenView";
import { Display } from "./../tslib/dalste/util/Display";
import { CharacterAssetCreationOptions } from "./factory/view/CharacterAssetFactory";
import { GameView } from "./view/GameView";
import { GameController } from "./controller/GameController";
import { GameViewController } from "./view/GameViewController";
import { CharacterAssetFactory } from "./factory/view/CharacterAssetFactory"
import { GameObjectAssetFactory } from "./factory/view/GameObjectAssetFactory";

/**
 * @class Application2 
 * @description this Application shows and example of setting up an MVC framework using the dijon 
 * IOC container.
 * 
 * - we map a number of singleton utility classes such as Display to be injected as required
 * 
 * - we map our factories as singletons 
 * 
 * - we tie together our views and view controllers 
 * 
 * - we map our game model as a singleton
 * 
 * - we map a singleton GameController to handle application wide events and handle the wider application logic 
 * for example: loading the applications core scenes
 * 
 * @see https://github.com/creynders/dijon
 */
export class Application2 implements IApplication {


    /**
     * our ioc container
     */
    _system: dijon.System;


    _config: {
        isdebug: boolean
    }

    startUp() {
        this._system = new dijon.System();



        this._system.autoMapOutlets = true;


        /**
         * map the dijon containner to a global outlet named _system so that it may be injected into any class
         * that has the "_system" mapping
         */
        this._system.mapValue("_system", this._system);
        //this._system.mapOutlet('_system'); - not needed as we have set autoMapOutlets to true above


        /**
         * map the game controller as a singleton 
         * the game controller will provide application wide functionality
         */
        this._system.mapSingleton("GameController", GameController);
        var gc = this._system.getObject("GameController");


        /**
         * map the game model as a singleton 
         * the main data model for the game
         */
        this._system.mapSingleton("_gameModel", GameModel);

        /**
         * map the character and game object asset factories as a singletons
         * 
         */
        this._system.mapSingleton("_characterAssetFactory", CharacterAssetFactory);
        this._system.mapSingleton("_gameObjectAssetFactory", GameObjectAssetFactory);

        /**
        * map the character and game object entity  factories as singletons 
        * 
        */
        this._system.mapSingleton("_characterEntityFactory", CharacterEntityFactory);
        this._system.mapSingleton("_gameObjectEntityFactory", GameObjectEntityFactory);

        /**
        * map the display utility class as a singleton 
        * 
        */
        this._system.mapSingleton("_display", Display);


        /**
        * map a signal as a singleton to dispatch collision events - 
        *these events will be fired by physics system and handled primarily by Gameplaysystem 
        * 
        */
        this._system.mapSingleton("_collisionEventBus", signals.Signal);


        /**
         * map the systems that we need to inkect dependencies into (other systems are just instantiated as normal)
         */

        this._system.mapClass("GameplaySystem", GameplaySystem);
        this._system.mapClass("NPCAISystem", NPCAISystem);
        this._system.mapClass("PhysicsSystem", PhysicsSystem);

        /**
        * initialise the splash screen view and its controller
        * first we map our SplashScreenView and SplashScreenViewController classes to class identifiers holding the same name 
        * then we map the SplashScreenViews _viewcontroller to SplashScreenViewController
        * When an instance of game view is created a corresponding instance of SplashScreenViewController is injected into its _viewController property
        */
        this._system.mapClass("SplashScreenView", SplashScreenView);
        this._system.mapClass("SplashScreenViewController", SplashScreenViewController);
        this._system.mapOutlet("SplashScreenViewController", "SplashScreenView", "_viewController");


        /**
         * initialise the game view and its controller
         * first we map our GameView and GameViewController classes to class identifiers holding the same name 
         * then we map the GameViews _viewcontroller to GameViewController
         * When an instance of game view is created a corresponding instance of GameViewController is injected into its _viewController property
         */
        this._system.mapClass("GameView", GameView);
        this._system.mapClass("GameViewController", GameViewController);
        this._system.mapOutlet("GameViewController", "GameView", "_viewController");

        /**
         * map the GameController::onAppStartupComplete function as a handler for the ApplicationEvents.APP_STARTUP_COMPLETE event
         */
        this._system.mapHandler(ApplicationEvents.APP_STARTUP_COMPLETE, 'GameController', 'onAppStartupComplete');



        /**
         * map the GameController::onAppGoToPlayScene function as a handler for the ApplicationEvents.APP_GOTO_PLAY_SCENE event
         */
        this._system.mapHandler(ApplicationEvents.APP_GOTO_PLAY_SCENE, 'GameController', 'onAppGoToPlayScene');

        /**
         * map the GameController::onAppGoToPlayScene function as a handler for the ApplicationEvents.APP_GOTO_PLAY_SCENE event
         */
        this._system.mapHandler(ApplicationEvents.APP_GOTO_SPLASH_SCENE, 'GameController', 'onAppGoToSplashScene');



        /**
         * fire app:startup event
         */
        this._system.notify(ApplicationEvents.APP_STARTUP);

        /**
      * fire app:startupComplete event
      */
        this._system.notify(ApplicationEvents.APP_STARTUP_COMPLETE);


    }
}

