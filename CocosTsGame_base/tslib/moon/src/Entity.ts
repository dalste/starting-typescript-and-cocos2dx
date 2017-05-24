module CES {
    /**
     * The entity is the container of components.
     * @class
     */
    export class Entity {
        private static _id: number = 0;
        public id: number;
        private components: { [key: string]: Component; };
        public onComponentAdded: CES.Signal;
        public onComponentRemoved: CES.Signal;

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
            this.onComponentAdded = new CES.Signal();

            /**
             * @public
             * @readonly
             */
            this.onComponentRemoved = new CES.Signal();
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
        addComponent(component: CES.Component) {
            this.components['$' + component.name] = component;
            this.onComponentAdded.emit(this, component.name);
        }

        /**
         * Remove a component from this entity by name.
         * @public
         * @param {String} componentName
         */
        removeComponent(componentName: string) {
            var removedComponent: CES.Component = this.components['$' + componentName];
            this.components['$' + componentName] = undefined;
            this.onComponentRemoved.emit(this, componentName, removedComponent);
        }
    }
}
