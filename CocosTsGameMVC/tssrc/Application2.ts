import {IApplication}  from "./IApplication";
import  GameController  from "./controller/GameController";
export default class Application2 implements IApplication { 


    /**
     * our ioc container
     */
    _system:dijon.System;


    _config: {
        isdebug:boolean
    }
    
    startUp() {

        this._system.mapSingleton("GameController", GameController);

        var gc = this._system.getObject("GameController");
        console.log(gc);  
        console.log("Hello Application2");  
    }
}

