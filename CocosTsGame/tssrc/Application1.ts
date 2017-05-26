import {IApplication}  from "./IApplication";
import  HelloWorldScene from "./view/scenes/HelloWorldScene";
export default class Application1 implements IApplication { 

    _config: {
        isdebug:boolean
    }


    constructor(){



   

    }
    startUp() {
        console.log("Hello Application1");
        cc.director.runScene(new HelloWorldScene());
    }
}

