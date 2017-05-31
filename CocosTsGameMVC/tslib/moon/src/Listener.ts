module CES {
    export interface Listener {
        (...messages: any[]): void;
    }
}
