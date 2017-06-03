
import { INodeLifeCycleExtensions } from "./INodeLifeCycleExtensions";
import { ModelCallBack, IModel } from "./IModel";
import { IView } from "./IView";
import { IViewController } from "./IViewController";

/**
 * @description Virtual class - must be subclassed, the onInitView function must be overriden
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
    protected _viewEventBus: signals.Signal;

    /**
     * @description dispatched when the views asset onEnter event is fired 
     * @see cc.Node:onEnter
     */
    protected _enterSignal:signals.Signal;
   /**
     * @description dispatched when the views asset onExit event is fired 
     * @see cc.Node:onExit
     */
    protected _exitSignal:signals.Signal;

    /**
     * @description dispatched when the views asset onEnter event is fired 
     * @see cc.Node:onEnter
     */
    protected _enterTransitionDidFinishSignal:signals.Signal;
   /**
     * @description dispatched when the views asset onExit event is fired 
     * @see cc.Node:onExit
     */
    protected _exitTransitionDidStartSignal:signals.Signal;

    //the identifier for the  main asset for this view to contain the views controls
    protected _asset: cc.Node;

    /**
     * @description setup. this function is called after the class is instantiaved via the IOC container
     */
    setup() {
        this._viewEventBus = new signals.Signal();
        this._enterSignal = new signals.Signal();
        this._exitSignal = new signals.Signal();
        this._enterTransitionDidFinishSignal = new signals.Signal();
        this._exitTransitionDidStartSignal = new signals.Signal();
       
        this._viewController.viewReady(this, this._viewModel);
    }


    initLifecycleListeners(): void {
        var ass = this.getAsset() as INodeLifeCycleExtensions;
        ass.onEnterSignal.add(this.onEnter, this);
        ass.onEnterTransitionDidFinishSignal.add(this.onEnterTransitionDidFinish, this);
        ass.onExitSignal.add(this.onExit, this);
        ass.onExitTransitionDidStartSignal.add(this.onExitTransitionDidStart, this);

    }

    removeLifeCycleListeners(): void {
        var ass = this.getAsset() as INodeLifeCycleExtensions;
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
    
    protected onEnterHandler(): void {

    }

    protected onEnterTransitionDidFinishHandler(): void {

    }

    protected onExitHandler(): void {


    }

    protected onExitTransitionDidStartHandler(): void {

    }

    /**
     * @description returns the signals.Signal that represents this views eventBus, you may use this Signal to subscribe to view events
     * 
     */
    getEventBus(): signals.Signal {
        return this._viewEventBus;
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
     * @description displays the view on screen
     *
     * @param cc.Node  - optional parent node
     */
    show(parent?: cc.Node): void {
        throw (new Error("View:show is an abstract function. It must be overridden"));
    }
}