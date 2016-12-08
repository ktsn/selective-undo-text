import { IOperation } from '../interfaces/operation';

export class SequenceOperation implements IOperation<string> {
  public type: 'sequence' = 'sequence';

  constructor(public operations: IOperation<string>[]) {
  }

  public description() : string {
    return this.operations.map(op => op.description()).join('\n');
  }

  public apply(target: string) : string {
    return applyImpl(target, this.operations);
  }

  public inverse() : IOperation<string> {
    const inversed = inverseImpl([], this.operations);

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

function applyImpl(target: string, [op, ...ops]: IOperation<string>[]) : string {
  if (!op) return target;
  return applyImpl(op.apply(target), ops.map(o => o.transform(op)));
}

function inverseImpl(acc: IOperation<string>[], [op, ...ops]: IOperation<string>[]) : IOperation<string>[] {
  if (!op) return acc;
  return inverseImpl([op.inverse()].concat(acc), ops.map(o => o.transform(op)));
}
