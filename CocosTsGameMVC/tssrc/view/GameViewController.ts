import { ViewController } from "./../../tslib/dalste/mvc/ViewController";
import { PlayerInputSystem } from "./../system/PlayerInputSystem";
import { World } from "./../../tslib/moon/src/World";
import { GameViewSystem } from "./../system/GameViewSystem";
import { NPCAISystem } from "./../system/NPCAISystem";
import { GameplaySystem } from "./../system/GameplaySystem";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import { CharacterAssetTypes } from "./../types/AssetTypes";
import { CharacterAssetCreationOptions } from "./../factory/view/CharacterAssetFactory";
import { IFactory } from "./../factory/IFactory";
import { Display } from "./../../tslib/dalste/util/Display";
import { GameModel } from "./../model/GameModel";
import { GameView } from "./GameView";

declare var ccui: any;
export class GameViewController extends ViewController {



    //inject
    private _display: Display = undefined;

    //inject
    protected _gameModel: GameModel = undefined;


    private _world: World;

    onViewReady(): void {
        this.getView().getUIEventBus().add(this.onViewUIEvent, this);
        this.getView().getEnterSignal().add(this.onViewEnter, this);
        this.getView().getExitSignal().add(this.onViewExit, this);
        this.getView().getEnterTransitionDidFinishSignal().add(this.onViewEnterTransitionDidFinish, this);
        this.getView().getExitTransitionDidStartSignal().add(this.onViewExitTransitionDidStart, this);

    }

    /**
     * @function onViewEnter 
     * @description recommended here that you initialise any resources required for the view/scene
     * --TIP: here you could also load and re instate the saved game state 
     * @see cc.Node onEnter
     */
    onViewEnter(): void {
        cc.log("GameViewController::onViewEnter");
        this._gameModel.bind(GameModel.NPC_SCORE, this.onNpcScoreUpdated, this);
        this._gameModel.bind(GameModel.PLAYER_SCORE, this.onPlayerScoreUpdated, this);
        this._gameModel.setPlayerScore(0);
        this._gameModel.setNpcScore(0);
        this.initialiseGameWorld();
    }

    protected initialiseGameWorld(): void {

        /**
         * create the MOON CES world to hold our games entities and systems
         */
        this._world = new World();

        /**
        * create the systems for our world
        * GameplaySystem - controls the core gameplay logic - creates our npc and player entities upon game startup
        * NPCAISystem - controlls the AI for entities that have the NPC component
        * GameViewSystem - controls adding and removing cc.Nodes (wrapped by CocosRenderNode components)to and from the display
        * PlayerInputSystem - manages a Gesture recogniser that recognises swipe and tap events, 
        * adds a PlayerInputEvent coponent to all entities that contain a PlayerInput Component
        */
        var gps = this._system.getObject("GameplaySystem");//new GameplaySystem();
        var npcs = this._system.getObject("NPCAISystem"); //new NPCAISystem();
        var ps = this._system.getObject("PhysicsSystem"); //new NPCAISystem();
        var gvs = new GameViewSystem(this.getView().getAsset());
        var pis = new PlayerInputSystem();


        /**
         * add our systems to the world
         */
        this._world.addSystem(gvs);
        this._world.addSystem(npcs);
        this._world.addSystem(pis);
        this._world.addSystem(ps);
        this._world.addSystem(gps);


        /**
         * schedule our update(dt:number) function
         */
        cc.director.getScheduler().scheduleUpdateForTarget(this, 1, false);
    }

    /**
     * @description this update function is called every frame 
     * it is registered  via :cc.director.getScheduler().scheduleUpdateForTarget(this, 1, false);
     * @param dt 
     */
    update(dt: number) {
        this._world.update(dt);
    }

    onViewEnterTransitionDidFinish(): void {

        cc.log("GameViewController::onViewEnterTransitionDidFinish");
    }

    /**
     * @function onViewExit 
     * @description recommended here that you free any resources allocated for the view/scene 
     * ---- TIP here you could also save the game state
     * @see cc.Node onEnter
     */
    onViewExit(): void {
        cc.director.getScheduler().unscheduleUpdateForTarget(this);
        this._world.cleanUp();
        this._world = null;
        this._gameModel.unbind(GameModel.NPC_SCORE, this.onNpcScoreUpdated, this);
        this._gameModel.unbind(GameModel.PLAYER_SCORE, this.onPlayerScoreUpdated, this);
        cc.log("GameViewController::onViewExit");
    }

    onViewExitTransitionDidStart(): void {
        cc.log("GameViewController::onViewExitTransitionDidStart");
    }

    onNpcScoreUpdated(oldVal: number, newVal: number): void {
        var gv = this.getView() as GameView;
        gv.setNpcScore(newVal);
    }

    onPlayerScoreUpdated(oldVal: number, newVal: number): void {
        var gv = this.getView() as GameView;
        gv.setPlayerScore(newVal);
    }
    onViewUIEvent(event: string): void {
        switch (event) {
            case "exitGameButtonPressed":
                this._system.notify(ApplicationEvents.APP_GOTO_SPLASH_SCENE);
                break;
        }
    }
}