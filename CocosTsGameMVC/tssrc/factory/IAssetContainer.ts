

export interface IAssetContainer<T> {
    getAsset(): T
    clearAsset():void;
}

export default IAssetContainer;