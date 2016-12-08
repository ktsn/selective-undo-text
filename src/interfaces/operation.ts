export interface Operation<T> {
  type: 'add' | 'remove' | 'sequence' | 'noop'
  index?: number
  length?: number

  description(): string
  apply(target: T): T
  inverse(): Operation<T>
  transform(op: Operation<T>): Operation<T>
}
