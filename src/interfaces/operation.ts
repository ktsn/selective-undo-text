export interface IOperation<T> {
  type: string;
  index?: number;
  length?: number;

  description() : string;
  apply(target: T) : T;
  inverse() : IOperation<T>;
  transform(op: IOperation<T>) : IOperation<T>;
}
