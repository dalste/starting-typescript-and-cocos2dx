import {IApplication}  from "./IApplication";
export default class Application1 implements IApplication { 

    _config: {
        isdebug:boolean
    }
    constructor(){

    }
    startUp() {
        console.log("Hello Application1");
    }
}

