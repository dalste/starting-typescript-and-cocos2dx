module CES {
    /**
     * The system is responsible for updating the entities.
     * @class
     */
    export class System {
        public world: CES.World;

        constructor() {
            this.world = null;
        }

        addedToWorld(world: CES.World) {
            this.world = world;

        
        }

        removedFromWorld() {
            this.world = null;
        }

        /**
         * Update the entities.
         * @public
         * @param {Number} dt time interval between updates
         */
        update(dt: number) {
            throw new Error('Subclassed should override this method');
        }
    }
}
