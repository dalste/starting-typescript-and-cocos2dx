export interface ModelCallBack{(oldVal: any, newVal:any): void};

export interface IModel {
  /**
   * @description sets the given value  at the path ("my.path.to.data") 
   * @param path 
   * @param value 
   */
  set(path:string, value:any):void;
  /**
   * @description returns the value residing  at the path ("my.path.to.data") 
   * @param path 
   * @param value 
   */
  get(path:string):any;
  /**
   * @description adds a binding to execute func at given scope whenever  the value residing  at the path ("my.path.to.data")  is set via set function
   * @param path 
   * @param func 
   * @param scope
   */
  bind(path:string, func:ModelCallBack, scope:any):void;
  /**
   * @description returns the entire model data as a JSON string
   * @return string the data as a json string
   */
  getAllDataAsJsonString():string;
  /**
   * @description returns the sub data at the path described example "path.to.my.value" as a JSON string
   * @return string the data as a json string
   */
  getSubDataAsJsonString(path:string):string;
}

export default IModel;