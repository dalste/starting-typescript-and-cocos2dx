

export interface ICreationOptions<T> {
    getType(): T
    getName(): string
}

export default ICreationOptions;