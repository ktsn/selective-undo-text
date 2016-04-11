import { IOperation } from '../interfaces/operation';
import { AddOperation } from './add-operation';
import { NoOperation } from './no-operation';
import { GroupOperation } from './group-operation';

export class RemoveOperation implements IOperation<string> {
  public type: string = 'remove';

  private chunk: string = null;

  constructor(public index: number, public length: number) {

  }

  public description() : string {
    return `Remove from ${this.index} to ${this.index + this.length}`;
  }

  public apply(target: string) : string {
    const pre = target.slice(0, this.index);
    const suf = target.slice(this.index + this.length);

    this.chunk = target.substr(this.index, this.length);

    return [pre, suf].join('');
  }

  public inverse() : IOperation<string> {
    if (this.chunk === null) {
      throw new Error('The RemoveOperation instance is ambiguous to create an inverse operation');
    }

    return new AddOperation(this.index, this.chunk);
  }

  public transform(op: IOperation<string>) : IOperation<string> {
    switch (op.type) {
      case 'add':
        if (this.index + this.length <= op.index) {
          // the add-operation will be applied at greater position than this operation
          // ...[remove]...[add]
          return this;
        } else if (op.index <= this.index) {
          // the add-operation will be applied at less position than this operation
          // ...[add]...[remove]
          return new RemoveOperation(this.index + op.length, this.length);
        } else {
          // the add-operation will be applied in the removing text
          // ...[remove][add][remove]...
          const pre = new RemoveOperation(this.index, op.index - this.index);
          const post = new RemoveOperation(op.index + op.length, this.length - (op.index - this.index));
          return new GroupOperation([post, pre]);
        }
      case 'remove':
        if (this.index + this.length <= op.index) {
          // the opposed operation will be applied at greater position than this operation
          // ...[this]...[opposed]
          return this;
        } else if (op.index <= this.index && this.index + this.length <= op.index + op.length ) {
          // the opposed operation covers whole text that this operation try to remove
          // ...[opposed ... [this] ...]...
          return new NoOperation();
        } else {
          // otherwise, the opposed operation eliminates the range of removal of this operation
          // ...[this ... [opposed] ...]...
          const intersect = Math.max(
            0,
            this.length
              - Math.max(0, op.index - this.index)
              - Math.max(0, (this.index + this.length) - (op.index + op.length))
          );
          return new RemoveOperation(
            this.index - (op.length - intersect),
            this.length - intersect
          );
        }
      case 'group':
        const group: GroupOperation = <GroupOperation>op;
        return group.operations.reduce((memo, opposed) => memo.transform(opposed), this);
      case 'noop':
        return this;
      default:
        throw new Error('Unexpected operation type: ' + op.type);
    }
  }
}
