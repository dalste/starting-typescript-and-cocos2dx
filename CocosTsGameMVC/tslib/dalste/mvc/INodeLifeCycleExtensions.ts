
/**
 * @class INodeLifeCycleExtensions -  provides subscribable signal wrappers around scene events
 * onEnter
 * onEnterTransitionDidFinish
 * onExit
 * onExitTransitionDidStart
 */
export interface INodeLifeCycleExtensions extends cc.Node{

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