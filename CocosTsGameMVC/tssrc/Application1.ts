import {IApplication}  from "./IApplication";
import  {HelloWorldScene} from "./view/scenes/HelloWorldScene";
export class Application1 implements IApplication { 

    _config: {
        isdebug:boolean
    }


    constructor(){

    }
    startUp() {
        cc.log("Hello Application1");
        cc.director.runScene(new HelloWorldScene());
    }
}

