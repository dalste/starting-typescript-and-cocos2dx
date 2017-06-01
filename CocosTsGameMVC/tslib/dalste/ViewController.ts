import { IViewController } from "./IViewController";
import { IView } from "./IView";
import {IModel} from "./IModel";


/**
 * @description Virtual class - must be subclassed, the onViewReady function must be overriden
 */
export default class ViewController implements IViewController {
    /**
     * the view associated with this controller, is assigned in viewReady(view:IView) function
      */
    private _view: IView = undefined;
    private _model: IModel = undefined;


    //inject 
    public system:dijon.System = undefined;

    /**
     * function called by the IOC container when this class is instantiated
     */
    private setup() {
        
    }

    /**
     * @description only override if you need to, this function assigns the associated view to _view class variable and calls onViewReady() 
     * @param view:IView
     */
    viewReady(view:IView, model:IModel): void{
        this._view =view;
        this._model = model;
        this.onViewReady();
    }

    protected getView(): IView{
        return this._view;
    }
 /**
     * @description Virtual function that is called after the view is assigned to teh controllers _view,
     *  it is here that you should initialise listeners and do futher view setup 
     */
    onViewReady(){
        throw(new Error("ViewController:onViewReady is an abstract function. It must be overridden"));
    }
   
}