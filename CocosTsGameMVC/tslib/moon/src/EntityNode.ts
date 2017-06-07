import { Entity } from "./Entity";
/**
 * The entity node is a wrapper around an entity, to be added into
 * the entity list.
 * @class
 */
export class EntityNode {
    public entity: Entity;
    public next: EntityNode;
    public prev: EntityNode;

    constructor(entity: Entity) {
        this.entity = entity;
        this.next = null;
        this.prev = null;
    }
}


