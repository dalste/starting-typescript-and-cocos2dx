export interface IFactory<T,U> {
    create(creationOptions: T): U;
}

export default IFactory;