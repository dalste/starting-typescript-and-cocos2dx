declare var ccui: any;
import { IAssetContainer } from "./../IAssetContainer";
import { ICreationOptions } from "./../ICreationOptions";
/**
 * @description emum providing identifiable colour options for MockAsset
 */
export enum MockAssetColours {
    RED,
    BLUE,
    YELLOW,
    GREEN,
    PINK,
    NONE


};

/**
 * @class MockAsset
 * @description a cc.Node derived class for creating mock assets ,creates a circle with given radius, containing a label with optional  text
 * Template option T is for the Type used to describe type generally string | int | enumtype
 */
export class MockAsset<T> implements IAssetContainer<cc.Node> {
    _asset: cc.Node = null;
    _objecttype: T = null;
    _circleNode: cc.DrawNode;


    constructor(asset: cc.Node, config: ICreationOptions<T>, radius: number = 20, COLOUR: MockAssetColours = MockAssetColours.BLUE, text: string = "Text") {

        this._asset = asset;
        this._objecttype = config.getType();
        this._asset.setName(config.getName());

        this._asset.setContentSize(radius * 2, radius * 2);
        this._asset.setAnchorPoint(0.5, 0.5);
        this._circleNode = new cc.DrawNode();
        this._circleNode.drawDot(cc.p(radius, radius), radius, this.getMyColour(COLOUR));
        this._asset.addChild(this._circleNode, 0);


        var textF = new ccui.Text();
        textF.boundingWidth = radius * 2;
        textF.boundingHeight = 30;
        textF.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: text,
            font: "20px Ariel",
            x: radius
        });
        textF.y = radius - textF.height / 8;
        this._asset.addChild(textF, 0);

    }

    getAsset(): cc.Node {
        return this._asset;
    }
    
    clearAsset(): void {
        this._asset = null;
    }
    getMyColour(colour: MockAssetColours): cc.Color {

        switch (colour) {
            case MockAssetColours.RED:
                return new cc.Color(187, 56, 10, 255);
            case MockAssetColours.GREEN:
                return new cc.Color(12, 123, 2, 255);
            case MockAssetColours.BLUE:
                return new cc.Color(27, 68, 174, 255);
            case MockAssetColours.PINK:
                return new cc.Color(211, 62, 109, 255);
            case MockAssetColours.YELLOW:
                return new cc.Color(242, 171, 52, 255);
            case MockAssetColours.NONE:
                return new cc.Color(255, 255, 255, 255);
        }

    }

}