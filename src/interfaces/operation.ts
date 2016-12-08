export interface IOperation<T> {
  type: 'add' | 'remove' | 'sequence' | 'noop';
  index?: number;
  length?: number;

  description() : string;
  apply(target: T) : T;
  inverse() : IOperation<T>;
  transform(op: IOperation<T>) : IOperation<T>;
}
