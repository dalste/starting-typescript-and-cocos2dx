import { GameComponentTypes } from "./../types/GameComponentTypes";
import { SwipeDirections } from "./../../tslib/dalste/gestures/SwipeDirections";
import { PlayerInputEvent } from "./../component/GameComponents";
import { DirectionalSwipeGestureRecogniser } from "./../../tslib/dalste/gestures/DirectionalSwipeGestureRecogniser";
import { CharacterEntityCreationOptions } from "./../factory/entity/CharacterEntityFactory";
import { World } from "./../../tslib/moon/src/World";
import { System } from "./../../tslib/moon/src/System";
import { Entity } from "./../../tslib/moon/src/Entity";
import { IFactory } from "./../factory/IFactory";
import { CharacterEntityTypes } from "./../types/EntityTypes";

import { InputTypes } from "./../types/InputTypes";

export class PlayerInputSystem extends System {


    protected _inputControlledEntities: Entity[];


    protected _gestureRecogniser: DirectionalSwipeGestureRecogniser;


    protected _listener:cc.EventListener;
    //  protected _target: cc.Node;


     /**
     * @description called by dijon IOC container after instance is created and dependencies injected
     */
    setup() {

    }

    constructor() {
        super();
    }


    /**
     * @description maintains the lists of entities that we are interested in 
     */
    refreshEntityLists() {
        this._inputControlledEntities = this.world.getEntities(GameComponentTypes.PLAYER_INPUT);
    }

    /**
     * called when this system is added to the MOON CES World here you should do system initialisation
     * @param world 
     */
    addedToWorld(world: World) {
        super.addedToWorld(world);
        cc.log("PlayerInputSystem Added");

        var scope = this;

        this.world.entityAdded(GameComponentTypes.PLAYER_INPUT).add(function (entity: Entity) {
            scope.refreshEntityLists();
        });

        this.world.entityRemoved(GameComponentTypes.PLAYER_INPUT).add(function (entity: Entity) {
            scope.refreshEntityLists();

        });

        this.refreshEntityLists();

        this.createTapListeners(null);

    }



    update(dt: number) {


    }
    /**
     * @see http://discuss.cocos2d-x.org/t/new-event-manager-in-cocos2d-html5-v3-0/11637
     * @param container 
     */
    createTapListeners(container: cc.Node) {

        var scope = this;

            this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch: any, event: any) {
                cc.log("onTouchBegan");
                scope._gestureRecogniser = new DirectionalSwipeGestureRecogniser();
                var location = touch.getLocation();
                for (var i = 0; i < scope._inputControlledEntities.length; i++) {
                    var pevent = new PlayerInputEvent();
                    pevent.positions.push(cc.p(location.x, location.y));
                    pevent.type = InputTypes.TOUCH_BEGAN;
                    scope._inputControlledEntities[i].addComponent(pevent);
                }

                scope._gestureRecogniser.beginPoint(location.x, location.y);
                return true
            },
            onTouchMoved: function (touch: any, event: any) {
                cc.log("onTouchMoved");
                var location = touch.getLocation();
                for (var i = 0; i < scope._inputControlledEntities.length; i++) {
                    var pevent = new PlayerInputEvent();
                    pevent.positions.push(cc.p(location.x, location.y));
                    pevent.type = InputTypes.TOUCH_MOVED;
                    scope._inputControlledEntities[i].addComponent(pevent);
                }
            },
            onTouchEnded: function (touch: any, event: any) {
                cc.log("onTouchEnded");
                var location = touch.getLocation();
                var swipeResult = scope._gestureRecogniser.endPoint(location.x, location.y);

                for (var i = 0; i < scope._inputControlledEntities.length; i++) {
                    var pevent = new PlayerInputEvent();
                    pevent.positions.push(cc.p(location.x, location.y));
                    pevent.type = InputTypes.TOUCH_ENDED;
                    scope._inputControlledEntities[i].addComponent(pevent);
                }

                cc.log("swipeResult " + swipeResult);
                switch (swipeResult) {
                    case SwipeDirections.SWIPE_ANY_DIR:
                        for (var i = 0; i < scope._inputControlledEntities.length; i++) {
                            var pevent = new PlayerInputEvent();
                            pevent.type = InputTypes.TOUCH_SWIPE;
                            pevent.swipeDir = swipeResult;
                            pevent.direction = scope._gestureRecogniser.getDirection();
                            scope._inputControlledEntities[i].addComponent(pevent);
                        }
                        break;
                    case SwipeDirections.TAP:
                        var location = touch.getLocation();
                        for (var i = 0; i < scope._inputControlledEntities.length; i++) {
                            var pevent = new PlayerInputEvent();
                            pevent.type = InputTypes.TOUCH_TAP;
                            pevent.positions.push(cc.p(location.x, location.y));
                            pevent.location = touch.getLocation();
                            pevent.target = container != null ? container : cc.director.getRunningScene();

                            scope._inputControlledEntities[i].addComponent(pevent);
                        }

                        break;
                    case SwipeDirections.SWIPE_DOWN:
                    case SwipeDirections.SWIPE_UP:
                    case SwipeDirections.SWIPE_LEFT:
                    case SwipeDirections.SWIPE_RIGHT:
                        cc.warn("PlayerInputSystem:createTapListeners->onTouchEnded swipe " + swipeResult + " not implemented");
           
                        break;

                }

            },
            onTouchCancelled: function (touch: any, event: any) {
                cc.log("touchCancelled");
                for (var i = 0; i < scope._inputControlledEntities.length; i++) {
                    var pevent = new PlayerInputEvent();
                    pevent.type = InputTypes.TOUCH_CANCELLED;
                    scope._inputControlledEntities[i].addComponent(pevent);
                }

            }
        });

        if (container == null)
            cc.eventManager.addListener(this._listener, 1);
        else
            cc.eventManager.addListener(this._listener, container);
    }

      /**
     * called when this system is removed from the MOON CES World here you should do system cleanup
     * @param world 
     */
    removedFromWorld():void{
        super.removedFromWorld();
         cc.eventManager.removeListener(this._listener);
         this._inputControlledEntities = null;
         this._gestureRecogniser = null;
         this._listener = null;
    }


}