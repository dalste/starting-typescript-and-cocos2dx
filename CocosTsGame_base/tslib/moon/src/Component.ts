module CES {
    /**
     * The components is the container of some properties that
     * the entity possesses. It may also contain some methods.
     * @class
     */
    export class Component {
        /**
         * Name of this component. It is expected to be overriden and
         * should be unique.
         * @public
         * @readonly
         * @property {String} name
         */
        public name: string
    }
}
