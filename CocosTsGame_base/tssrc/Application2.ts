import {IApplication}  from "./IApplication";
export default class Application2 implements IApplication { 

    _config: {
        isdebug:boolean
    }
    
    startUp() {
        console.log("Hello Application2");  
    }
}

