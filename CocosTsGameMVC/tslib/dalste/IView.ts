export interface IView {
    getAsset(): cc.Node;
    onInitView(): void;
    getEventBus(): signals.Signal;
    show(parent?:cc.Node):void;
}

export default IView;