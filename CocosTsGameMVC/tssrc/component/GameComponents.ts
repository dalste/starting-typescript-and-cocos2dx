
import { Component } from "./../../tslib/moon/src/Component";
import { GameComponentTypes } from "./../types/GameComponentTypes";
import { StateMachine } from "javascript-state-machine";

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
    node: cc.Node;
    positionConstOffset: cc.Point = new cc.Point(0, 0); //constant position offset when using setPosition

    getPosition(): cc.Point {
        return this.node.getPosition();
    }
    setPosition(x: any, y?: any) {
        var posToSet: cc.Point = null;
        if (y != null) {
            posToSet = cc.p(x, y);
        } else
            posToSet = x;
        posToSet = cc.pAdd(posToSet, this.positionConstOffset);
        this.node.setPosition(posToSet);

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







