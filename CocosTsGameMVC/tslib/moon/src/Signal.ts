module CES {
    /**
     * The signal can register listeners and invoke the listeners with messages.
     * @class
     */
    export class Signal {
        private listeners: CES.Listener[]; // Array of callbacks that can accept any kind of params

        constructor() {
            this.listeners = [];
        }

        /**
         * Add a listener to this signal.
         * @public
         * @param {Function} listener
         */
        public add(listener: CES.Listener) {
            this.listeners.push(listener);
        }

        /**
         * Remove a listener from this signal.
         * @public
         * @param {Function} listener
         */
        public remove(listener: CES.Listener): boolean {
            for(let i = 0; i < this.listeners.length; i++) {
                if(listener === this.listeners[i]) {
                    this.listeners.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        /**
         * Emit a message.
         * @public
         * @param {...*} messages
         */
        public emit(...messages: any[]) {
            for(let listener of this.listeners) {
                listener.apply(null, messages);
            }
        }
    }
}
