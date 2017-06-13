
import { CharacterAssetTypes } from "./../../../types/AssetTypes";
import { CharacterAssetFactory, CharacterAssetCreationOptions } from "../../../factory/view/CharacterAssetFactory";
declare var res: any;
export class HelloWorldMainLayer extends cc.Layer {
    sprite: cc.Sprite;
    signal: signals.Signal;
    assetFactory: CharacterAssetFactory;
    constructor() {
        //////////////////////////////
        // 1. super init first
        super();
        super.ctor(); // call the cocos super method in JS  this would be this._super()

        cc.log("Hello World Layer");
        this.assetFactory = new CharacterAssetFactory();
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        var co = new CharacterAssetCreationOptions(CharacterAssetTypes.PLAYER, "player");
        var ca = this.assetFactory.create(co).getAsset();
        ca.setPosition(10, 20);
        this.addChild(ca, 0);



    }
}
