import { IOperation } from '../interfaces/operation';

export class SequenceOperation implements IOperation<string> {
  public type: string = 'sequence';

  constructor(public operations: IOperation<string>[]) {
  }

  public description() : string {
    return this.operations.map(op => op.description()).join('\n');
  }

  public apply(target: string) : string {
    return this.operations.reduce((memo: string, op: IOperation<string>) => {
      return op.apply(memo);
    }, target);
  }

  public inverse() : IOperation<string> {
    const inversed = this.operations.concat().reverse().map((op: IOperation<string>) => {
      return op.inverse();
    });

    return new SequenceOperation(inversed);
  }

  public transform(op: IOperation<string>) : IOperation<string> {
    const ops: IOperation<string>[] = [];
    for (let i = this.operations.length - 1; i >= 0; --i) {
      ops.push(this.operations[i].transform(op));
    }
    return new SequenceOperation(ops);
  }
}
