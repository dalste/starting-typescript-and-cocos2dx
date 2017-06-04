import { GameComponentTypes } from "./../types/GameComponentTypes";
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
    setup() {

    }

    constructor() {
        super();
    }


    refreshEntityLists() {
        this._playerEntities = this.world.getEntities(GameComponentTypes.PLAYER);
    }

    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("GameplaySystem Added");
        this.initialiseGame();
        var scope = this;

        this.world.entityAdded(GameComponentTypes.PLAYER).add(function (entity: Entity) {
            scope.refreshEntityLists();
        });

        this.world.entityRemoved(GameComponentTypes.PLAYER).add(function (entity: Entity) {
            scope.refreshEntityLists();

        });

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


}