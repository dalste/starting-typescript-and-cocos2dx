import { IFactory } from "./../IFactory";
import { ICreationOptions } from "./../ICreationOptions";
import { CharacterAssetTypes } from "./../../types/AssetTypes";
import { MockAsset, MockAssetColours } from "./characterassetfactory/MockAsset";

/**
 * @class CharacterAssetCreationOptions
 * @description provides creation options to CharacterAssetFactory
 */
export class CharacterAssetCreationOptions implements ICreationOptions<CharacterAssetTypes>{
    _type:CharacterAssetTypes; 
    constructor(type:CharacterAssetTypes){
            this._type= type;
    }
    getType():CharacterAssetTypes{
        return this._type;
    }
}

/**
 * @class CharacterAssetFactory
 * @param CharacterAssetCreationOptions
 * Uses the returned type from character creation options to create the appropriate cc.Node derived asset
 * 
 */
export  class CharacterAssetFactory implements IFactory<CharacterAssetCreationOptions,cc.Node> { 

    create(options:CharacterAssetCreationOptions):cc.Node{

        switch( options.getType()){
            case CharacterAssetTypes.NPC:
                return new MockAsset<CharacterAssetTypes,Object>(CharacterAssetTypes.NPC,{},50,MockAssetColours.PINK,"NPC");
 
            case CharacterAssetTypes.NPC_MOCK:
                return new MockAsset<CharacterAssetTypes,Object>(CharacterAssetTypes.NPC_MOCK,{},50,MockAssetColours.PINK,"NPC MOCK");
 
            case CharacterAssetTypes.PLAYER:
                return new MockAsset<CharacterAssetTypes,Object>(CharacterAssetTypes.NPC,{},50,MockAssetColours.GREEN,"PLAYER");

            case CharacterAssetTypes.PLAYER_MOCK:
                return new MockAsset<CharacterAssetTypes,Object>(CharacterAssetTypes.NPC,{},50,MockAssetColours.GREEN,"PLAYER MOCK");

        }

    }
}
