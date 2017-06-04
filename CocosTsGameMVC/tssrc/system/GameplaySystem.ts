import { GameComponentTypes } from "./../types/GameComponentTypes";
import { DirectionalSwipeGestureRecogniser } from "./../../tslib/dalste/gestures/DirectionalSwipeGestureRecogniser";
import { CharacterEntityCreationOptions } from "./../factory/entity/CharacterEntityFactory";
import { World } from "./../../tslib/moon/src/World";
import { System } from "./../../tslib/moon/src/System";
import { Entity } from "./../../tslib/moon/src/Entity";
import { IFactory } from "./../factory/IFactory";
import { CharacterEntityTypes } from "./../types/EntityTypes";

export class GameplaySystem extends System {

    //inject
    protected _characterEntityFactory: IFactory<CharacterEntityCreationOptions, Entity> = null;

    protected _playerEntities: Entity[];

    protected _inputEffectedEntities: Entity[];

    setup() {

    }

    constructor() {
        super();
    }


    refreshEntityLists() {
        this._playerEntities = this.world.getEntities(GameComponentTypes.PLAYER, GameComponentTypes.STATE);
        this._inputEffectedEntities = this.world.getEntities(GameComponentTypes.PLAYER_INPUT);
    }

    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("GameplaySystem Added");
        this.initialiseGame();
        var scope = this;

        this.world.entityAdded(GameComponentTypes.PLAYER, GameComponentTypes.STATE).add(function (entity: Entity) {
            scope.refreshEntityLists();
        });

        this.world.entityRemoved(GameComponentTypes.PLAYER, GameComponentTypes.STATE).add(function (entity: Entity) {
            scope.refreshEntityLists();

        });

        this.world.entityAdded(GameComponentTypes.PLAYER_INPUT).add(function (entity: Entity) {
            scope.refreshEntityLists();

            //handle input events
            entity.onComponentAdded.add(function (entity: Entity, componentName: string) {
                switch (componentName) {
                    case GameComponentTypes.PLAYER_INPUT_EVENT:
                        //handle player input event here
                        cc.log("player input event occured");
                        //remove event component
                        entity.removeComponent(GameComponentTypes.PLAYER_INPUT_EVENT);
                        break;
                }
            });
        });

        this.world.entityRemoved(GameComponentTypes.PLAYER_INPUT).add(function (entity: Entity) {
            scope.refreshEntityLists();

        });

        scope.refreshEntityLists();

    }

    protected initialiseGame() {
        var ceco = new CharacterEntityCreationOptions(CharacterEntityTypes.PLAYER, "Player");
        var player: Entity = this._characterEntityFactory.create(ceco);

        var ceco2 = new CharacterEntityCreationOptions(CharacterEntityTypes.NPC, "Npc");
        var npc: Entity = this._characterEntityFactory.create(ceco2);

        this.world.addEntity(player);
        this.world.addEntity(npc);
    }


    update(dt: number) {


    }

    /**
     * do all cleanup here
     */
    removedFromWorld():void{
        super.removedFromWorld();
        this._inputEffectedEntities = null;
        this._playerEntities = null;
        this._characterEntityFactory = null;
    }

}