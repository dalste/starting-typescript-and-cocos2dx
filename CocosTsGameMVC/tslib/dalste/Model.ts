
import { ModelCallBack,IModel } from "./IModel";


/**
 * @description base class for game and view models 
 * it is recommended that this model be overridden and typesafe accessors created for each aspect of the 
 * model data that we are interested in, clients of the model need not know about the exact 
 * schema of the underlying data
 * 
 * This class ensentially wraps a single data object providing convenience functions to
 * deep set and get values , and deep bind to values
 * 
 * @example
 * var m = new Model();
 * m.set("levelData.levelId",0);
 * var levelId = m.get("levelData.levelId");
 * cc.log(levelId); //prints 0
 * cc.log(m.getAllDataAsJsonString()); prints: {"levelData":{"levelId":0}}
 *
 * m.bind("levelData.levelId", this.onLevelIdUpdated,this);
 * //onLevelIdUpdated function called whenever  m.set("levelData.levelId",n); is called
 * 
 */
export class Model implements IModel{
        protected _modelBindings = {};

        protected _data = {};

        /**
         * @description constructor will initialise the model data with data provided by config.data if provided
         * @param config 
         */
        constructor(config:any =null) {
            if (config != null && config.data != null) {

                this.assign(this._data, config.data);

            }
        }

        /**
         * @description returns the entire model data as a JSON string
         * @return string the data as a json string
         */
        public getAllDataAsJsonString():string{
            return JSON.stringify(this._data);
        }
         /**
         * @description returns the sub data at the path described. Example: "path.to.my.value" as a JSON string
         * @return string the data as a json string
         */
        public getSubDataAsJsonString(path:string):string{
            var data = this.get(path);
            return JSON.stringify(data);
        }


        /**
         * @description copies all properties from var args into target
         * @param target 
         * @param varArgs 
         */
        private assign(target:object, ...varArgs:any[]):any { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < varArgs.length; index++) {
                var nextSource = varArgs[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        }

        /**
         *@description given an origin object and a path ("my.path.to.data") returns an object  containing 
         * the parent object "objectToSet" and string "member" containing the name of the property holding the value  to set referenced by "path"
         * if the path does not exist it is created with object/any objects
         * @param origin the origin object in which the path should traverse
         * @param path the path
         * @returns {}  an object with vals  {objectToSet:object, member:string}, returns these can be used to set a value(member)
         *              on the object(objectToSet) via objectToSet[member] = value
         *
         */
        private getValueToSet(origin:any, path:string):any {

            var pathSplit = path.split(".");
            var res: any = {};
            var objectToSet = origin;
            for (var i = 0; i < pathSplit.length - 1; i++) {

                if (objectToSet[pathSplit[i]] == null) {
                    objectToSet[pathSplit[i]] = {};

                }
                objectToSet = objectToSet[pathSplit[i]];

            }
            res.objectToSet = objectToSet;
            res.member = pathSplit[pathSplit.length - 1];
            return res;
        }

        /**
         *@description given an origin object and a path ("my.path.to.data") returns an object  containing 
         * the parent object "objectToGet" and string "member" containing the name of the property holding the value to get, referenced by "path"
         * @param origin the origin object in which the path should traverse
         * @param path the path
         * @returns {}  an object with vals  {objectToGet:object, member:string}, returns these can be used to set a value(member)
         *              on the object(objectToSet) via objectToSet[member] = value
         *
         */
        private getValueToGet(origin:any, path:string):any {

            var res: any = {};
            var pathSplit = path.split(".");
            var objectToGet = origin;
            for (var i = 0; i < pathSplit.length - 1; i++) {
                objectToGet = objectToGet[pathSplit[i]];
                if (objectToGet == null)
                    return null;
            }
            res.objectToGet = objectToGet;
            res.member = pathSplit[pathSplit.length - 1];
            return res;
        }

        /**
         * @description sets the provided value at the path ("my.path.to.data") 
         * @param path 
         * @param value 
         */
        public set(path:string, value:any):void {

            var objectToSetData = this.getValueToSet(this._data, path);
            var oldVal = objectToSetData.objectToSet[objectToSetData.member];
            objectToSetData.objectToSet[objectToSetData.member] = value;

            var signalToGetData = this.getValueToGet(this._modelBindings, path);

            if (signalToGetData != null) {
                var signal = signalToGetData.objectToGet[signalToGetData.member];
                if (signal != null)
                    signal.dispatch(oldVal, value);
            }

        }

        /**
         * @description returns the value residing  at the path ("my.path.to.data") 
         * @param path 
         * @param value 
         */
        public get(path:string):any {
            var objectToGetData = this.getValueToGet(this._data, path);

            return objectToGetData.objectToGet[objectToGetData.member];
        }

         /**
         * @description adds a binding to execute a callback whenever  the value residing  at the path ("my.path.to.data")  is set via set function
         * @param path 
         * @param func 
         * @param scope
         */
        public bind(path:string, func:ModelCallBack, scope:any):void {

            var objectToSetData = this.getValueToSet(this._modelBindings, path);


            if (objectToSetData.objectToSet[objectToSetData.member] == null) {
                objectToSetData.objectToSet[objectToSetData.member] = new signals.Signal();

            }

            objectToSetData.objectToSet[objectToSetData.member].add(func, scope);
        }
            /**
         * @description removes a binding to the data at given path ("my.path.to.data") 
         * @param path 
         * @param func 
         * @param scope
         */
        public unbind(path:string, func:ModelCallBack, scope:any):void {

            var signalToGetData = this.getValueToGet(this._modelBindings, path);

            var signal = signalToGetData.objectToGet[signalToGetData.member];
            if (signal)
                signal.remove(func, scope);

            if (signal.getNumListeners() <= 0) {
                signal.dispose();
                signalToGetData.objectToGet[signalToGetData.member] = null;
            }


        }

        /**
         * @description determines if given binding already exists
         * @param path 
         * @param func 
         * @param scope 
         * @returns boolean true if binding exists or false
         */
        public hasBinding(path:string, func:ModelCallBack, scope:any):boolean {

            var signalToGetData = this.getValueToGet(this._modelBindings, path);

            var signal = signalToGetData.objectToGet[signalToGetData.member];

            if (signal == null)
                return false;
            else
                return signal.has(func, scope);

        }


    }