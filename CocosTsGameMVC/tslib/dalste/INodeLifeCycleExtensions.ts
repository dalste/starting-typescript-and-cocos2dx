
/**
 * @class INodeLifeCycleExtensions -  provides subscribable signal wrappers around scene events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */
export interface INodeLifeCycleExtensions extends cc.Node{

    /**
     * Event callback that is invoked every time when CCNode enters the 'stage'.
     */
     onEnterSignal: signals.Signal;
    /**
     *  Event callback that is invoked every time when CCNode enters the 'stage'.
     */
     onEnterTransitionDidFinishSignal: signals.Signal;
    /**
     *  Event callback that is called every time the cc.Node leaves the 'stage'.
     */
     onExitSignal: signals.Signal;

    /**
     * callback that is called every time the cc.Node leaves the 'stage'.
     */
     onExitTransitionDidStartSignal: signals.Signal;

    
    onEnter(): void;


    onEnterTransitionDidFinish(): void;


    onExit(): void;


    onExitTransitionDidStart(): void;
}