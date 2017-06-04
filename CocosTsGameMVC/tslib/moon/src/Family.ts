import {EntityList} from "./EntityList";
import {Entity} from "./Entity";
import {Signal} from "./Signal";
import {Component} from "./Component";
    /**
     * The family is a collection of entities having all the specified components.
     * @class
     */
    export class Family {
        private componentNames: string[];
        private entities: EntityList;
        public entityAdded: Signal;
        public entityRemoved: Signal;

        /**
         * @constructor
         * @param {Array} componentNames
         */
        constructor(componentNames: string[]) {
            /**
             * @private
             */
            this.componentNames = componentNames;

            /**
             * A linked list holding the entities;
             * @private
             */
            this.entities = new EntityList();

            /**
             * @public
             * @readonly
             */
            this.entityAdded = new Signal();
            /**
             * @public
             * @readonly
             */
            this.entityRemoved = new Signal();
        }

        /**
         * Get the entities of this family.
         * @public
         * @return {Array}
         */
        getEntities(): Entity[] {
            return this.entities.toArray();
        }

        /**
         * Add the entity into the family if match.
         * @public
         * @param {Entity} entity
         */
        addEntityIfMatch(entity: Entity) {
            if (!this.entities.has(entity) && this.matchEntity(entity)) {
                this.entities.add(entity);
                this.entityAdded.emit(entity);
            }
        }

        /**
         * Remove the entity into the family if match.
         * @public
         * @function
         * @param {Entity} entity
         */
        removeEntity(entity: Entity) {
            if (this.entities.has(entity)) {
                this.entities.remove(entity);
                this.entityRemoved.emit(entity);
            }
        }

        /**
         * Handler to be called when a component is added to an entity.
         * @public
         * @param {Entity} entity
         * @param {String} componentName
         */
        onComponentAdded(entity: Entity, componentName: string) {
            this.addEntityIfMatch(entity);
        }

        /**
         * Handler to be called when a component is removed from an entity.
         * @public
         * @param {Entity} entity
         * @param {String} componentName
         * @param {Component} removedComponent
         */
        onComponentRemoved(entity: Entity, componentName: string, removedComponent: Component) {
            // return if the entity is not in this family
            if (!this.entities.has(entity)) {
                return;
            }

            // remove the node if the removed component is required by this family
            for (let i = 0; i < this.componentNames.length; ++i) {
                if (this.componentNames[i] === componentName) {
                    this.entities.remove(entity);
                    this.entityRemoved.emit(entity, removedComponent);
                }
            }
        }

        /**
         * Check if an entity belongs to this family.
         * @private
         * @param {Entity} entity
         * @return {Boolean}
         */
        private matchEntity(entity: Entity​​): boolean {
            for(let i = 0; i < this.componentNames.length; i++) {
                if(!entity.hasComponent(this.componentNames[i])) {
                    return false;
                }
            }
            return true;
        }
    }

