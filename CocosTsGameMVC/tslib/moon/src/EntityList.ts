
import { EntityNode } from "./EntityNode";
import { Entity } from "./Entity"
/**
 * The entity list is a doubly-linked-list which allows the
 * entities to be added and removed efficiently.
 * @class
 */
export class EntityList {
    public head: EntityNode;
    public tail: EntityNode;
    public length: number;
    private entities: { [key: string]: EntityNode; };
    constructor() {
        /**
         * @public
         * @readonly
         */
        this.head = null;

        /**
         * @public
         * @readonly
         */
        this.tail = null;

        /**
         * @public
         * @readonly
         */
        this.length = 0;

        /**
         * Map from entity id to entity node,
         * for O(1) find and deletion.
         * @private
         */
        this.entities = {};
    }

    /**
     * Add an entity into this list.
     * @public
     * @param {Entity} entity
     */
    add(entity: Entity) {
        let node: EntityNode = new EntityNode(entity);
        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
        this.entities[entity.id] = node;
    }

    /**
     * Remove an entity from this list.
     * @public
     * @param {Entity} entity
     */
    remove(entity: Entity) {
        let node = this.entities[entity.id];
        if (node === undefined) {
            return;
        }

        if (node.prev === null) {
            this.head = node.next;
        } else {
            node.prev.next = node.next;
        }

        if (node.next === null) {
            this.tail = node.prev;
        } else {
            node.next.prev = node.prev;
        }

        this.length--;
        delete this.entities[entity.id];
    }


    /**
      * Check if this list has the entity.
      * @public
      * @param {entityId} entity
      * @return {Entity}
      */
    get(entityId: number): Entity {

        if (this.entities[entityId] != undefined)
            return this.entities[entityId].entity;
        else
            return null
    }

    /**
     * Check if this list has the entity.
     * @public
     * @param {Entity} entity
     * @return {Boolean}
     */
    has(entity: Entity): boolean {
        return this.entities[entity.id] !== undefined;
    }

    /**
     * Remove all the entities from this list.
     * @public
     */
    clear() {
        this.head = this.tail = null;
        this.length = 0;
        this.entities = {};
    }

    /**
     * Return an array holding all the entities in this list.
     * @public
     * @return {Array}
     */
    toArray(): Entity[] {
        let array: Entity[] = [];

        for (let node = this.head; node; node = node.next) {
            array.push(node.entity);
        }

        return array;
    }
}

