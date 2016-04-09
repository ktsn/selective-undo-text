import { IOperation } from '../interfaces/operation';

export class NoOperation implements IOperation<string> {
  public type: string = 'noop';

  public apply(target: string) : string {
    return target;
  }

  public description() : string {
    return 'No operation';
  }

  public inverse() : IOperation<string> {
    return this;
  }

  public transform(op: IOperation<string>) : IOperation<string> {
    return this;
  }
}
