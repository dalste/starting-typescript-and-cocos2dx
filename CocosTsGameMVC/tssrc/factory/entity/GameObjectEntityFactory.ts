import { IFactory } from "./../IFactory";
import { IAssetContainer } from "./../IAssetContainer";
import { PlayerBullet } from "./../../component/GameComponents";
import { NPCBullet } from "./../../component/GameComponents";
import { PhysicsComponent } from "./../../component/GameComponents";
import { GameObjectAssetTypes } from "./../../types/AssetTypes";
import { GameObjectAssetCreationOptions } from "./../view/GameObjectAssetFactory";
import { Entity } from "./../../../tslib/moon/src/Entity";
import { GameObjectEntityTypes } from "./../../types/EntityTypes";
import { MovementComponent } from "./../../component/GameComponents";
import { PositionComponent } from "./../../component/GameComponents";

import { StateComponent } from "./../../component/GameComponents";

import { ICreationOptions } from "./../ICreationOptions";

import { CocosRenderNode } from "./../../component/GameComponents";
import { Display } from "./../../../tslib/dalste/util/Display";
import { StateMachine, StateMachineConfig } from "javascript-state-machine";

/**
 * @class GameObjectEntityCreationOptions
 * @description provides creation options to GameObjectAssetFactory
 */
export class GameObjectEntityCreationOptions implements ICreationOptions<GameObjectEntityTypes>{
    private _type: GameObjectEntityTypes;
    private _name: string;
    private _spawnPosition: cc.Point;



    /**
     * 
     * @param type - the type of object to create 
     * @param name -the name assigned to the cc.node see cc.node.name
     */
    constructor(type: GameObjectEntityTypes, name: string, spawnPosition: cc.Point) {
        this._type = type;
        this._name = name;
        this._spawnPosition = spawnPosition;
    }
    getType(): GameObjectEntityTypes {
        return this._type;
    }

    getSpawnPosition(): cc.Point {
        return this._spawnPosition;
    }

    getName(): string {
        return this._name;
    }
}

/**
 * @class GameObjectEntityFactory
 * @param GameObjectEntityCreationOptions
 * Uses the returned type from GameObject creation options to create the appropriate cc.Node derived asset
 * 
 */
export class GameObjectEntityFactory implements IFactory<GameObjectEntityCreationOptions, Entity> {
    //inject
    private _gameObjectAssetFactory: IFactory<GameObjectAssetCreationOptions,IAssetContainer<cc.Node>> = null;

    //inject 
    private _display: Display = undefined;

    /**
     * a counter used to create unique bullet names
     */
    private _bulletCount: number = 0;

    create(options: GameObjectEntityCreationOptions): Entity {
        var e = new Entity();
        switch (options.getType()) {
            case GameObjectEntityTypes.NPC_BULLET:
            case GameObjectEntityTypes.PLAYER_BULLET:
                /**
                 * create the bullet  asset
                 */

                var caco = null;
                if (options.getType() == GameObjectEntityTypes.NPC_BULLET) {
                    var npcbc = new NPCBullet(); //identify entity npc bullet
                    e.addComponent(npcbc);
                    caco = new GameObjectAssetCreationOptions(GameObjectAssetTypes.NPC_BULLET, "npcb_" + (this._bulletCount++));
                }
                else {
                    var plyb = new PlayerBullet(); //identify entity as player bullet
                    e.addComponent(plyb);
                    caco = new GameObjectAssetCreationOptions(GameObjectAssetTypes.PLAYER_BULLET, "pb_" + (this._bulletCount++));
                }

                var assetContainer = this._gameObjectAssetFactory.create(caco);
                assetContainer.getAsset().setPosition(options.getSpawnPosition());

                /**
                 * create and add position component
                 */
                var posc = new PositionComponent();
                posc.position = cc.p(assetContainer.getAsset().getPositionX(), assetContainer.getAsset().getPositionY());
                e.addComponent(posc);

                /**
                 * create and add cocos render node component to contain asset
                 */
                var crnc = new CocosRenderNode();
                crnc.assetContainer = assetContainer;
                e.addComponent(crnc);


                /**
                 * create and add physics component so its picked up by physics system
                 */
                var pc = new PhysicsComponent();
                pc.boundingRadius = 10;
                e.addComponent(pc);

                /**
                 * create and add input movement component to support movement
                 */
                var mv = new MovementComponent();
                mv.movementDirectionMag = 0;
                mv.movementDirectionNorm = cc.p(0, 0);
                mv.movementDamping = 0.99;
                e.addComponent(mv);

                break;




        }
        return e;

    }
}
