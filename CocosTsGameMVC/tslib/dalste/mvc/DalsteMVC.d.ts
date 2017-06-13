
declare namespace dalste.mvc {



/**
 * @class INodeLifecycleExtensions -  provides subscribable signal wrappers around scene events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */
export interface INodeLifecycleExtensions extends cc.Node {

    /**
     * @description Event callback - invoked every time the CCNode enters the 'stage'.
     */
    onEnterSignal: signals.Signal;
    /**
     * @description Event callback - invoked every time the enter transition finishes when the CCNode enters the 'stage'.
     */
    onEnterTransitionDidFinishSignal: signals.Signal;
    /**
     * @description Event callback - invoked every time the cc.Node leaves the 'stage'.
     */
    onExitSignal: signals.Signal;

    /**
     * @description callback invoked every time the exit transition starts when the  cc.Node leaving the 'stage'.
     */
    onExitTransitionDidStartSignal: signals.Signal;

    /**
     * @description handles the cc.Node onEnter event
     * @see cc.Node::onEnter
     */
    onEnter(): void;

    /**
     * @description handles the cc.Node onEnterTransitionDidFinish event
     * @see cc.Node::onEnterTransitionDidFinish
     */
    onEnterTransitionDidFinish(): void;

    /**
       * @description handles the cc.Node onExit event
       * @see cc.Node::onExit
       */
    onExit(): void;

    /**
     * @description handles the cc.Node onExitTransitionDidStart event
     * @see cc.Node::onExitTransitionDidStart
     */
    onExitTransitionDidStart(): void;
}

/**
 * @class NodeExtended -  provides subscribable signal wrappers around node lifecycle events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */
 export class NodeExtended extends cc.Node implements INodeLifecycleExtensions {

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

   
    onEnter(): void;


    onEnterTransitionDidFinish(): void;



    onExit(): void;

    onExitTransitionDidStart(): void;
}



/**
 * @class SceneExtensions -  provides subscribable signal wrappers around scene lifecycle events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */

export  class SceneExtended extends cc.Scene implements INodeLifecycleExtensions {

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

    
    onEnter(): void;


    onEnterTransitionDidFinish(): void;


    onExit(): void; 


    onExitTransitionDidStart(): void;
}
}
