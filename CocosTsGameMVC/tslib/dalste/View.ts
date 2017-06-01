
import { ModelCallBack,IModel } from "./IModel";
import { IView } from "./IView";
import { IViewController } from "./IViewController";

/**
 * @description Virtual class - must be subclassed, the onInitView function must be overriden
 */
export default class View implements IView {

    /**
     * @description the _viewController will be injected by the IOC container when this view is instantiated
     */
    //inject
    private _viewController: IViewController = undefined;

    //inject      
    private _viewModel: IModel = undefined;

    /**
     * @description a view will use this signal as an event bus to communicate with its view controller
     */
    private _viewEventBus:signals.Signal;

    //the main asset for this view to contain the views controls
    private _asset:cc.Node;

    /**
     * @description setup. this function is called after the class is instantiaved via the IOC container
     */
    setup() {
        this._viewEventBus =new signals.Signal(); 
        this.onInitView(); 
        this._viewController.viewReady(this, this._viewModel);
    }

    /**
     * @description returns the signals.Signal that represents this views eventBus, you may use this Signal to subscribe to view events
     */
    getEventBus():signals.Signal
    {
        return this._viewEventBus;
    }

    /**
     * @description Virtual function that is called after the view is instantiated, it is here that you should create the views assets 
     */
    onInitView():void{
        throw(new Error("View:onInitView is an abstract function. It must be overridden"));
    }

    /**
     * @description returns the main asset for this view
     * @returns cc.Node 
     */
    getAsset():cc.Node{
            return this._asset;
    }
     /**
     * @description sets the main asset for this view
     * @param cc.Node 
     */
    setAsset(node:cc.Node):void{
            this._asset = node;
    }
    /**
     * @description displays the view on screen
     *
     * @param cc.Node  - optional parent node
     */
    show(parent?:cc.Node):void{
         throw(new Error("View:show is an abstract function. It must be overridden"));
    }
}