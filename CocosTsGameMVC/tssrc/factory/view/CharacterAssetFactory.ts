import { IFactory } from "./../IFactory";
import { IAssetContainer } from "./../IAssetContainer";
import { ICreationOptions } from "./../ICreationOptions";
import { CharacterAssetTypes } from "./../../types/AssetTypes";
import { MockAsset, MockAssetColours } from "./MockAsset";

/**
 * @class CharacterAssetCreationOptions
 * @description provides creation options to CharacterAssetFactory
 */
export class CharacterAssetCreationOptions implements ICreationOptions<CharacterAssetTypes>{
    private _type: CharacterAssetTypes;
    private _name: string;

    /**
     * 
     * @param type - the type of object to create 
     * @param name -the name assigned to the cc.node see cc.node.name
     */
    constructor(type: CharacterAssetTypes, name: string) {
        this._type = type;
        this._name = name;
    }
    getType(): CharacterAssetTypes {
        return this._type;
    }

    getName(): string {
        return this._name;
    }
}

/**
 * @class CharacterAssetFactory
 * @param CharacterAssetCreationOptions
 * Uses the returned type from character creation options to create the appropriate cc.Node derived asset
 * 
 */
export class CharacterAssetFactory implements IFactory<CharacterAssetCreationOptions, IAssetContainer<cc.Node>> {

    create(options: CharacterAssetCreationOptions):IAssetContainer <cc.Node> {

        switch (options.getType()) {
            case CharacterAssetTypes.NPC:
                return new MockAsset<CharacterAssetTypes>(new cc.Node(),options, 50, MockAssetColours.PINK, "NPC");

            case CharacterAssetTypes.NPC_MOCK:
                return new MockAsset<CharacterAssetTypes>(new cc.Node(),options, 50, MockAssetColours.PINK, "NPC MOCK");

            case CharacterAssetTypes.PLAYER:
                return new MockAsset<CharacterAssetTypes>(new cc.Node(),options, 50, MockAssetColours.GREEN, "PLAYER");

            case CharacterAssetTypes.PLAYER_MOCK:
                return new MockAsset<CharacterAssetTypes>(new cc.Node(),options, 50, MockAssetColours.GREEN, "PLAYER MOCK");

        }

    }
}
