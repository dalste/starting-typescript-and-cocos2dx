export interface IView {
    /**
     * @description returns the main asset for this view
     * @returns cc.Node 
     */
    getAsset(): cc.Node;

     /**
    * @description sets the main asset for this view
    * @param cc.Node 
    */
    setAsset(node: cc.Node): void;
   
     /**
     * @description returns the signals.Signal that represents this views UI eventBus, you may use this Signal to subscribe to view events
     */
    getUIEventBus(): signals.Signal;
         /**
     * @description returns the signals.Signal that represents this views main asset onExit event
     * @see cc.Node:onEnter
     */
    getExitSignal(): signals.Signal;

          /**
     * @description returns the signals.Signal that represents this views main asset onEnter event
     * @see cc.Node:onEnter
     */
    getEnterSignal(): signals.Signal; 


    /**
     * @description returns the signals.Signal that represents this views main asset's onExitTransitionDidStart event
     * @see cc.Node:onExit
     */
    getExitTransitionDidStartSignal(): signals.Signal;
          /**
     * @description returns the signals.Signal that represents this views main asset's  onEnterTransitionDidFinish event
     * @see cc.Node:onEnter
     */
    getEnterTransitionDidFinishSignal(): signals.Signal;

    /**
     * @description displays the view on screen
     *
     * @param cc.Node  - optional parent node
     */
    show(parent?: cc.Node): void;

    /**
     * @description wraps cocos2d-x cc.Node::addChild -adds a node as a child to this views _asset
    * @param {cc.Node} child  A child node
    * @param {number} [localZOrder]  Z order for drawing priority. Please refer to setZOrder(int)
    * @param {number|string} [tag]  An integer or a name to identify the node easily. Please refer to setTag(int) and setName(string)
     */

    addChild(child: cc.Node, localZOrder?: number, tag?: string | number): void;
}

export default IView;