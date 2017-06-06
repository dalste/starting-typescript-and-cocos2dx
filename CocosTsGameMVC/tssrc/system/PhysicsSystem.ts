import { GameComponentTypes } from "./../types/GameComponentTypes";
import { PhysicsComponent } from "./../component/GameComponents";
import { Display } from "./../../tslib/dalste/util/Display";
import { PositionComponent } from "./../component/GameComponents";
import { InputTypes } from "./../types/InputTypes";
import { PlayerInputEvent } from "./../component/GameComponents";
import { DirectionalSwipeGestureRecogniser } from "./../../tslib/dalste/gestures/DirectionalSwipeGestureRecogniser";
import { CharacterEntityCreationOptions } from "./../factory/entity/CharacterEntityFactory";
import { World } from "./../../tslib/moon/src/World";
import { System } from "./../../tslib/moon/src/System";
import { Entity } from "./../../tslib/moon/src/Entity";
import { IFactory } from "./../factory/IFactory";
import { CharacterEntityTypes } from "./../types/EntityTypes";
import { MovementComponent } from "./../component/GameComponents";


/**
 * @class PhysicsSystem
 * @description this system handles movement and collisions for physics enabled entities
 * to keep things simple we will implement custom movement but 
 * it is quite easy to make this system wrap a chipmunk(recommended) or box2d world and update the physics component to have
 * chipmunk based capabilities
 * in the PhysicsSystem:update(dt) function you can call the physics world update function
 * and afterward update the    position and rotation for entities that require physics based movement
 * 
 */
export class PhysicsSystem extends System {

    /**
     * used to create character entities injected by dijon IOC container
     */
    //inject
    protected _gameObjectEntityFactory: IFactory<CharacterEntityCreationOptions, Entity> = null;

    //inject 
    protected _display: Display = undefined;

    /**
     * cached list of entities with GameComponentTypes.MOVEMENT, GameComponentTypes.PHYSICS, && GameComponentTypes.POSITION components
     */
    protected _physicsEntities: Entity[];





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
        this._physicsEntities = this.world.getEntities(GameComponentTypes.PHYSICS, GameComponentTypes.MOVEMENT, GameComponentTypes.POSITION);
    }

    /**
     * called when this system is added to the MOON CES World here you should do system initialisation
     * @param world 
     */
    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("PhysicsSystem Added");


        this.world.entityAdded(GameComponentTypes.PHYSICS, GameComponentTypes.MOVEMENT, GameComponentTypes.POSITION).add(this.onEntityWeAreInterestedInAdded, this);
        this.world.entityRemoved(GameComponentTypes.PHYSICS, GameComponentTypes.MOVEMENT, GameComponentTypes.POSITION).add(this.onEntityWeAreInterestedInRemoved, this);


        this.refreshEntityLists();

    }

    onEntityWeAreInterestedInAdded(entity: Entity) {
        cc.log("Physics Entity Added");
        this.refreshEntityLists();
    }

    onEntityWeAreInterestedInRemoved(entity: Entity) {
        this.refreshEntityLists();
    }






    /**
     * 
     * @param dt 
     */
    update(dt: number) {

        for (var i = 0; i < this._physicsEntities.length; i++) {
            var e: Entity = this._physicsEntities[i];
            var phyc = e.getComponent(GameComponentTypes.PHYSICS) as PhysicsComponent;
            var posc = e.getComponent(GameComponentTypes.POSITION) as PositionComponent;
            var mvc = e.getComponent(GameComponentTypes.MOVEMENT) as MovementComponent;

            //exit if mag too small
            if (mvc.movementDirectionMag < 0.01) {
                continue;
            }
            posc.position = cc.p(posc.position.x + (mvc.movementDirectionNorm.x * mvc.movementDirectionMag),
                posc.position.y + (mvc.movementDirectionNorm.y * mvc.movementDirectionMag));

            mvc.movementDirectionMag = mvc.movementDirectionMag * mvc.movementDamping;

            var boundsCollision = false;
            //ensure movement is contained within screen
            if (posc.position.y > this._display.topMiddle().y) {
                boundsCollision = true;
                posc.position.y = this._display.topMiddle().y;
            }
            if (posc.position.y < this._display.bottomMiddle().y) {
                boundsCollision = true;
                posc.position.y = this._display.bottomMiddle().y;
            }

            if (posc.position.x > this._display.middleRight().x) {
                boundsCollision = true;
                posc.position.x = this._display.middleRight().x;
            }
            if (posc.position.x < this._display.middleLeft().x) {
                boundsCollision = true;
                posc.position.x = this._display.middleLeft().x;
            }

            //remove npc and player bullets upon collision with game bounds
            if(boundsCollision){
                if(e.hasComponent(GameComponentTypes.NPC_BULLET) || e.hasComponent(GameComponentTypes.PLAYER_BULLET)){
                    this.world.removeEntity(e);
                }
            } 


        }


    }

    /**
     * called when the system is removed from the world, do all cleanup here
     */
    removedFromWorld(): void {
        super.removedFromWorld();
        this._physicsEntities = null;
        this._gameObjectEntityFactory = null;
    }

}