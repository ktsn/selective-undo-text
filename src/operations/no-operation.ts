import { Operation } from '../interfaces/operation'

export class NoOperation implements Operation<string> {
  public type: 'noop' = 'noop'

  public apply(target: string): string {
    return target
  }

  public description(): string {
    return 'No operation'
  }

  public inverse(): Operation<string> {
    return this
  }

  public transform(op: Operation<string>): Operation<string> {
    return this
  }
}
