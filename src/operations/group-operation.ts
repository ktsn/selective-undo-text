import { IOperation } from '../interfaces/operation';

export class GroupOperation implements IOperation<string> {
  public type: string = 'group';

  public operations: IOperation<string>[];

  constructor(...operations: IOperation<string>[]) {
    this.operations = operations;
  }

  public apply(target: string) : string {
    return this.operations.reduce((memo: string, op: IOperation<string>) => {
      return op.apply(memo);
    }, target);
  }

  public inverse() : IOperation<string> {
    const inversed = this.operations.reverse().map((op: IOperation<string>) => {
      return op.inverse();
    });

    return new GroupOperation(...inversed);
  }

  public transform(op: IOperation<string>) : IOperation<string> {
    const ops: IOperation<string>[] = [];
    for (let i = this.operations.length - 1; i >= 0; --i) {
      ops.push(this.operations[i].transform(op));
    }
    return new GroupOperation(...ops);
  }
}