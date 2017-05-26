module CES {
    /**
     * The entity node is a wrapper around an entity, to be added into
     * the entity list.
     * @class
     */
    export class EntityNode {
        public entity: CES.Entity;
        public next: CES.EntityNode;
        public prev: CES.EntityNode;

        constructor(entity: CES.Entity) {
            this.entity = entity;
            this.next = null;
            this.prev = null;
        }
    }

}
