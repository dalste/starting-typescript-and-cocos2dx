
import { GameComponentTypes } from "./../types/GameComponentTypes";
import { System } from "./../../tslib/moon/src/System";
import { World } from "./../../tslib/moon/src/World";
import { Entity } from "./../../tslib/moon/src/Entity";
export class NPCAISystem extends System {
    protected _renderEntities: Entity[];
    setup() {

    }

    constructor() {
        super();
    }


    refreshEntityLists() {
        this._renderEntities = this.world.getEntities(GameComponentTypes.SCRIPTED_NPC_AI,GameComponentTypes.STATE);
    }

    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("NPCAISystem Added");
        var scope = this;

        this.world.entityAdded(GameComponentTypes.SCRIPTED_NPC_AI,GameComponentTypes.STATE).add(function (entity: Entity) {
            scope.refreshEntityLists();
        });

        this.world.entityRemoved(GameComponentTypes.SCRIPTED_NPC_AI,GameComponentTypes.STATE).add(function (entity: Entity) {
            scope.refreshEntityLists();

        });

        scope.refreshEntityLists();

    }

    update(dt: number) {


    }
    /**
     * do all cleanup here
     */
    removedFromWorld():void{
        super.removedFromWorld();
        this._renderEntities = null;
    }


}