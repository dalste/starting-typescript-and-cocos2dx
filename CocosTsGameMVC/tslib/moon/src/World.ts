import {Family} from "./Family";
import {System} from "./System";
import {EntityList} from "./EntityList";
import {Entity} from "./Entity";
import {Component} from "./Component";
import { Signal } from "./Signal";
    /**
     * The world is the container of all the entities and systems.
     * @class
     */

    
    export class World {
        private families: { [key: string]: Family; };
        private systems: System[];
        private entities: EntityList;
        

        constructor() {
            /**
             * A map from familyId to family
             * @private
             */
            this.families = {};

            /**
             * @private
             */
            this.systems = [];

            /**
             * @private
             */
            this.entities = new EntityList();
           // this.systemEventBusSignal = new signals.Signal;
        }

        cleanUp():void{

            var entities  = this.entities.toArray();
              for(var i= entities.length-1; i>=0; i--){
                this.removeEntity(entities[i]);
            }
            for(var i= this.systems.length-1; i>=0; i--){
                this.removeSystem(this.systems[i]);
            }


        }

        dispatchWorldEvent(eventName:string, eventData:any){
          //      this.systemEventBusSignal.dispatch(eventName, eventData);
        }

        /**
         * Add a system to this world.
         * @public
         * @param {System} system
         */
        addSystem(system: System): World {
            this.systems.push(system);
            system.addedToWorld(this);
            return this;
        }

        /**
         * Remove a system from this world.
         * @public
         * @param {System} system
         */
        removeSystem(system: System) {
            for (let i = 0; i < this.systems.length; i++) {
                if (this.systems[i] === system) {
                    this.systems.splice(i, 1);
                    system.removedFromWorld();
                }
            }
        }

        /**
         * Add an entity to this world.
         * @public
         * @param {Entity} entity
         */
        addEntity(entity: Entity) {
            // try to add the entity into each family
            for (let familyId in this.families) {
                if(this.families.hasOwnProperty(familyId)) {
                    this.families[familyId].addEntityIfMatch(entity);
                }
            }
            // update the entity-family relationship whenever components are
            // added to or removed from the entities
            entity.onComponentAdded.add((entity: Entity, componentName: string) => {
                this.onComponentAdded(entity, componentName);
            });
            entity.onComponentRemoved.add((entity: Entity, componentName: string, component: Component) => {
                this.onComponentRemoved(entity, componentName, component);
            });

            this.entities.add(entity);
        }

         /**
         * gets and entity by id
         * @public
         * @param {entityId} entity
         * @return {Entity}
         */
        get(entityId:number): Entity {

          
                return this.entities.get(entityId);
       
        }

        /**
         * Remove and entity from this world.
         * @public
         * @param {Entity} entity
         */
        removeEntity(entity: Entity) {
            // try to remove the entity from each family
            for (let familyId in this.families) {
                if(this.families.hasOwnProperty(familyId)) {
                    this.families[familyId].removeEntity(entity);
                }
            }

            this.entities.remove(entity);
        }

        /**
         * Get the entities having all the specified componets.
         * @public
         * @param {...String} componentNames
         * @return {Array} an array of entities.
         */
        getEntities(...componentNames: string[]) {
            let familyId = World.getFamilyId(componentNames);
            this.ensureFamilyExists(componentNames);

            return this.families[familyId].getEntities();
        }

        /**
         * For each system in the world, call its `update` method.
         * @public
         * @param {Number} dt time interval between updates.
         */
        update(dt: number) {
            for(let system of this.systems) {
                system.update(dt);
            }
        }

        /**
         * Returns the signal for entities added with the specified components. The
         * signal is also emitted when a component is added to an entity causing it
         * match the specified component names.
         * @public
         * @param {...String} componentNames
         * @return {Signal} A signal which is emitted every time an entity with
         *     specified components is added.
         */
        entityAdded(...componentNames: string[]): Signal {
            let familyId = World.getFamilyId(componentNames);
            this.ensureFamilyExists(componentNames);

            return this.families[familyId].entityAdded;
        }

        /**
         * Returns the signal for entities removed with the specified components.
         * The signal is also emitted when a component is removed from an entity
         * causing it to no longer match the specified component names.
         * @public
         * @param {...String} componentNames
         * @return {Signal} A signal which is emitted every time an entity with
         *     specified components is removed.
         */
        entityRemoved(...componentNames: string[]): Signal {
            let familyId = World.getFamilyId(componentNames);
            this.ensureFamilyExists(componentNames);

            return this.families[familyId].entityRemoved;
        }

        /**
         * Creates a family for the passed array of component names if it does not
         * exist already.
         * @param {Array.<String>} components
         */
        private ensureFamilyExists(components: string[]) {
            var families = this.families;
            var familyId = World.getFamilyId(components);

            if (!families[familyId]) {
                families[familyId] = new Family(
                    Array.prototype.slice.call(components)
                );
                for (var node = this.entities.head; node; node = node.next) {
                    families[familyId].addEntityIfMatch(node.entity);
                }
            }
        }

        /**
         * Returns the family ID for the passed array of component names. A family
         * ID is a comma separated string of all component names with a '$'
         * prepended.
         * @param {Array.<String>} components
         * @return {String} The family ID for the passed array of components.
         */
        private static getFamilyId(components: string[]) {
            return '$' + Array.prototype.join.call(components, ',');
        }

        /**
         * Handler to be called when a component is added to an entity.
         * @private
         * @param {Entity} entity
         * @param {String} componentName
         */
        private onComponentAdded(entity: Entity, componentName: string) {
            for (let familyId in this.families) {
                if(this.families.hasOwnProperty(familyId)) {
                    this.families[familyId].onComponentAdded(entity, componentName);
                }
            }
        }

        /**
         * Handler to be called when component is removed from an entity.
         * @private
         * @param {Entity} entity
         * @param {String} componentName
         * @param {Component} component
         */
        private onComponentRemoved(entity: Entity, componentName: string, component: Component) {
            for (let familyId in this.families) {
                if(this.families.hasOwnProperty(familyId)) {
                    this.families[familyId].onComponentRemoved(entity, componentName, component);
                }
            }
        }
    }

