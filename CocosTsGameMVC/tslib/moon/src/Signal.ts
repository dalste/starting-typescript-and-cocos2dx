import {Listener} from "./Listener";
    /**
     * The signal can register listeners and invoke the listeners with messages.
     * @class
     */
    export class Signal  extends signals.Signal{
        private listeners: Listener[]; // Array of callbacks that can accept any kind of params

      

        /**
         * Emit a message.
         * @public
         * @param {...*} messages
         */
        public emit(...messages: any[]) {
            super.dispatch.apply(this,messages);
        }
    }

