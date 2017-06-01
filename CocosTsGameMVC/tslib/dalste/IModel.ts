export interface ModelCallBack{(oldVal: any, newVal:any): void};

export interface IModel {
  set(path:string, value:any):void;
  get(path:string):any;
  bind(path:string, func:ModelCallBack, scope:any):void;
  getAllDataAsJsonString():string;
  getSubDataAsJsonString(path:string):string;
}

export default IModel;