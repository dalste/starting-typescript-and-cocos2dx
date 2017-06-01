import IView  from "./IView";
import IModel from "./IModel";
export interface IViewController {
    viewReady(view:IView, model:IModel): void;
    onViewReady():void;
}

export default IViewController;