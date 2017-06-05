
import { EnemySecondaryStates } from "./../component/GameComponents";
import { EnemyStateComponent } from "./../component/GameComponents";
import { EnemyPrimaryStates,EnemyPrimaryState } from "./../component/GameComponents";
import { PositionComponent } from "./../component/GameComponents";
import { StateComponent } from "./../component/GameComponents";
import { GameComponentTypes } from "./../types/GameComponentTypes";
import { System } from "./../../tslib/moon/src/System";
import { World } from "./../../tslib/moon/src/World";
import { Entity } from "./../../tslib/moon/src/Entity";
import { Display } from "./../../tslib/dalste/util/Display";
export class NPCAISystem extends System {
    protected _npcEntities: Entity[];


    //inject
    protected _display:Display = undefined;

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
        this._npcEntities = this.world.getEntities(GameComponentTypes.NPC,
            GameComponentTypes.STATE,
            GameComponentTypes.POSITION
        );
    }

    /**
     * called when this system is added to the MOON CES World here you should do system initialisation
     * @param world 
     */
    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("NPCAISystem Added");


        this.world.entityAdded(GameComponentTypes.NPC,
            GameComponentTypes.STATE,
            GameComponentTypes.POSITION).add(this.onNpcAdded, this);
        this.world.entityRemoved(GameComponentTypes.NPC,
            GameComponentTypes.STATE,
            GameComponentTypes.POSITION).add(this.onNpcRemoved, this);

        this.refreshEntityLists();

    }

    onNpcAdded(entity: Entity) {
        cc.log("NPC Added");
        this.refreshEntityLists();
    }

    onNpcRemoved(entity: Entity) {
        cc.log("NPC removed");
        this.refreshEntityLists();
    }

    update(dt: number) {


        for (var i = 0; i < this._npcEntities.length; i++) {
            var e: Entity = this._npcEntities[i];

            var sc: StateComponent = e.getComponent(GameComponentTypes.STATE) as StateComponent;
    
        
            switch (sc.primaryState.current) {
                case EnemyPrimaryStates.IDLE:
                    this.handleEnemyIdleState(e);
                    break;
                case EnemyPrimaryStates.MOVING:
                    this.handleEnemyMovingState(e);
                    break;
                case EnemyPrimaryStates.DEAD:
                    this.handleEnemyDeadState(e);
                    break;
            }
        }

    }

    handleEnemyIdleState(e: Entity) {
    
        var pc: PositionComponent = e.getComponent(GameComponentTypes.POSITION) as PositionComponent;
        var sc: EnemyStateComponent = e.getComponent(GameComponentTypes.STATE) as EnemyStateComponent;
        sc.primaryState.start();

        if(pc.position.x >= this._display.middleMiddle().x){
            sc.secondaryState.moveLeft();
        }else
        {
             sc.secondaryState.moveRight();
        }
    }
    handleEnemyMovingState(e: Entity) {

        var pc: PositionComponent = e.getComponent(GameComponentTypes.POSITION) as PositionComponent;
        var sc: EnemyStateComponent = e.getComponent(GameComponentTypes.STATE) as EnemyStateComponent;
         switch (sc.secondaryState.current) {
                case EnemySecondaryStates.MOVING_LEFT:
                pc.position.x -=1;
                    if(pc.position.x <= this._display.middleLeft().x){
                        sc.secondaryState.moveRight();
                    }
                break;
                case EnemySecondaryStates.MOVING_RIGHT:
                pc.position.x +=1;
                if(pc.position.x >= this._display.middleRight().x){
                        sc.secondaryState.moveLeft();
                    }
                break ;
         }
    }

    handleEnemyDeadState(e: Entity) {
     
    }
    /**
    * called when this system is removed fromthe MOON CES World here you should do system cleanup
    * @param world 
    */
    removedFromWorld(): void {
        super.removedFromWorld();
        this._npcEntities = null;
    }


}