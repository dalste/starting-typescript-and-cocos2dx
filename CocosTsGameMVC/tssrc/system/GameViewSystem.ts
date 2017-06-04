import { GameComponentTypes } from "./../types/GameComponentTypes";
import { World } from "./../../tslib/moon/src/World";
import { Entity } from "./../../tslib/moon/src/Entity";
import { System } from "./../../tslib/moon/src/System";
import { CocosRenderNode } from "./../component/GameComponents";
export class GameViewSystem extends System {
    /**
     * cached list of the COCOS_RENDER_NODE entities this system operates upon 
     */
    protected _renderEntities: Entity[];
    /**
     * the cc.Node container for our render nodes
     */
    protected _container: cc.Node;
    setup() {

    }

    constructor(container: cc.Node) {
        super();
        this._container = container;

    }


    refreshEntityLists() {
        this._renderEntities = this.world.getEntities(GameComponentTypes.COCOS_RENDER_NODE);
    }

    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("GameViewSystem Added");
        var scope = this;

        this.world.entityAdded(GameComponentTypes.COCOS_RENDER_NODE).add(function (entity: Entity) {
            scope.refreshEntityLists();
            cc.log("render node added ");
            var crnc = entity.getComponent(GameComponentTypes.COCOS_RENDER_NODE) as CocosRenderNode;
            scope._container.addChild(crnc.node);

        });

        this.world.entityRemoved(GameComponentTypes.COCOS_RENDER_NODE).add(function (entity: Entity) {
            scope.refreshEntityLists();
            cc.log("render node removed ");
            var crnc = entity.getComponent(GameComponentTypes.COCOS_RENDER_NODE) as CocosRenderNode;
            scope._container.removeChild(crnc.node);

        });

    }

    update(dt: number) {


    }

    /**
     * do all cleanup here
     */
    removedFromWorld():void{
        super.removedFromWorld();
        this._renderEntities =null;
        this._container = null;
    }


}