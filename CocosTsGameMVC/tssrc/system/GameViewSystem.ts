import { GameComponentTypes } from "./../types/GameComponentTypes";
import { PositionComponent } from "./../component/GameComponents";
import { World } from "./../../tslib/moon/src/World";
import { Entity } from "./../../tslib/moon/src/Entity";
import { System } from "./../../tslib/moon/src/System";
import { CocosRenderNode } from "./../component/GameComponents";

export class GameViewSystem extends System {
    /**
     * cached list of the GameComponentTypes.COCOS_RENDER_NODE entities this system operates upon 
     */
    protected _renderEntities: Entity[];


    /**
   * cached list of the GameComponentTypes.COCOS_RENDER_NODE && GameComponentTypes.POSITIONentities this system operates upon 
   */
    protected _renderPositionEntities: Entity[];
    /**
     * the cc.Node container for our render nodes
     */
    protected _container: cc.Node;


    /**
    * @description called by dijon IOC container after instance is created and dependencies injected
    */
    setup() {

    }

    constructor(container: cc.Node) {
        super();
        this._container = container;

    }

    /**
     * @description maintains the lists of entities that we are interested in 
     */
    refreshEntityLists() {
        this._renderEntities = this.world.getEntities(GameComponentTypes.COCOS_RENDER_NODE);
        this._renderPositionEntities = this.world.getEntities(GameComponentTypes.COCOS_RENDER_NODE, GameComponentTypes.POSITION);
    }

    /**
    * called when this system is added to the MOON CES World here you should do system initialisation
    * @param world 
    */
    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("GameViewSystem Added");
        var scope = this;

        this.world.entityAdded(GameComponentTypes.COCOS_RENDER_NODE).add(this.onEntityWithRenderNodeComponentAdded, this);

        this.world.entityRemoved(GameComponentTypes.COCOS_RENDER_NODE).add(this.onEntityWithRenderNodeComponentRemoved, this);

        this.world.entityAdded(GameComponentTypes.COCOS_RENDER_NODE, GameComponentTypes.POSITION).add(this.onEntityWithRenderNodeAndPositionComponentAdded, this);

        this.world.entityRemoved(GameComponentTypes.COCOS_RENDER_NODE, GameComponentTypes.POSITION).add(this.onEntityWithRenderNodeAndPositionComponentRemoved, this);
        this.refreshEntityLists();
    }

    onEntityWithRenderNodeComponentAdded(e: Entity): void {
        this.refreshEntityLists();
        cc.log("render node added ");
        var crnc = e.getComponent(GameComponentTypes.COCOS_RENDER_NODE) as CocosRenderNode;
        this._container.addChild(crnc.assetContainer.getAsset(), 0);
    }

    onEntityWithRenderNodeComponentRemoved(e: Entity): void {
        this.refreshEntityLists();
        cc.log("render node removed ");
        var crnc = e.getComponent(GameComponentTypes.COCOS_RENDER_NODE) as CocosRenderNode;

        this._container.removeChild(crnc.assetContainer.getAsset());
        crnc.assetContainer.clearAsset();
    }

    onEntityWithRenderNodeAndPositionComponentAdded(e: Entity): void {
        cc.log("onEntityWithRenderNodeAndPositionComponentAdded");
        this.refreshEntityLists();
    }

    onEntityWithRenderNodeAndPositionComponentRemoved(e: Entity): void {

        cc.log("onEntityWithRenderNodeAndPositionComponentRemoved");
        this.refreshEntityLists();
    }


    update(dt: number) {
        for (var i = 0; i < this._renderPositionEntities.length; i++) {
            var e = this._renderPositionEntities[i];
            var pc: PositionComponent = e.getComponent(GameComponentTypes.POSITION) as PositionComponent;
            var sc: CocosRenderNode = e.getComponent(GameComponentTypes.COCOS_RENDER_NODE) as CocosRenderNode;
            cc.log();
            sc.setPosition(cc.p(pc.position.x, pc.position.y));
        }

    }

    /**
    * called when this system is removed fromthe MOON CES World here you should do system cleanup
    * @param world 
    */
    removedFromWorld(): void {
        super.removedFromWorld();
        this._renderEntities = null;
        this._container = null;
    }


}