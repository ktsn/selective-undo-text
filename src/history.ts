import { IOperation } from './interfaces/operation';

export class History<T> {
  private commands: IOperation<T>[];
}
