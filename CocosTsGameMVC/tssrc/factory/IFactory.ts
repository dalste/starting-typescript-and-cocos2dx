/**
 * @interface IFactory
 * Template  T represents class used for creation options
 * Template  U represents return type of factory create function
 *]
 * 
 */
export interface IFactory<T,U> {
    create(creationOptions: T): U;
}

export default IFactory;