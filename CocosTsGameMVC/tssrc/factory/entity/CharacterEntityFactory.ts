import { IFactory } from "./../IFactory";
import { PlayerInput } from "./../../component/GameComponents";
import { CharacterAssetTypes } from "./../../types/AssetTypes";
import { CharacterAssetCreationOptions } from "./../view/CharacterAssetFactory";
import { Entity } from "./../../../tslib/moon/src/Entity";

import { CharacterEntityTypes } from "./../../types/EntityTypes";
import { ICreationOptions } from "./../ICreationOptions";

import { CocosRenderNode, Player, NPC } from "./../../component/GameComponents";
import { Display } from "./../../../tslib/dalste/util/Display";

/**
 * @class CharacterEntityCreationOptions
 * @description provides creation options to CharacterAssetFactory
 */
export class CharacterEntityCreationOptions implements ICreationOptions<CharacterEntityTypes>{
    private _type: CharacterEntityTypes;
    private _name: string;



    /**
     * 
     * @param type - the type of object to create 
     * @param name -the name assigned to the cc.node see cc.node.name
     */
    constructor(type: CharacterEntityTypes, name: string) {
        this._type = type;
        this._name = name;
    }
    getType(): CharacterEntityTypes {
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
export class CharacterEntityFactory implements IFactory<CharacterEntityCreationOptions, Entity> {
    //inject
    private _characterAssetFactory: IFactory<CharacterAssetCreationOptions, cc.Node> = null;

    //inject 
    private _display:Display = undefined;

    create(options: CharacterEntityCreationOptions): Entity {
        var e = new Entity();
        switch (options.getType()) {
            case CharacterEntityTypes.NPC:
                var caco = new CharacterAssetCreationOptions(CharacterAssetTypes.NPC, "NPC");
                var asset = this._characterAssetFactory.create(caco);
                asset.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y+100);

                var cc = new CocosRenderNode();
                cc.node = asset;
                e.addComponent(cc);

                var npc = new NPC();
                e.addComponent(npc);

                break;


            case CharacterEntityTypes.PLAYER:
                var caco = new CharacterAssetCreationOptions(CharacterAssetTypes.PLAYER, "PLAYER");
                var asset = this._characterAssetFactory.create(caco);
                asset.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y);

                var cc = new CocosRenderNode();
                cc.node = asset;
                e.addComponent(cc);

                var pc = new Player();
                e.addComponent(pc);

                
                var pi = new PlayerInput(); //register for input events
                e.addComponent(pi);
                break;
        }
        return e;

    }
}
