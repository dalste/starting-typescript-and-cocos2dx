(function( dalste, undefined ) {

    var mvc =  dalste.extend (dalste,"dalste.mvc");
 
    /**
     * @class NodeExtended -  provides subscribable signal wrappers around node lifecycle events  implements INodeLifecycleExtensions 
     * onEnter
     * onEnterTransitionDidFinish
     * onExit
     * onExitTransitionDidStart
     */

     mvc.NodeExtended = cc.Node.extend({


    /**
     * Event callback that is invoked every time when CCNode enters the 'stage'.
     */
    onEnterSignal: null,
    /**
     *  Event callback that is invoked every time when CCNode enters the 'stage'.
     */
    onEnterTransitionDidFinishSignal: null,
    /**
     *  Event callback that is called every time the cc.Node leaves the 'stage'.
     */
    onExitSignal: null,


    /**
     * callback that is called every time the cc.Node leaves the 'stage'.
     */
    onExitTransitionDidStartSignal: null,
    ctor: function () {
        this._super();
        this.onEnterSignal = new signals.Signal();
        this.onEnterTransitionDidFinishSignal = new signals.Signal();

        this.onExitSignal = new signals.Signal();
        this.onExitTransitionDidStartSignal = new signals.Signal();
    },
    onEnter: function () {
        this._super();
        this.onEnterSignal.dispatch();
    },
    onExit: function () {
        this._super();
        this.onExitSignal.dispatch();
    },
    onEnterTranistionDidFinish: function () {
        this._super();
        this.onEnterTransitionDidFinishSignal.dispatch();
    },
    onExitTransitionDidStart: function () {
        this._super();
        this.onExitTransitionDidStartSignal.dispatch();
    }
});


}( window.dalste = window.dalste || {} ));

