
import { Signal } from "./Signal";
import { Component } from "./Component";
/**
 * The entity is the container of components.
 * @class
 */
export class Entity {
    private static _id: number = 0;
    public id: number;
    private components: { [key: string]: Component; };
    public onComponentAdded: Signal;
    public onComponentRemoved: Signal;

    constructor() {
        /**
         * @public
         * @readonly
         */
        this.id = Entity._id++;

        /**
         * Map from component names to components.
         * @private
         * @property
         */
        this.components = {};

        /**
         * @public
         * @readonly
         */
        this.onComponentAdded = new Signal();

        /**
         * @public
         * @readonly
         */
        this.onComponentRemoved = new Signal();
    }

    /**
     * Check if this entity has a component by name.
     * @public
     * @param {String} componentName
     * @return {Boolean}
     */
    hasComponent(componentName: string): boolean {
        return this.components['$' + componentName] !== undefined;
    }

    /**
     * Get a component of this entity by name.
     * @public
     * @param {String} componentName
     * @return {Component}
     */
    getComponent(componentName: string): Component {
        return this.components['$' + componentName];
    }

    /**
     * Add a component to this entity.
     * @public
     * @param {Component} component
     */
    addComponent(component: Component) {
        this.components['$' + component.name] = component;
        this.onComponentAdded.emit(this, component.name);
    }

    /**
     * Remove a component from this entity by name.
     * @public
     * @param {String} componentName
     */
    removeComponent(componentName: string) {
        var removedComponent: Component = this.components['$' + componentName];
        this.components['$' + componentName] = undefined;
        this.onComponentRemoved.emit(this, componentName, removedComponent);
    }
}

