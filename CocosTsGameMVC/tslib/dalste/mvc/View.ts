
import { INodeLifecycleExtensions } from "./INodeLifecycleExtensions";
import { ModelCallBack, IModel } from "./IModel";
import { IView } from "./IView";
import { IViewController } from "./IViewController";

/**
 * @description Virtual class - must be subclassed, the show  function must be overriden
 */
export class View implements IView {

    /**
     * @description the _viewController will be injected by the IOC container when this view is instantiated
     */
    //inject
    protected _viewController: IViewController = undefined;

    //inject      
    protected _viewModel: IModel = undefined;

    /**
     * @description a view will use this signal as an event bus to communicate with its view controller
     *  typically used for custom UI events
     */
    protected _uiEventBus: signals.Signal;

    /**
     * @description dispatched when the views asset onEnter event is fired 
     * @see cc.Node:onEnter
     */
    protected _enterSignal: signals.Signal;
    /**
      * @description dispatched when the views asset onExit event is fired 
      * @see cc.Node:onExit
      */
    protected _exitSignal: signals.Signal;

    /**
     * @description dispatched when the views asset onEnter event is fired 
     * @see cc.Node:onEnter
     */
    protected _enterTransitionDidFinishSignal: signals.Signal;
    /**
      * @description dispatched when the views asset onExit event is fired 
      * @see cc.Node:onExit
      */
    protected _exitTransitionDidStartSignal: signals.Signal;

    //the identifier for the  main asset for this view to contain the views controls
    protected _asset: cc.Node;

    /**
     * @description setup. this function is called after the class is instantiaved via the IOC container
     */
    setup() {
        this._uiEventBus = new signals.Signal();
        this._enterSignal = new signals.Signal();
        this._exitSignal = new signals.Signal();
        this._enterTransitionDidFinishSignal = new signals.Signal();
        this._exitTransitionDidStartSignal = new signals.Signal();

        this._viewController.viewReady(this, this._viewModel);
    }

       /**
     * @description returns the View Model for this view
     * @returns IModel
     */
    getViewModel(): IModel{
        return this._viewModel;
    }

    /**
   * @description sets the view model for this view
   * @param IModel
   */
    setViewModel(val: IModel): void{
        this._viewModel = val;
    }

    /**
     * @description adds lifecycle listeners to this views (INodeLifeCycleExtensions) asset
     * 
     */
    initLifecycleListeners(): void {
        var ass = this.getAsset() as INodeLifecycleExtensions;
        ass.onEnterSignal.add(this.onEnter, this);
        ass.onEnterTransitionDidFinishSignal.add(this.onEnterTransitionDidFinish, this);
        ass.onExitSignal.add(this.onExit, this);
        ass.onExitTransitionDidStartSignal.add(this.onExitTransitionDidStart, this);

    }
    /**
     * @description removes lifecycle listeners to this views (INodeLifeCycleExtensions) asset
     * 
     */
    removeLifeCycleListeners(): void {
        var ass = this.getAsset() as INodeLifecycleExtensions;
        ass.onEnterSignal.removeAll();
        ass.onEnterTransitionDidFinishSignal.removeAll();
        ass.onExitSignal.removeAll();
        ass.onExitTransitionDidStartSignal.removeAll();
    }


    private onEnter(): void {
        this.onEnterHandler();
        this._enterSignal.dispatch();
    }

    private onExit(): void {
        this.onExitHandler();
        this._exitSignal.dispatch();
    }

    private onEnterTransitionDidFinish(): void {
        this.onEnterTransitionDidFinishHandler();
    }

    private onExitTransitionDidStart(): void {
        this.onExitTransitionDidStartHandler();
    }

    /**
     * @description optionally override  to handle the views main asset's (cc.Node) onEnter life cycle event
     */
    protected onEnterHandler(): void {

    }
    /**
     * @description optionally override  to handle the views main asset's (cc.Node) onEnterTransitionDidFinish life cycle event
     */
    protected onEnterTransitionDidFinishHandler(): void {

    }
    /**
     * @description optionally override  to handle the views main asset's (cc.Node) onExit life cycle event
     */
    protected onExitHandler(): void {


    }
    /**
     * @description optionally override  to handle the views main asset's (cc.Node) onExitTransitionDidStart life cycle event
     */
    protected onExitTransitionDidStartHandler(): void {

    }

    /**
     * @description returns the signals.Signal that represents this vie UI  eventBus, you may use this Signal to subscribe to view events
     * 
     */
    getUIEventBus(): signals.Signal {
        return this._uiEventBus;
    }

    /**
     * @description returns the signals.Signal that represents this view onExitevent
     * @see cc.Node:onExit
     */
    getExitSignal(): signals.Signal {
        return this._exitSignal;
    }

    /**
* @description returns the signals.Signal that represents this view onEnter event
* @see cc.Node:onEnter
*/
    getEnterSignal(): signals.Signal {
        return this._enterSignal;
    }

    /**
         * @description returns the signals.Signal that represents this views main asset's onExitTransitionDidStart event
         * @see cc.Node:onExit
         */
    getExitTransitionDidStartSignal(): signals.Signal {
        return this._exitTransitionDidStartSignal;
    }

    /**
     * @description returns the signals.Signal that represents this views main asset's  onEnterTransitionDidFinish event
     * @see cc.Node:onEnter
     */
    getEnterTransitionDidFinishSignal(): signals.Signal {
        return this._enterTransitionDidFinishSignal;
    }

    /**
     * @description returns the main asset for this view
     * @returns cc.Node 
     */
    getAsset(): cc.Node {
        return this._asset;
    }
    /**
    * @description sets the main asset for this view
    * @param cc.Node 
    */
    setAsset(node: cc.Node): void {
        this._asset = node;
    }

    /**
     * @description adds a node as a child to this views _asset
    * @param {cc.Node} child  A child node
    * @param {number} [localZOrder]  Z order for drawing priority. Please refer to setZOrder(int)
    * @param {number|string} [tag]  An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     */

    addChild(child: cc.Node, localZOrder?: number, tag?: string | number): void {
        this._asset.addChild(child, localZOrder, tag);
    }

    /**
     * @description displays the view on screen (pure virtual/abstract function) - must be overriden
     *
     * @param cc.Node  - optional parent node
     */
    show(parent?: cc.Node): void {
        throw (new Error("View:show is an abstract function. It must be overridden"));
    }
}