
import {INodeLifeCycleExtensions} from "./INodeLifeCycleExtensions";
/**
 * @class NodeExtended -  provides subscribable signal wrappers around node events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */
export class NodeExtended extends cc.Node implements INodeLifeCycleExtensions{

    /**
     * Event callback that is invoked every time when CCNode enters the 'stage'.
     */
    public onEnterSignal: signals.Signal;
    /**
     *  Event callback that is invoked every time when CCNode enters the 'stage'.
     */
    public onEnterTransitionDidFinishSignal: signals.Signal;
    /**
     *  Event callback that is called every time the cc.Node leaves the 'stage'.
     */
    public onExitSignal: signals.Signal;

    /**
     * callback that is called every time the cc.Node leaves the 'stage'.
     */
    public onExitTransitionDidStartSignal: signals.Signal;

    constructor() {
        super();
        super.ctor();//always call this for compatibility with cocos2dx JS Javascript class system
 
        this.onEnterSignal = new signals.Signal();
        this.onEnterTransitionDidFinishSignal = new signals.Signal();

        this.onExitSignal = new signals.Signal();
        this.onExitTransitionDidStartSignal = new signals.Signal();
    }
    onEnter(): void {
        super.onEnter();
        this.onEnterSignal.dispatch();
    }


    onEnterTransitionDidFinish(): void {
         super.onEnterTransitionDidFinish();
        this.onEnterTransitionDidFinishSignal.dispatch();
    }



    onExit(): void {
        this.onExitSignal.dispatch();
        super.onExit();
    }


    onExitTransitionDidStart(): void {
        super.onExitTransitionDidStart();
        this.onExitTransitionDidStartSignal.dispatch();
    }
}