declare namespace dijon {

   type Callback = (...args: any[]) => void
   export class System  {
        constructor();



         /**
         * When <code>true</code> injections are made only if an object has a property with the mapped outlet name.<br/>
         * <strong>Set to <code>false</code> at own risk</strong>, may have quite undesired side effects.
         * @example
         * system.strictInjections = true
         * var o = {};
         * system.mapSingleton( 'userModel', UserModel );
         * system.mapOutlet( 'userModel' );
         * system.injectInto( o );
         *
         * //o is unchanged
         *
         * system.strictInjections = false;
         * system.injectInto( o );
         *
         * //o now has a member 'userModel' which holds a reference to the singleton instance
         * //of UserModel
         * @type Boolean
         * @default true
         */
        strictInjections:boolean ;

        /**
         * Enables the automatic mapping of outlets for mapped values, singletons and classes
         * When this is true any value, singleton or class that is mapped will automatically be mapped as a global outlet
         * using the value of <code>key</code> as outlet name
         *
         * @example
         * var o = {
         *     userModel : undefined; //inject
         * }
         * system.mapSingleton( 'userModel', UserModel );
         * system.injectInto( o ):
         * //o.userModel now holds a reference to the singleton instance of UserModel
         * @type Boolean
         * @default false
         */
        autoMapOutlets:boolean;

        /**
         * The name of the method that will be called for all instances, right after injection has occured.
         * @type String
         * @default 'setup'
         */
        postInjectionHook:string;



  
        /**
         * defines <code>outletName</code> as an injection point in <code>targetKey</code>for the object mapped to <code>sourceKey</code>
         * @example
         system.mapSingleton( 'userModel', TestClassA );
         var o = {
         user : undefined //inject
         }
         system.mapOutlet( 'userModel', 'o', 'user' );
         system.mapValue( 'o', o );

         var obj = system.getObject( 'o' );
         * //obj.user holds a reference to the singleton instance of UserModel
         *
         * @example
         system.mapSingleton( 'userModel', TestClassA );
         var o = {
         userModel : undefined //inject
         }
         system.mapOutlet( 'userModel', 'o' );
         system.mapValue( 'o', o );

         var obj = system.getObject( 'o' );
         * //obj.userModel holds a reference to the singleton instance of UserModel
         *
         * @example
         system.mapSingleton( 'userModel', TestClassA );
         system.mapOutlet( 'userModel' );
         var o = {
         userModel : undefined //inject
         }
         system.mapValue( 'o', o );

         var obj = system.getObject( 'o' );
         * //o.userModel holds a reference to the singleton instance of userModel
         *
         * @param {String} sourceKey the key mapped to the object that will be injected
         * @param {String} [targetKey='global'] the key the outlet is assigned to.
         * @param {String} [outletName=sourceKey] the name of the property used as an outlet.<br/>
         * @return {dijon.System}
         * @see dijon.System#unmapOutlet
         */
        mapOutlet ( sourceKey:string,
                              targetKey:string,
                              outletName:string ):dijon.System;
        /**
         * Retrieve (or create) the object mapped to <code>key</code>
         * @example
         * system.mapValue( 'foo', 'bar' );
         * var b = system.getObject( 'foo' ); //now contains 'bar'
         * @param {Object} key
         * @return {Object}
         */
        getObject ( key:any ):any;

        /**
         * Maps <code>useValue</code> to <code>key</code>
         * @example
         * system.mapValue( 'foo', 'bar' );
         * var b = system.getObject( 'foo' ); //now contains 'bar'
         * @param {String} key
         * @param {Object} useValue
         * @return {dijon.System}
         */
        mapValue ( key:string,
                             useValue:any ): dijon.System;
        /**
         * Returns whether the key is mapped to an object
         * @example
         * system.mapValue( 'foo', 'bar' );
         * var isMapped = system.hasMapping( 'foo' );
         * @param {String} key
         * @return {Boolean}
         */
        hasMapping ( key:string ):boolean;

        /**
         * Maps <code>clazz</code> as a factory to <code>key</code>
         * @example
         * var SomeClass = function(){
         * }
         * system.mapClass( 'o', SomeClass );
         *
         * var s1 = system.getObject( 'o' );
         * var s2 = system.getObject( 'o' );
         *
         * //s1 and s2 reference two different instances of SomeClass
         *
         * @param {String} key
         * @param {Function} clazz
         * @return {dijon.System}
         */
        mapClass <T>( key:string,
                             clazz : new () => T):dijon.System;

        /**
         * Maps <code>clazz</code> as a singleton factory to <code>key</code>
         * @example
         * var SomeClass = function(){
         * }
         * system.mapSingleton( 'o', SomeClass );
         *
         * var s1 = system.getObject( 'o' );
         * var s2 = system.getObject( 'o' );
         *
         * //s1 and s2 reference the same instance of SomeClass
         *
         * @param {String} key
         * @param {Function} clazz
         * @return {dijon.System}
         */
        mapSingleton<T>( key:String ,
                                 clazz: new () => T ):dijon.System;
           

        /**
         * Force instantiation of the class mapped to <code>key</code>, whether it was mapped as a singleton or not.
         * When a value was mapped, the value will be returned.
         * TODO: should this last rule be changed?
         * @example
         var SomeClass = function(){
         }
         system.mapClass( 'o', SomeClass );

         var s1 = system.getObject( 'o' );
         var s2 = system.getObject( 'o' );
         * //s1 and s2 reference different instances of SomeClass
         *
         * @param {String} key
         * @return {Object}
         */
        instantiate ( key:string ):any;

        /**
         * Perform an injection into an object's mapped outlets, satisfying all it's dependencies
         * @example
         * var UserModel = function(){
         * }
         * system.mapSingleton( 'userModel', UserModel );
         * var SomeClass = function(){
         *      user = undefined; //inject
         * }
         * system.mapSingleton( 'o', SomeClass );
         * system.mapOutlet( 'userModel', 'o', 'user' );
         *
         * var foo = {
         *      user : undefined //inject
         * }
         *
         * system.injectInto( foo, 'o' );
         *
         * //foo.user now holds a reference to the singleton instance of UserModel
         * @param {Object} instance
         * @param {String} [key] use the outlet mappings as defined for <code>key</code>, otherwise only the globally
         * mapped outlets will be used.
         * @return {dijon.System}
         */
        injectInto( instance: any,
                               key:string ):dijon.System;
        /**
         * Remove the mapping of <code>key</code> from the system
         * @param {String} key
         * @return {dijon.System}
         */
        unmap ( key:string ):dijon.System;

        /**
         * removes an injection point mapping for a given object mapped to <code>key</code>
         * @param {String} target
         * @param {String} outlet
         * @return {dijon.System}
         * @see dijon.System#addOutlet
         */
        unmapOutlet ( target:string,
                                outlet:string ):dijon.System;

        /**
         * maps a handler for an event/route.<br/>
         * @example
         var hasExecuted = false;
         var userView = {
         showUserProfile : function(){
         hasExecuted = true;
         }
         }
         system.mapValue( 'userView', userView );
         system.mapHandler( 'user/profile', 'userView', 'showUserProfile' );
         system.notify( 'user/profile' );
         //hasExecuted is true
         * @example
         * var userView = {
         *      showUserProfile : function(){
         *          //do stuff
         *      }
         * }
         * system.mapValue( 'userView', userView );
         * <strong>system.mapHandler( 'showUserProfile', 'userView' );</strong>
         * system.notify( 'showUserProfile' );
         *
         * //userView.showUserProfile is called
         * @example
         * var showUserProfile = function(){
         *          //do stuff
         * }
         * <strong>system.mapHandler( 'user/profile', undefined, showUserProfile );</strong>
         * system.notify( 'user/profile' );
         *
         * //showUserProfile is called
         * @example
         * var userView = {};
         * var showUserProfile = function(){
         *          //do stuff
         * }
         * system.mapValue( 'userView', userView );
         * <strong>system.mapHandler( 'user/profile', 'userView', showUserProfile );</strong>
         * system.notify( 'user/profile' );
         *
         * //showUserProfile is called within the scope of the userView object
         * @example
         * var userView = {
         *      showUserProfile : function(){
         *          //do stuff
         *      }
         * }
         * system.mapValue( 'userView', userView );
         * <strong>system.mapHandler( 'user/profile', 'userView', 'showUserProfile', true );</strong>
         * system.notify( 'user/profile' );
         * system.notify( 'user/profile' );
         * system.notify( 'user/profile' );
         *
         * //userView.showUserProfile is called exactly once [!]
         * @example
         * var userView = {
         *      showUserProfile : function( route ){
         *          //do stuff
         *      }
         * }
         * system.mapValue( 'userView', userView );
         * <strong>system.mapHandler( 'user/profile', 'userView', 'showUserProfile', false, true );</strong>
         * system.notify( 'user/profile' );
         *
         * //userView.showUserProfile is called and the route/eventName is passed to the handler
         * @param {String} eventName/route
         * @param {String} [key=undefined] If <code>key</code> is <code>undefined</code> the handler will be called without
         * scope.
         * @param {String|Function} [handler=eventName] If <code>handler</code> is <code>undefined</code> the value of
         * <code>eventName</code> will be used as the name of the member holding the reference to the to-be-called function.
         * <code>handler</code> accepts either a string, which will be used as the name of the member holding the reference
         * to the to-be-called function, or a direct function reference.
         * @param {Boolean} [oneShot=false] Defines whether the handler should be called exactly once and then automatically
         * unmapped
         * @param {Boolean} [passEvent=false] Defines whether the event object should be passed to the handler or not.
         * @return {dijon.System}
         * @see dijon.System#notify
         * @see dijon.System#unmapHandler
         */
        mapHandler ( eventName:string,
                               key:string,
                               handler: string | Callback,
                               oneShot:boolean ,
                               passEvent:boolean ):dijon.System; 
        /**
         * Unmaps the handler for a specific event/route.
         * @param {String} eventName Name of the event/route
         * @param {String} [key=undefined] If <code>key</code> is <code>undefined</code> the handler is removed from the
         * global mapping space. (If the same event is mapped globally and specifically for an object, then
         * only the globally mapped one will be removed)
         * @param {String | Function} [handler=eventName]
         * @return {dijon.System}
         * @see dijon.System#mapHandler
         */
        unmapHandler ( eventName:string,
                                 key:string,
                                 handler : string | Callback ):dijon.System;

        /**
         * calls all handlers mapped to <code>eventName/route</code>
         * @param {String} eventName/route
         * @return {dijon.System}
         * @see dijon.System#mapHandler
         */
        notify ( eventName:String ):dijon.System; 

        

   }
}