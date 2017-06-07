import { IView } from "./IView";
import { IModel } from "./IModel";
export interface IViewController {

    /**
     * @description only override if you need to, this function assigns the associated view to _view class variable and calls onViewReady() 
     * @param view:IView
     */
    viewReady(view: IView, model: IModel): void;
    /**
     * @description  function that is called after the view is assigned to the controllers _view,
     *  it is here that you should initialise listeners and do further view setup 
     */
    onViewReady(): void;
}

export default IViewController;