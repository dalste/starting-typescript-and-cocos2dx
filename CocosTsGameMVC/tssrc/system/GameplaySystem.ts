import { GameComponentTypes } from "./../types/GameComponentTypes";
import { DirectionalSwipeGestureRecogniser } from "./../../tslib/dalste/gestures/DirectionalSwipeGestureRecogniser";
import { CharacterEntityCreationOptions } from "./../factory/entity/CharacterEntityFactory";
import { World } from "./../../tslib/moon/src/World";
import { System } from "./../../tslib/moon/src/System";
import { Entity } from "./../../tslib/moon/src/Entity";
import { IFactory } from "./../factory/IFactory";
import { CharacterEntityTypes } from "./../types/EntityTypes";


/**
 * @class GameplaySystem
 * @description this system handles the core game logic, and player input logic 
 */
export class GameplaySystem extends System {

    /**
     * used to create character entities injected by dijon IOC container
     */
    //inject
    protected _characterEntityFactory: IFactory<CharacterEntityCreationOptions, Entity> = null;

    /**
     * cached list of entities with GameComponentTypes.PLAYER component
     */
    protected _playerEntities: Entity[];


    /**
     * cached list of entities with GameComponentTypes.PLAYER_INPUT component
     */
    protected _inputEffectedEntities: Entity[];


    /**
     * @description called by dijon IOC container after instance is created and dependencies injected
     */
    setup() {

    }

    constructor() {
        super();
    }


    
    /**
     * @description maintains the lists of entities that we are interested in 
     */
    refreshEntityLists() {
        this._playerEntities = this.world.getEntities(GameComponentTypes.PLAYER, GameComponentTypes.STATE);
        this._inputEffectedEntities = this.world.getEntities(GameComponentTypes.PLAYER_INPUT);
    }

    /**
     * called when this system is added to the MOON CES World here you should do system initialisation
     * @param world 
     */
    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("GameplaySystem Added");
        this.initialiseGame();
        var scope = this;

        this.world.entityAdded(GameComponentTypes.PLAYER, GameComponentTypes.STATE).add(this.onEntityWeAreInterestedInAddedRemoved, this);
        this.world.entityRemoved(GameComponentTypes.PLAYER, GameComponentTypes.STATE).add(this.onEntityWeAreInterestedInAddedRemoved, this);
        this.world.entityAdded(GameComponentTypes.PLAYER_INPUT).add(this.onEntityWithInputComponentAdded, this);
        this.world.entityRemoved(GameComponentTypes.PLAYER_INPUT).add(this.onEntityWithInputComponentRemoved, this);

        scope.refreshEntityLists();

    }

    /**
     * @description handles component added events for entities with GameComponentTypes.PLAYER_INPUT component
     * @param entity 
     */
    onEntityWithInputComponentAdded(entity: Entity) {
        this.refreshEntityLists();
        entity.onComponentAdded.add(this.onEntityWithInputComponentComponentAdded, this);
    }

    /**
     * @description handles component removed events for entities with GameComponentTypes.PLAYER_INPUT component
     * @param entity 
     */
    onEntityWithInputComponentRemoved(entity:Entity){
        entity.onComponentAdded.remove(this.onEntityWithInputComponentComponentAdded, this);
    }

    /**
     * @description general handler for the adding and removal of entities we are interested in 
     * @param entity 
     */
    onEntityWeAreInterestedInAddedRemoved(entity: Entity) {
        this.refreshEntityLists();
    }

    /**
     * @description  handles componentAdded events for entities with with GameComponentTypes.PLAYER_INPUT component
     * @param entity 
     */
    onEntityWithInputComponentComponentAdded(entity: Entity, componentName: string) {
        switch (componentName) {
            case GameComponentTypes.PLAYER_INPUT_EVENT:
                //handle entity input event here
                cc.log("entity input event occured");
                //remove event component
                entity.removeComponent(GameComponentTypes.PLAYER_INPUT_EVENT);
                break;
        }
    }



    /**
     * do our game initialisation
     * @description create and add player and NPC to world
     */
    protected initialiseGame(): void {
        var ceco = new CharacterEntityCreationOptions(CharacterEntityTypes.PLAYER, "Player");
        var player: Entity = this._characterEntityFactory.create(ceco);

        var ceco2 = new CharacterEntityCreationOptions(CharacterEntityTypes.NPC, "Npc");
        var npc: Entity = this._characterEntityFactory.create(ceco2);

        this.world.addEntity(player);
        this.world.addEntity(npc);
    }

    /**
     * 
     * @param dt 
     */
    update(dt: number) {


    }

    /**
     * called when the system is removed from the world, do all cleanup here
     */
    removedFromWorld(): void {
        super.removedFromWorld();
        this._inputEffectedEntities = null;
        this._playerEntities = null;
        this._characterEntityFactory = null;
    }

}