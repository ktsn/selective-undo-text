import { IOperation } from '../interfaces/operation';
import { RemoveOperation } from './remove-operation';
import { SequenceOperation } from './sequence-operation';

export class AddOperation implements IOperation<string> {
  public type: string = 'add';
  public length: number;

  constructor(public index: number, private chunk: string) {
    this.length = chunk.length;
  }

  public description() : string {
    return `Add "${this.chunk}" at ${this.index}`;
  }

  public apply(target: string) : string {
    const pre = target.slice(0, this.index);
    const suf = target.slice(this.index);
    return [pre, this.chunk, suf].join('');
  }

  public inverse() : IOperation<string> {
    return new RemoveOperation(this.index, this.length);
  }

  public transform(op: IOperation<string>) : IOperation<string> {
    switch (op.type) {
      case 'add':
        if (this.index > op.index) {
          return new AddOperation(this.index + op.length, this.chunk);
        } else {
          return this;
        }
      case 'remove':
        if (this.index > op.index) {
          return new AddOperation(
            Math.min(op.length, this.index - op.index),
            this.chunk
          );
        } else {
          return this;
        }
      case 'sequence':
        const sequence: SequenceOperation = <SequenceOperation>op;
        return sequence.operations.reduce((memo, opposed) => memo.transform(opposed), this);
      case 'noop':
        return this;
      default:
        throw new Error('Unexpected operation type: ' + op.type);
    }
  }
}
