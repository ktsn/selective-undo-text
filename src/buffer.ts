import { IOperation } from './interfaces/operation';
import { AddOperation } from './operations/add-operation';
import { RemoveOperation } from './operations/remove-operation';

export class Buffer {
  private operations: IOperation<string>[] = [];

  constructor(public text: string = '') {

  }

  public addText(index: number, chunk: string) {
    const op = new AddOperation(index, chunk);
    this.applyOperation(op);
  }

  public removeText(index: number, length: number) {
    const op = new RemoveOperation(index, length);
    this.applyOperation(op);
  }

  public undo(index: number = this.operations.length - 1) {
    const inverse = this.operations[index].inverse();
    const transformed = this.operations.slice(index + 1).reduce((memo, opposed) => {
      return memo.transform(opposed);
    }, inverse);
    this.applyOperation(transformed);
  }

  private applyOperation(op: IOperation<string>) {
    this.text = op.apply(this.text);
    this.operations.push(op);
  }
}
