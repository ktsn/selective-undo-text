export interface IOperation<T> {
  type: string;
  index?: number;
  length?: number;

  apply(target: T) : T;
  inverse() : IOperation<T>;
  transform(op: IOperation<T>) : IOperation<T>;
}
