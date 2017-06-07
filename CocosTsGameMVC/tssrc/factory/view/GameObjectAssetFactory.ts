import { IFactory } from "./../IFactory";
import { ICreationOptions } from "./../ICreationOptions";
import { GameObjectAssetTypes } from "./../../types/AssetTypes";
import { MockAsset, MockAssetColours } from "./MockAsset";

/**
 * @class GameObjectAssetCreationOptions
 * @description provides creation options to GameObjectAssetFactory
 */
export class GameObjectAssetCreationOptions implements ICreationOptions<GameObjectAssetTypes>{
    private _type:GameObjectAssetTypes; 
    private _name:string;

    /**
     * 
     * @param type - the type of object to create 
     * @param name -the name assigned to the cc.node see cc.node.name
     */
    constructor(type:GameObjectAssetTypes, name:string){
            this._type= type;
            this._name = name;
    }
    getType():GameObjectAssetTypes{
        return this._type;
    }

    getName():string{
        return this._name;
    }
}

/**
 * @class GameObjectAssetFactory
 * @param GameObjectAssetCreationOptions
 * Uses the returned type from GameObject creation options to create the appropriate cc.Node derived asset
 * 
 */
export  class GameObjectAssetFactory implements IFactory<GameObjectAssetCreationOptions,cc.Node> { 

    create(options:GameObjectAssetCreationOptions):cc.Node{

        switch( options.getType()){
            case GameObjectAssetTypes.NPC_BULLET:
                return new MockAsset<GameObjectAssetTypes>(options,10,MockAssetColours.PINK,"nb");
 
            case GameObjectAssetTypes.PLAYER_BULLET:
                return new MockAsset<GameObjectAssetTypes>(options,10,MockAssetColours.GREEN,"pb");

           

        }

    }
}
