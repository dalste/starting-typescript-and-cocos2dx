
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
     */
    protected _viewEventBus: signals.Signal;

    //the main asset for this view to contain the views controls
    protected _asset: cc.Node;

    /**
     * @description setup. this function is called after the class is instantiaved via the IOC container
     */
    setup() {
        this._viewEventBus = new signals.Signal();
        this.onInitView();
        this._viewController.viewReady(this, this._viewModel);
    }

    /**
     * @description returns the signals.Signal that represents this views eventBus, you may use this Signal to subscribe to view events
     */
    getEventBus(): signals.Signal {
        return this._viewEventBus;
    }

    /**
     * @description Virtual function that is called after the view is instantiated, it is here that you should create the views assets 
     */
    onInitView(): void {
        throw (new Error("View:onInitView is an abstract function. It must be overridden"));
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