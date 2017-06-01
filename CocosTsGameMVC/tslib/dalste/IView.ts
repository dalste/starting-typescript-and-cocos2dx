export interface IView {
    getAsset(): cc.Node;
    onInitView(): void;
    getEventBus(): signals.Signal;
}

export default IView;