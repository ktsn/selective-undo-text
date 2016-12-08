import { Operation } from '../interfaces/operation'

export class SequenceOperation implements Operation<string> {
  public type: 'sequence' = 'sequence'

  constructor(public operations: Operation<string>[]) {
  }

  public description(): string {
    return this.operations.map(op => op.description()).join('\n')
  }

  public apply(target: string): string {
    return applyImpl(target, this.operations)
  }

  public inverse(): Operation<string> {
    const inversed = inverseImpl([], this.operations)

    return new SequenceOperation(inversed)
  }

  public transform(op: Operation<string>): Operation<string> {
    const ops: Operation<string>[] = []
    for (let i = this.operations.length - 1; i >= 0; --i) {
      ops.push(this.operations[i].transform(op))
    }
    return new SequenceOperation(ops)
  }
}

function applyImpl(target: string, [op, ...ops]: Operation<string>[]): string {
  if (!op) return target
  return applyImpl(op.apply(target), ops.map(o => o.transform(op)))
}

function inverseImpl(acc: Operation<string>[], [op, ...ops]: Operation<string>[]): Operation<string>[] {
  if (!op) return acc
  return inverseImpl([op.inverse()].concat(acc), ops.map(o => o.transform(op)))
}
