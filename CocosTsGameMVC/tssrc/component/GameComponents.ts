
import { IAssetContainer } from "./../factory/IAssetContainer";
import { Component } from "./../../tslib/moon/src/Component";
import { GameComponentTypes } from "./../types/GameComponentTypes";
import { StateMachine } from "javascript-state-machine";

export class MovementComponent extends Component{
       name: string = GameComponentTypes.MOVEMENT;
    /**
     * @description the normalised vector of the  movement direction
     */
    movementDirectionNorm:cc.Point;
    /**
     * the magnitude of the  movement direction i.e  speed
     */
    movementDirectionMag:number

    /**
     * the damping to apply to  movement over time
     */
    movementDamping: number;
}

/**
 * @class PhysicsComponent
 * @description  identifies an entity to be processed by physics system
 */
export class PhysicsComponent extends Component {
    name: string = GameComponentTypes.PHYSICS;
    boundingRadius: number = 30;
}


/**
 * @class PositionComponent
 * @description  wraps a cc.Point to describe an entities position
 */
export class PositionComponent extends Component {
    name: string = GameComponentTypes.POSITION;
    position: cc.Point = cc.p(0, 0);
}

/**
 * @class StateComponent
 * @description   wraps two Statemachine objects for an entities Primary State and Secondary State
 */
export class StateComponent extends Component {
    name: string = GameComponentTypes.STATE;
    primaryState: StateMachine;
    secondaryState: StateMachine;
}

/**
 * describes allowable enemy states
 */
export class EnemyPrimaryStates {
    static DEAD: string = "dead";
    static MOVING: string = "moving";
    static IDLE: string = "idle";
}
/**
 * overrides StateMachine interface with events for enemy primary state
 */
export interface EnemyPrimaryState extends StateMachine {

    start(): void;
    die(): void;
}

/**
 * describes allowable enemy secondary states
 */
export class EnemySecondaryStates {
    static NONE: string = "none";
    static MOVING_LEFT: string = "movingLeft";
    static MOVING_RIGHT: string = "movingRight";
}

/**
 * overrides StateMachine interface with events for enemy secondary state
 */
export interface EnemySecondaryState extends StateMachine {
    moveLeft(): void;
    moveRight(): void;
}
/**
 * @class EnemyStateComponent overrides StateComponent to provide  EnemyPrimaryState as primaryState
 * @description   wraps two Statemachine objects for an entities Primary State and Secondary State
 */
export class EnemyStateComponent extends StateComponent {
    primaryState: EnemyPrimaryState;
    secondaryState: EnemySecondaryState;
    timeLastBulletShot: number =0;
}

/**
 * overrides StateMachine interface with events for enemy primary state
 */
export interface PlayerPrimaryState extends StateMachine {

    die(): void;
}
/**
 * @class PlayerStateComponent overrides StateComponent to provide  PlayerPrimaryState primaryState
 * @description   wraps two Statemachine objects for an entities Primary State and Secondary State
 */
export class PlayerStateComponent extends StateComponent {
    primaryState: PlayerPrimaryState;
}



/**
 * @class ScriptedNPCAI
 * @description  identifies an entity as having Scripted AI
 */
export class ScriptedNPCAI extends Component {
    name: string = GameComponentTypes.SCRIPTED_NPC_AI;
}

/**
 * @class CocosRenderNode
 * @description  wraps a cc.Node object 
 */
export class CocosRenderNode extends Component {
    name: string = GameComponentTypes.COCOS_RENDER_NODE;
   // node: cc.Node;
    assetContainer: IAssetContainer<cc.Node>;
    positionConstOffset: cc.Point =  cc.p(0, 0); //constant position offset when using setPosition

    getPosition(): cc.Point {
        return this.assetContainer.getAsset().getPosition();
    }
    setPosition(x: any, y?: any) {
        var posToSet: cc.Point = null;
        if (y != null) {
            posToSet = cc.p(x, y);
        } else
            posToSet = x;
        posToSet = cc.pAdd(posToSet, this.positionConstOffset);
        this.assetContainer.getAsset().setPosition(posToSet);

    }
}


/**
 * @class PlayerInput
 * @description  identifies an entity as being a PlayerInput
 */
export class PlayerInput extends Component {
    name: string = GameComponentTypes.PLAYER_INPUT;
}


/**
 * @class PlayerInputEvent component 
 * @description  describes a PlayerInput event
 */
export class PlayerInputEvent extends Component {
    name: string = GameComponentTypes.PLAYER_INPUT_EVENT;
    type: number;
    positions: cc.Point[];
    location: cc.Point;
    target: cc.Node;
    swipeDir: number;
    direction: cc.Point;
    constructor() {
        super();
        this.positions = [];
    }
}

/**
 * @class Player
 * @description  identifies an entity as being a Player
 */
export class Player extends Component {
    name: string = GameComponentTypes.PLAYER;

    
}

/**
 * @class NPC
 * @description  identifies an entity as being an NPC
 */
export class NPC extends Component {
    name: string = GameComponentTypes.NPC;
}


/**
 * @class Player
 * @description  identifies an entity as being a Player bullet
 */
export class PlayerBullet extends Component {
    name: string = GameComponentTypes.PLAYER_BULLET;

    
}

/**
 * @class NPC
 * @description  identifies an entity as being an NPC bullet
 */
export class NPCBullet extends Component {
    name: string = GameComponentTypes.NPC_BULLET;
}







